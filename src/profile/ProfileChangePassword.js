import React from 'react'
import apiurl from '../api/apiurl'
import {Link} from 'react-router-dom'

class ProfileChangePassword extends React.Component{

    state = {
      old_password : '',
      new_password: '',
      retype_password:''
    }
      
   
onInputChange = e => {
      
    console.log({[e.target.name] : e.target.value })
     this.setState({ ...this.state, [e.target.name] : e.target.value });
   };

    onSubmitPassword= (e) =>{
        e.preventDefault()
        apiurl.post('/profile/change-password/',this.state)
        this.props.history.push('/profile')
    }


    render(){
        const {new_password,old_password,retype_password} = this.state
        return(
            <div>
                 <div>
                < div className="container mt-5">
  <div className="card">
    <div className="card-header">
     <b>CHANGE PASSWORD</b>
    </div>
    <div className="card-body">
       <form onSubmit = {this.onSubmitPassword}>
       
    <div className="form-group">
      <label><b>Old Password</b></label>
      <input type="password" name="old_password" value={old_password}  onChange={this.onInputChange} className="form-control" placeholder="password" required />
    </div>

    <div className="form-group">
      <label><b>New Password</b></label>
      <input type="password" name="new_password" value={new_password}  onChange={this.onInputChange} className="form-control" placeholder="password" required />
    </div>
    <div className="form-group">
      <label><b>Old Password</b></label>
      <input type="password" name="retype_password" value={retype_password}  onChange={this.onInputChange} className="form-control" placeholder="password" required />
    </div>
    
       <div className="text-center">
   <button type="submit" className="btn btn-success">
       Change
   </button>
   <Link to='/profile' className="btn btn-light">Cancel</Link>
   </div>
       </form>
    </div>
  </div>
  </div>
             </div>
            </div>
        )
    }
}
export default ProfileChangePassword;