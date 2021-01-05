import axios from 'axios';
import React from 'react';

export default function DeleteActionButton(props) {

  let {api, id, to} = props;  
  
  const deleteObject = (e) => {
    e.preventDefault();   
    let config = {
      headers: {
        'Content-Type': 'application/json',          
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      }
    }

     
    let resConf = window.confirm("Are you sure to cancel");    
      if (resConf) {
      axios.delete(`${api}${id}/`, config).then(res => { 
        console.log(res);
        if(res.status === 200) {
          setTimeout( () => {                           
            axios.get(`${api}/`, config)
            .then (res => {
              props.stateUpdate(res);
            });
          }, 300); 
        }         
      });             
  }
  }
  return (

      <a href="/leads/" className="action__btn-delete-a delete remove_account" title="Delete" onClick={(e) => deleteObject(e)}>
        <svg className="action__btn action__btn-delete svg-inline--fa fa-trash-alt fa-w-14 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
      </a>          
  )
}