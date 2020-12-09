import moment from 'moment';

export const timeFromNow = (created_on) => {  
  let date = new Date(created_on);
  let customDate = date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getUTCDate()
  return moment(customDate, "YYYYMMDD").fromNow()
}

export const getApiResults = (api) => {
  fetch(`${api}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `jwt ${localStorage.getItem('Token')}`,
      company: `${localStorage.getItem('SubDomain')}`
    }
  })
  .then ( res =>  res.json())
  .then ( async res => {               
    let result = await res;
    return result;
  });
}