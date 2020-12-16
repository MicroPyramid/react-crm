import moment from 'moment';
import axios from 'axios';

export const momentTimeFormats = (created_on) => {  

  let date = new Date(created_on);

  let fullYear = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getUTCDate();      

  let customDate = fullYear + '' + month + '' + day
    
  let momentKeys = moment(customDate, 'MMMM Do YYYY, h:mm:ss a'); 
  let merediam = (date.getHours() > 12) ? 'a.m.' : 'p.m.';  

  let elapsedTime = moment(customDate, "YYYYMMDD").fromNow();   
  let titleTime = momentKeys._locale._config.monthsShort[month-1]+'. '+month+', '+fullYear+', '+(date.getHours()-12).toString()+':'+(date.getMinutes()).toString()+' '+merediam;

  return [elapsedTime, titleTime];
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