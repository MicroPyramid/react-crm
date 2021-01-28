import React from 'react';
import { Link } from 'react-router-dom';

const ShowMe = (props) => {


    return(
        <div className="container">
<div className="card">
  <div className="card-header">
    <b>FILTER</b>
  </div>
  <div className="card-body">
              <form >
  <div classNameName="form-row">
      <div className="form-group col-md-10">
          <label><b>USERNAME</b></label>
          <input type="text" onChange={props.onChange} value={props.value} className="form-control" placeholder="search username" />
          </div>  
          <div>

          <button className="btn btn-warning btn-md mr-1" onClick={props.onClick}>Search</button>
          <a href="/settings/contacts" className="btn btn-warning btn-md">Cancel</a>

    
   </div>
    
  </div>
</form> 
  </div>
</div>

</div>

    )
}
export default ShowMe;
