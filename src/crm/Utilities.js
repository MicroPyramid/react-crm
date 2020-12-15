import moment from 'moment';
import axios from 'axios';

export const timeFromNow = (created_on) => {  
  let date = new Date(created_on);
  let customDate = date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getUTCDate()
  return moment(customDate, "YYYYMMDD").fromNow()
}

export const getApiResults = async (api) => {   
  return await axios.get(api, {    
    headers: {
      'Content-Type': 'application/json',
      Authorization: `jwt ${localStorage.getItem('Token')}`,
      company: `${localStorage.getItem('SubDomain')}`
    }
  }).then( async res => await res);
}