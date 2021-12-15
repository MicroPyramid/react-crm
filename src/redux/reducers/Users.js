import { 
  GET_USERS, 
  USERS_DATA, 
  UPDATE_USER_DETAILS,
  IS_LOADING, 
  USERS_DELETED, 
  USER_ADDED, 
  USER_UPDATED, 
  UPDATE_USER_FORM_DATA,
  USER_ERRORS 
} from '../constants/Users'

const initUsers = {
  users: '',  
  userDetails: {},
  loading: true,
  areUsersDeleted: false,
  userAdded: false,
  userUpdated: false,
  errors: ''
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
        userDetails: action.data.data.data.user_obj,                
        loading: false
      }  
    case UPDATE_USER_FORM_DATA:      
      return {
        ...state,
        userDetails: { ...state.userDetails, [action.payload.target]: action.payload.data }
      }
    case IS_LOADING:
      return {
        ...state,
        loading: true
      }  
    case USERS_DELETED:      
      return {
        ...state,
        areUsersDeleted: action.val
      }
    case USER_ADDED:      
      return {
        ...state,
        userAdded: action.val
      }
    case USER_UPDATED:
      return {
        ...state,
        userUpdated: action.val
      }
    case USER_ERRORS:      
      return {
        ...state,
        errors: action.errors
      }
    default:
      return state
  }
}

export default users