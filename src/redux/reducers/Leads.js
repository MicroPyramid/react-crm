import { SET_LEADS_DATA, 
         RESPONSE_MESSAGE, 
         UPDATE_ERRORS,
         REFRESH } from '../constants/Leads'

const initialState = {
  isLoading: true,
  leadsData: '',
  openOffset: 0,
  closeOffset: 0,
  refresh: false,
  responseMessage: '',
  errors: [] 
}

const leads = (state = initialState, action) => {    
  switch (action.type) {    
    case SET_LEADS_DATA:
      return {
        ...state,
        leadsData: action.payload.response,        
        isLoading: false,  
        openOffset: action.payload.response.open_leads.offset,
        closeOffset: action.payload.response.close_leads.offset,
      }
    case RESPONSE_MESSAGE:
      return {
        ...state,
        responseMessage: action.payload
      } 
    case UPDATE_ERRORS:
      return {
        ...state,
        errors: action.payload
      }  
    case REFRESH:      
      return {
        ...state,
        refresh: action.payload
      }
      default:
        return state
  }
}

export default leads
