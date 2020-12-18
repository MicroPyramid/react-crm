import React from 'react';
import apiurl from '../api/apiurl'
import { Link } from 'react-router-dom'


class UserDelete extends React.Component{
  
    componentDidMount() {
        const id= this.props.match.params.id;
    apiurl.get(`/users/${id}/`)
    }

    deleteUser= ()=>{
      const id= this.props.match.params.id;
        apiurl.delete('/users/${id}')
        this.props.history.push('/user')
    }

  
render() {
    return (
          <div class="container">
        <div className="modal fade" id="mymodal" tabindex="-1" aria-hidden="true" role="dialog">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Delete User</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Are You Sure You Want To Delete This?</p>
      </div>
      <div className="modal-footer">
        <button onClick={this.UserDelete} className="btn btn-primary">Delete</button>
        <Link to='/user' className="btn btn-secondary">Cancel</Link>

      </div>
    </div>
  </div>
  </div>
  </div>
  



    )
}
}
export default UserDelete;
 




