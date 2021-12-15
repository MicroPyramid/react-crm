import { COMPANIES_LIST } from '../constants/Companies'

const initialState = {
  companies: ''
}

const companies = (state = initialState, action) => {
  switch(action.type) {
    case COMPANIES_LIST:      
      return {
        ...state,
        companies: action.data.data.companies
      }
      default:
        return state
  }
}

export default companies