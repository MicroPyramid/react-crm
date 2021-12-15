import { LOGIN_CREDENTIALS, 
         UPDATE_ERRORS, 
         TOKEN,
         REGISTRATION_DETAILS,
         ALERT_MESSAGE,
         FORGOT_PASSWORD } from '../constants/Auth'

// Retrieves Login Credentials
export const loginCredentials = (credentials) => {
  return {
    type: LOGIN_CREDENTIALS,
    payload: credentials
  }
}

// Update Auth error
export const updateErrors = (error) => {
  return {
    type: UPDATE_ERRORS,
    payload: error
  }
}

// Token Availability
export const setToken = (token) => {
  return {
    type: TOKEN,
    payload: token
  }
}

// Registration Details
export const registrationDetails = (regDetails) => {
  return {
    type: REGISTRATION_DETAILS,
    payload: regDetails
  }
}

export const alertMessage = (message) => {
  return {
    type: ALERT_MESSAGE,
    payload: message
  }
}

export const forgotPassword = (email) => {
  return {
    type: FORGOT_PASSWORD,
    payload: email
  }
}
