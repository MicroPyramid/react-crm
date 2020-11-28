import moment from 'moment';

export const timeFromNow = (created_on) => {  
  let date = new Date(created_on);
  let customDate = date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getUTCDate()
  return moment(customDate, "YYYYMMDD").fromNow()
}
