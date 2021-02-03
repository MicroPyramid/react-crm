import React from 'react';
import moment from 'moment';
import axios from 'axios';
import TextDisplay from './UIComponents/Display/TextDisplay';
import ArrayDisplay from './UIComponents/Display/ArrayDisplay';

export const momentTimeFormats = (created_on) => {
    let date = new Date(created_on);
    let elapsedTime = moment.utc(created_on).local().startOf('seconds').fromNow();
    let momentKeys = moment(created_on);
    let merediam = date.getHours() > 12 ? 'p.m.' : 'a.m.';
    let titleTime =
    momentKeys._locale._config.monthsShort[date.getMonth()] +
    '. ' +
    (date.getMonth() + 1) +
    ', ' +
    date.getFullYear() +
    ', ' +
    (date.getHours() - 12).toString() +
    ':' +
    date.getMinutes().toString() +
    ' ' +
    merediam;

    return [elapsedTime, titleTime];
};

export const getApiResults = async (api) => {
    return await axios
        .get(api, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `jwt ${localStorage.getItem('Token')}`,
                "company": `${localStorage.getItem('SubDomain')}`
            }
        })
        .then(async (res) => await res);
};

export const convertArrayToString = (arr) => {
    let arrString = '';
    let arrLen = arr.length;
    console.log(arrLen);    
    for (let i = 0; i < arrLen; i++) {
        if (i === arrLen - 1) {
            arrString = arrString + `"${arr[i]}"`; // "334"
        } else {
            arrString = arrString + `"${arr[i]}",`; // "332,"
        }
    }
    if(arrLen > 0) {
        return '[' + arrString + ']'; // ["332","334"]
    } else {
        return '';
    }
    
};

export const overView = (object) => {

  let accountObject = Object.entries(object);
  let modalResult = accountObject.map((result, index) => {
    let key = accountObject[index][0];
    let value = accountObject[index][1];
    let propertyValue;
    if (key === 'contacts') propertyValue = 'first_name'; 
    if (key === 'tags') propertyValue = 'name'; 
    return(
      (typeof(value) === "string" || typeof(value) === "number") ? <TextDisplay  elementSize="col-md-4" labelName={key} value={value}/> :
      (typeof(value) === "object") ? <ArrayDisplay elementSize="col-md-4" labelName={key} value={value} property={propertyValue} style={(key === 'contacts') ? 'contactStyle' : (key === 'tags') ? 'tagStyle': ''}/> : 
      ''
    )
  })
  return modalResult;
}