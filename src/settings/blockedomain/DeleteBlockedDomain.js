import React from 'react';
import apiurl from '../../api/apiurl'
import { Link } from 'react-router-dom'


class DeleteBlockedDomain extends React.Component{


    deleteUser= ()=>{
      const id= this.props.match.params.id;
        apiurl.delete(`/settings/block-domains/${id}/`)
        this.props.history.push('/settings/contacts')
    }

  
render() {
    return (
<div className="container mt-5 py-5">
  <div className="row">
    <div className="col-6 offset-3">
<div className="card">
  <div className="card-header text-center">
   <b><i>Delete User</i></b> 
  </div>
  <div className="card-body">
    
    <p className="card-text"> Are You sure you want to delete this user ?</p>
    <button onClick={this.deleteUser} className="btn btn-primary">Delete</button>
         <Link to='/settings/contacts' className="btn btn-secondary">Cancel</Link>
  </div>
</div>
</div>
</div>
</div>

      
  
  )
}
}
export default DeleteBlockedDomain;
 



