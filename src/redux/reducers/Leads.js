import {
  LEADS_DATA,
  LEADS_FILTER,
  LEADS_FILTER_DATA  
} from '../constants/Leads'

const initLeads = {
  loading: true,
  leads: '',
  leadsFilters: '',
  isFiltered: false,
  users: ''
}


const leads = (state = initLeads, action) => {  
  switch (action.type) {
    case LEADS_DATA:      
      return {
        ...state,
        leads: action.data,        
        loading: false
      }    
    case LEADS_FILTER_DATA: {
      return {
        ...state,
        leadsFilters: action.data
      }
    }
    case LEADS_FILTER:      
      return {
        ...state,
        isFiltered: action.bool        
      }
      default: 
        return state
  }
}

export default leads