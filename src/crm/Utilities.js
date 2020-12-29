import moment from 'moment';
import axios from 'axios';

export const momentTimeFormats = (created_on) => {

  let date = new Date(created_on);      
  let elapsedTime = moment.utc(created_on).local().startOf('seconds').fromNow();  
  let momentKeys = moment(created_on);
  let merediam = (date.getHours() > 12) ? 'p.m.' : 'a.m.';  
  let titleTime = momentKeys._locale._config.monthsShort[date.getMonth()]+'. '+(date.getMonth()+1)+', '+date.getFullYear()+', '+(date.getHours()-12).toString()+':'+(date.getMinutes()).toString()+' '+merediam;
  
  return[ elapsedTime, titleTime]
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

export const convertArrayToString = (arr) => {      
  let arrString = '';
  let arrLen = arr.length;
  for (let i = 0; i < arrLen; i++) {
    if(i == arrLen-1) {
      arrString = arrString + `"${arr[i]}"` // "334"
    } else {
      arrString = arrString + `"${arr[i]}",` // "332,"
    }
  }
  return '['+arrString+']';  // ["332","334"]
}