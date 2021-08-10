import { LEADS_DATA,DELETE_OBJ } from '../constants/Leads'

export const updateLeadsData = (data) => {  
  return {
    type: LEADS_DATA,
    data: data
  }
}

export const deleteObject = (url) => {
  return {
    type: DELETE_OBJ,
    url
  }
}

