import React from 'react';
import apiurl from '../api/apiurl'
import { Link } from 'react-router-dom'


class UserDelete extends React.Component{

  state= {
    users : []
  }

  componentDidMount(){
    const id = this.props.match.params.id
            apiurl.get(`/users/${id}/`)
            .then((posRes) => {
              this.setState({  
                users :  posRes.data.data.user_obj
               
              })
               console.log(posRes.data.data.user_obj)
                        
                       
            }).catch(errRes=> {
                         console.log(errRes)
                         });
                        }

    deleteUser= ()=>{
      const id= this.props.match.params.id;
        apiurl.delete(`/users/${id}/`)
        this.props.history.push('/user')
    }

  
render() {
    return (
<div className="container mt-5 py-5">
<div class="card">
  <div class="card-header">
    Delete User
  </div>
  <div class="card-body">
    
    <p class="card-text"> Are You sure you want to delete this user ?</p>
    <button onClick={this.deleteUser} className="btn btn-primary">Delete</button>
         <Link to='/user' className="btn btn-secondary">Cancel</Link>
  </div>
</div>
</div>

      
  
  )
}
}
export default UserDelete;
 





