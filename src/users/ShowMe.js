import React from 'react';
import { Link } from 'react-router-dom';

const ShowMe = (props) => {


    return(
        <div className="container">
          <div className="row">
    <div className="col-6 offset-3">
<div className="card">
  <div className="card-header">
    <b>FILTER</b>
  </div>
  <div className="card-body">
              <form>
  <div classNameName="form-row">
      <div className="form-group col-md-12">
          <label><b>USERNAME</b></label>
          <input type="text" id={"input-value"} onChange={props.onChange} value={props.value} className="form-control" placeholder="search username" />
          
    </div>
   
    
  </div>
   <button type="submit">Serach</button>
</form> 
  </div>
</div>

</div>
</div>
        </div>
    )
}
export default ShowMe;