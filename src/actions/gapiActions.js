// @flow

export const CURRENT_USER = '@wikiki/gapi/CURRENT_USER'
export const USER_STATUS = '@wikiki/gapi/USER_STATE'
export const SIGN_OUT = '@wikiki/gapi/SIGN_OUT'
export const SIGN_OUT_STARTED = '@wikiki/gapi/SIGN_OUT_STARTED'

const _initialited = false

const _getProfile = (user) => {
  const basicProfile = user.getBasicProfile()
  return basicProfile ? {
    name: basicProfile.getName(),
    image: basicProfile.getImageUrl(),
    email: basicProfile.getEmail(),
  } : null
}

export const initGapi = () => dispatch => {
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

    this.auth2 = window.gapi.auth2.getAuthInstance()
    if (!this.auth2) {
      this.auth2 = window.gapi.auth2.init({
        // $FlowFixMe
        client_id: document.querySelector('meta[name=google-signin-client_id]').content,
        scope: 'profile',
      })
    }

    // Listen for sign-in state changes.
    this.auth2.isSignedIn.listen((val) => {
      dispatch({ type: USER_STATUS, payload: { signedIn: val } })
    })

    // Listen for changes to current user.
    this.auth2.currentUser.listen((user) => {
      dispatch({ type: CURRENT_USER, payload: { user: _getProfile(user) } })
    })

    // Sign in the user if they are currently signed in.
    if (this.auth2.isSignedIn.get()) {
      this.auth2.signIn()
    }

    // Start with the current live values.
    if (this.auth2) {
      const user = _getProfile(this.auth2.currentUser.get())
      dispatch({ type: CURRENT_USER, payload: { user } })
      const signedIn = this.auth2.isSignedIn.get()
      dispatch({ type: USER_STATUS, payload: { signedIn } })
    }

  })
}

export const signOut = () => (dispatch) => {
  const auth2 = window.gapi.auth2.getAuthInstance()
  dispatch({ type: SIGN_OUT_STARTED });
  auth2.signOut().then(() => dispatch({ type: SIGN_OUT }))
}
