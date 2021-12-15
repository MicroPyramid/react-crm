import { GET_PROFILES,
         SET_PROFILES } from '../constants/Profiles'

export const getProfiles = () => {  
  return {
    type: GET_PROFILES
  }
}

export const setProfiles = (data) => {
  return {
    type: SET_PROFILES,
    payload: data
  }
}
