import { UPDATE_ERRORS, TOKEN, ALERT_MESSAGE } from '../constants/Auth'

const initialState = {  
  errors: '',
  isTokenAvailable: false,
  alert: '',
  forgotPassword: false
}

const auth = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_ERRORS:      
      return {
        ...state,
        errors: action.payload
      }
    case TOKEN:
      return {
        ...state,
        isTokenAvailable: true
      }
    case ALERT_MESSAGE:
      return {
        ...state,
        alert: action.payload
      }
    default: 
      return state
  }
}

export default auth