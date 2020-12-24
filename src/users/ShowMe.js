import React from 'react';
import { Link } from 'react-router-dom';

const ShowMe = (props) => {

    return(
        <div className="container">

<div class="card">
  <div class="card-header">
    <b>FILTER</b>
  </div>
  <div class="card-body">
              <form>
  <div className="form-row">
      <div class="form-group col-md-12">
          <label><b>USERNAME</b></label>
          <input type="text" value={props.value} onChange={props.onChange} class="form-control" placeholder="search username" />

    </div>
  </div>
</form> 
  </div>
</div>

            
        </div>
    )
}
export default ShowMe;