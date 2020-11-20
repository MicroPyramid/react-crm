import React, {useState, useEffect } from 'react';
import { ACCOUNTS } from '../../common/apiUrls';

export default function ViewAccount(props) {
  console.log(props);
  
  const [account, setAccount] = useState([]);

  useEffect(() => {
    getAccount();
  });

  const getAccount = () => {
    let userId = window.location.pathname.split('/')[2];
    fetch(`${ACCOUNTS}${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      }
    })
    .then (res => res.json())
    .then (res => console.log(res));
  }

  return (
    <div>
      
    </div>
  )
}
