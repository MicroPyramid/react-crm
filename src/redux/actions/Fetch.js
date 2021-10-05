import { GET_DATA, POST_DATA, PUT_DATA } from '../constants/Fetch'

export const getData = (url, obj) => {
  return {
    type: GET_DATA,
    payload: {
      url, obj
    }
  }
}

export const postData = (url, obj, data) => {  
  return {
    type: POST_DATA,
    payload: {
      url, obj, data
    }
  }
}

export const putData = (url, obj, data, id) => {  
  return {
    type: PUT_DATA,
    payload: {
      url, obj, data, id
    }
  }
}