// @flow
import conf from 'conf/gapiConfig'

const _initialited = false

const _getProfile = (user) => {
  const basicProfile = user.getBasicProfile()
  return basicProfile ? {
    name: basicProfile.getName(),
    image: basicProfile.getImageUrl(),
    email: basicProfile.getEmail(),
  } : null
}

const _loadDrive = () => {
  return new Promise((resolve, reject) => {

    if (window.gapi.client && window.gapi.client.drive) {
      resolve(window.gapi.client.drive)
      return
    }
    window.gapi.load('client', () => {
      window.gapi.client.load('drive', 'v3', () => {
        resolve(window.gapi.client.drive)
      })
    })
  });
}

export const CURRENT_USER = '@wikiki/gapi/CURRENT_USER'
export const USER_STATUS = '@wikiki/gapi/USER_STATE'

export const initGapi = () => (dispatch: Function) => {
  if (_initialited) {
    return
  }

  if (!window.gapi) {
    // console.log('gapi is not defined, waiting...')
    setTimeout(() => initGapi()(dispatch), 300)
    return
  }

  // console.log('Initializing gapi...')
  window.gapi.load('auth2', () => {

    let auth2 = window.gapi.auth2.getAuthInstance()
    // $FlowFixMe
    if (!auth2) {
      auth2 = window.gapi.auth2.init({
        apiKey: conf.apiKey,
        clientId: conf.clientId,
        scope: 'https://www.googleapis.com/auth/drive.file',
        // discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      })
    }

    // Listen for sign-in state changes.
    auth2.isSignedIn.listen((val) => {
      dispatch({ type: USER_STATUS, payload: { signedIn: val } })
    })

    // Listen for changes to current user.
    auth2.currentUser.listen((user) => {
      dispatch({ type: CURRENT_USER, payload: { user: _getProfile(user) } })
    })

    // Sign in the user if they are currently signed in.
    if (auth2.isSignedIn.get()) {
      auth2.signIn()
    }

    // Start with the current live values.
    if (auth2) {
      const user = _getProfile(auth2.currentUser.get())
      dispatch({ type: CURRENT_USER, payload: { user } })
      const signedIn = auth2.isSignedIn.get()
      dispatch({ type: USER_STATUS, payload: { signedIn } })
    }

  })
}

export const SIGN_OUT = '@wikiki/gapi/SIGN_OUT'
export const SIGN_OUT_STARTED = '@wikiki/gapi/SIGN_OUT_STARTED'

export const signOut = () => (dispatch: Function) => {
  const auth2 = window.gapi.auth2.getAuthInstance()
  dispatch({ type: SIGN_OUT_STARTED });
  auth2.signOut().then(() => dispatch({ type: SIGN_OUT }))
}

export const FILES = '@wikiki/gapi/FILES'
export const FILES_STARTED = '@wikiki/gapi/FILES_STARTED'

export const files = () => (dispatch: Function) => {

  dispatch({ type: FILES_STARTED })
  _loadDrive().then((drive) => {
    return drive.files.list()
  }).then((response) => {
    dispatch({ type: FILES, payload: response })
  }).catch((error) => {
    dispatch({ type: FILES, error: true, meta: { errorMessage: 'An error occured trying to get the files list.' } })
    alert('An error occured trying to get the files list.')
  })
}
