import { SET_PROFILES } from '../constants/Profiles'

const initialState = {
  profiles: ''
}

const profiles = (state = initialState, action) => {
  switch(action.type) {
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload.user_obj
      }
    default:
      return state
  }
}

export default profiles
