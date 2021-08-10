import { GET_CONTACTS, ADD_CONTACT, CONTACT_ERRORS } from '../constants/Contacts'

export const getContacts = (url) => {
  return {
    type: GET_CONTACTS,
    url
  }
}

export const addContact = (url, data) => {  
  return {
    type: ADD_CONTACT,
    payload: {
      url, 
      data
    }
  }
}

export const contactErrors = (error) => {
  return {
    type: CONTACT_ERRORS,
    payload: {
      error
    }
  }
}
