import { GET_LEADS,
         SET_LEADS_DATA,
         LOADING,
         ADD_LEAD,
         RESPONSE_MESSAGE,
         UPDATE_ERRORS,
         DELETE_LEAD,
         REFRESH } from '../constants/Leads'

export const getLeads = (url, offset, bool) => {  
  return {
    type: GET_LEADS,
    payload: {
      url, 
      offset,
      bool
    }
  }
}

export const setLeadsData = (data) => {
  return {
    type: SET_LEADS_DATA,
    payload: data
  }
}

export const loading = (bool) => {
  return {
    type: LOADING,
    payload: bool
  }
}

export const addLead = (data) => {
  return {
    type: ADD_LEAD,
    payload: data
  }
}

export const responseMessage = (msg) => {
  return {
    type: RESPONSE_MESSAGE,
    payload: msg
  }
}

export const updateErrors = (error) => {
  return {
    type: UPDATE_ERRORS,
    payload: error
  }
}

export const deleteLead = (id, bool) => {  
  return {
    type: DELETE_LEAD,
    payload: {
      id,
      bool
    }
  }
}

export const refresh = (bool) => {
  return {
    type: REFRESH,
    payload: bool    
  }
}