import {
  LEADS_DATA,
  DELETE_OBJ,
  LEAD_NAME,
  AMOUNT,
  WEBSITE,
  CONTACT,
  ASSIGN_TO,
  ORGANIZATION,
  STATUS,
  SKYPE_ID,
  SOURCE,
  ATTACHMENT,
  TAG,
  INDUSTRY,
  FIRST_NAME,
  LAST_NAME,
  JOB_TITLE,
  PHONE_NUMBER,
  EMAIL,
  ADDRESS_LINE,
  CITY,
  STREET,
  STATE,
  PINCODE,
  ADD_LEAD,
  LEAD_ERRORS
} from '../constants/Leads'

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
export const leadName = (data) => {
  return {
    type: LEAD_NAME,
    data: data
  }
}
export const amount = (data) => {
  return {
    type: AMOUNT,
    data: data
  }
}
export const website = (data) => {
  return {
    type: WEBSITE,
    data: data
  }
}

export const contact = (data) => {
  return {
    type: CONTACT,
    data: data
  }
}

export const assignTo = (data) => {
  return {
    type: ASSIGN_TO,
    data: data
  }
}

export const organization = (data) => {
  return {
    type: ORGANIZATION,
    data: data
  }
}
export const status = (data) => {
  return {
    type: STATUS,
    data: data
  }
}
export const skypeID = (data) => {
  return {
    type: SKYPE_ID,
    data: data
  }
}
export const source = (data) => {
  return {
    type: SOURCE,
    data: data
  }
}
export const attachment = (data) => {
  return {
    type: ATTACHMENT,
    data: data
  }
}
export const tag = (data) => {
  return {
    type: TAG,
    data: data
  }
}
export const industry = (data) => {
  return {
    type: INDUSTRY,
    data: data
  }
}
export const firstName = (data) => {
  return {
    type: FIRST_NAME,
    data: data
  }
}
export const lastName = (data) => {
  return {
    type: LAST_NAME,
    data: data
  }
}

export const jobTitle = (data) => {
  return {
    type: JOB_TITLE,
    data: data
  }
}
export const phoneNumber = (data) => {
  return {
    type: PHONE_NUMBER,
    data: data
  }
}
export const email = (data) => {
  return {
    type: EMAIL,
    data: data
  }
}

export const addressLine = (data) => {
  return {
    type: ADDRESS_LINE,
    data: data
  }
}
export const city = (data) => {
  return {
    type: CITY,
    data: data
  }
}

export const street = (data) => {
  return {
    type: STREET,
    data: data
  }
}
export const state = (data) => {
  return {
    type: STATE,
    data: data
  }
}
export const pincode = (data) => {
  return {
    type: PINCODE,
    data: data
  }
}


export const newLead = (url, data) => {
  console.log("getting sta",data,url);  
  return {
    type: ADD_LEAD,
    payload: {
      url, 
      data
    }
  }
}

export const leadErrors = (error) => {
  return {
    type: LEAD_ERRORS,
    payload: {
      error
    }
  }
}

