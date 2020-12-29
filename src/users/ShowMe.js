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
              <form>
  <div classNameName="form-row">
      <div className="form-group col-md-12">
          <label><b>USERNAME</b></label>
          <input type="text" value={props.value} onChange={props.onChange} className="form-control" placeholder="search username" />

    </div>
  </div>
</form> 
  </div>
</div>

            
        </div>
    )
}
export default ShowMe;