import {  USERS_DATA, 
          USER_STATUS, 
          USER_DETAILS, 
          UPDATE_USER_DETAILS, 
          DELETE_ALL_USERS, 
          IS_LOADING } from '../constants/Users'

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

export const isLoading = () => {
  return {
    type: IS_LOADING    
  }
}

// export const isLoading = (bool) => {
//   return {
//     type: IS_LOADING,
//     bool
//   }
// }