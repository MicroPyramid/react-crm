import { GET_DATA } from '../constants/Fetch'

export const getData = (url, obj) => {
  return {
    type: GET_DATA,
    payload: {
      url, obj
    }
  }
}
