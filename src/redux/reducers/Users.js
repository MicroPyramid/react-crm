import { GET_USERS, USER_DETAILS, USERS_DATA, UPDATE_USER_DETAILS, IS_LOADING } from '../constants/Users'

const initUsers = {
  users: '',
  userDetails: '',
  loading: true
}

const users = (state = initUsers, action) => {    
  switch(action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.data
      }
    case USERS_DATA:     
      return {  
        ...state,
        users: action.data,
        loading: false
    }
    case UPDATE_USER_DETAILS:      
      return {
        ...state,
        userDetails: action.data,
        loading: false
      }  
    case IS_LOADING:
      return {
        ...state,
        loading: true
      }  
    default:
      return state
  }
}

export default users