
import { CURRENT_USER, USER_STATUS } from 'actions/gapiActions'

export default (state = { user: null, status: { signedIn: false }}, action: Object) => {
  const { type, payload /*, meta, error */ } = action || {}
  switch (type) {
    case CURRENT_USER:
      return { ...state, user: payload.user }
    case USER_STATUS:
      return { ...state, status: { ...state.status, signedIn: payload.signedIn } }
    default:
      return state
  }
};
