import React from 'react'
import apiurl from '../api/apiurl'
import {Link} from 'react-router-dom'


class UserCreate extends React.Component{
   

        state ={
        username : '',
        password: '',
        email : '',
        role : '',
        first_name : '',
        last_name : '',
        profile_pic: null,
        has_sales_access : false,
        has_sales_access_true: true,
        has_marketing_access : false,
        has_marketing_access_true : true,
        status: true
  
}
     onInputChange = e => {
       e.preventDefault()
      console.log( e.target.value )
         this.setState({ [e.target.name] : e.target.value });
      };
     onSubmit = e => {
       e.preventDefault()
       console.log(this.state)
       apiurl.post('/users/',this.state)

        .then((posRes) => {
           
              console.log(posRes.data)
         })
             .catch(errRes=> {
             console.log(errRes)
             })
            this.props.history.push('/user')
        
    }
    render() {
      const { username ,password, email, role, first_name,last_name,profile_pic,has_sales_access,has_sales_access_true,has_marketing_access_true,has_marketing_access,status }= this.state
        return(
            <div class="container py-5 mt-5">

          <div class="card">
          <div class="card-header text-center">
               <b><i>CREATE USER</i></b> 
            </div>
               <div class="card-body">
               <form onSubmit={this.onSubmit}>
          {/* <h1 class="text-center bg-light">Create User</h1> */}
    <div class="form-row">
    <div class="form-group col-md-4">
      <label><b>First Name</b></label>
      <input type="text" name="first_name" value={first_name} onChange={this.onInputChange} class="form-control"  placeholder="First name" required />
    </div>
    <div class="form-group col-md-4">
      <label><b>Last Name</b></label>
      <input type="text" name="last_name" value={last_name}  onChange={this.onInputChange}  class="form-control" placeholder="Last name" />
    </div>
      <div class="form-group col-md-4">
        <label><b>User Name</b></label>
        <input type="text" name="username" value={username}  onChange={this.onInputChange} class="form-control" placeholder="Username" required />

      </div>
  
  </div>

  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4"><b>Email</b></label>
      <input type="email" name="email" value={email}  onChange={this.onInputChange} class="form-control" id="inputEmail4" placeholder="email" />
    </div>
    <div class="form-group col-md-6">
      <label for="inputState"><b>User Role</b> </label>
      <select id="inputState" name="role" value={role}  onChange={this.onInputChange} class="form-control" required>
        <option selected>.....</option>
        <option>  USER </option>
        <option> ADMIN </option>
      </select>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label><b>Password</b></label>
      <input type="password" name="password" value={password}  onChange={this.onInputChange} class="form-control" placeholder="password" required />
    </div>
    <div class="form-group col-md-6">
      <label><b>Upload Profile Picture</b></label>
      <input type="file" name="profile_pic" value={profile_pic}  onChange={this.onInputChange} className="form-control" />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-4">
    <label><b>Marketing Access</b></label>
    <select name="has_marketing_access" onChange={this.onInputChange} class="form-control" required >
    <option >.....</option>
        <option  value= {false} >false</option>
        <option  value= {true}> true </option>
      </select>
    
  
    </div>
    <div class="form-group col-md-4">
    <label><b>Sales Access</b></label>
    <select  name="has_sales_access" onChange={this.onInputChange} class="form-control" required >
    <option >.....</option>
        <option value={has_sales_access} > false </option>
        <option value={has_sales_access_true} > true </option>
      </select>
    </div>
    <div class="form-group col-md-4">
      <label><b>Status</b></label>
      <input type="text" name="status" value={status}  onChange={this.onInputChange} class="form-control" />
    </div>
      
    </div>
<div class="text-center">
  <button type="submit" class="btn btn-success">Save</button>
  <Link to='/user' class="btn btn-light">Cancel</Link>
  </div>
</form> 

                   </div>
              </div>
      
       
      </div>
        )
    }

}
export default UserCreate;


















