import {  USERS_DATA, 
          USER_STATUS, 
          USER_DETAILS, 
          UPDATE_USER_DETAILS, 
          DELETE_ALL_USERS, 
          IS_LOADING, 
          USERS_DELETED, 
          USER_ADDED, 
          USER_UPDATED,
          UPDATE_USER_FORM_DATA,
          USER_ERRORS } from '../constants/Users'

export const updateUsersData = (data) => {  
  return {
    type: USERS_DATA,
    data
  }
}

export const updateUserStatus = (id, status) => {    
  return {
    type: USER_STATUS,
    payload: {
      id,
      status
    }
  }
}

export const getUserDetails = (url) => {  
  return {
    type: USER_DETAILS,
    url
  }
}

export const updateUserDetails = (data) => {  
  return {
    type: UPDATE_USER_DETAILS,
    data    
  }
}

export const deleteAllUsers = (ids) => {  
  return {
    type: DELETE_ALL_USERS,
    ids
  }
}

export const usersDeleted = (val) => {  
  return {
    type: USERS_DELETED,
    val
  }
}

export const isLoading = () => {
  return {
    type: IS_LOADING    
  }
}

export const isUserAdded = (val) => {  
  return {
    type: USER_ADDED,
    val
  }
}

export const isUserUpdated = (val) => {
  return {
    type: USER_UPDATED,
    val
  }
}

export const updateUserFormData = (data) => {
  return {
    type: UPDATE_USER_FORM_DATA,
    data
  }
}

export const userErrors = (errors) => {
  console.log('Reached userErros action type', errors)
  return {
    type: USER_ERRORS,
    errors
  }
}