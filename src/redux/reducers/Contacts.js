import { GET_CONTACTS, CONTACT_ERRORS } from '../constants/Contacts'

const initialState = {
  contacts: '',
  errors: ''
}

const contacts = (state = initialState, action) => {  
  switch(action.type) {
    case CONTACT_ERRORS: {
      return {
        ...state,
        errors: action.payload
      }
    }
    default: 
      return state
  }
}

export default contacts