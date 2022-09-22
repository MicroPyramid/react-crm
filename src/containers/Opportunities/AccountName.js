import React, { useState } from 'react';

export const AccountName = (props) => {

  const [tags, seTags] = useState([props.account.name]);
  
  return (
    <div>
      {
       props.accounts ? props.accounts.name : null 
      }
    </div>
  )
}
