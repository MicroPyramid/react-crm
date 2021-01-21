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
        has_marketing_access : false,
        status: true,
}

     onInputChange = e => {
       e.preventDefault()
       console.log(e.target.value)
         this.setState({ [e.target.name] : e.target.value });
      };

     onSubmit = e => { 
       e.preventDefault()
       console.log(this.state)
       apiurl.post('/users/',this.state)
       this.props.history.push('/user')
        
    }
  

    render() {
      const { username ,password, email, role, first_name,last_name,profile_pic,has_sales_access,has_marketing_access,status }= this.state
        return(
            <div className="container py-5 mt-5">
           <div className="row">
          <div className="col-6 offset-3">
          <div className="card">
          <div className="card-header text-center">
               <b><i>CREATE USER</i></b> 
            </div>
               <div className="card-body">
               <form onSubmit={this.onSubmit}>
         
    <div className="form-row">
    <div className="form-group col-md-4">
      <label><b>First Name</b></label>
      <input type="text" name="first_name" value={first_name} onChange={this.onInputChange} className="form-control"  placeholder="First name" required />
    </div>
    <div className="form-group col-md-4">
      <label><b>Last Name</b></label>
      <input type="text" name="last_name" value={last_name}  onChange={this.onInputChange}  className="form-control" placeholder="Last name" />
    </div>
      <div className="form-group col-md-4">
        <label><b>User Name</b></label>
        <input type="text" name="username" value={username}  onChange={this.onInputChange} className="form-control" placeholder="Username" required />

      </div>
  
  </div>

  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="inputEmail4"><b>Email</b></label>
      <input type="email" name="email" value={email}  onChange={this.onInputChange} className="form-control" id="inputEmail4" placeholder="email" />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="inputState"><b>User Role</b> </label>
      <select id="inputState" name="role" value={role}  onChange={this.onInputChange} className="form-control" required>
        <option >.....</option>
        <option>  USER </option>
        <option> ADMIN </option>
      </select>
    </div>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="inputpassword"><b>Password</b></label>
      <input type="password" name="password" value={password}  onChange={this.onInputChange} id="inputpassword" className="form-control" placeholder="password" required />
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="profilepic"><b>Upload Profile Picture</b></label>
      <input type="file" name="profile_pic" value={""}  onChange={this.onInputChange} id="profilepic" className="form-control" />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group col-md-4">
    <label htmlFor="marketing"><b>Marketing Access</b></label>
    <select name="has_marketing_access" onChange={this.onInputChange} id="marketing" className="form-control" required >
     <option>.....</option>
        <option  value= {false} >false</option>
        <option  value= {true}>true</option>
      </select> 
    
  
    </div>
    <div className="form-group col-md-4">
    <label htmlFor="sales"><b>Sales Access</b></label>
    <select  name="has_sales_access" onChange={this.onInputChange} id="sales" className="form-control" required >
    <option >.....</option>
        <option value={false} >false </option>
        <option value={true} > true </option>
      </select>
    </div>
    <div className="form-group col-md-4">
      <label htmlFor="status"><b>Status</b></label>
      <input type="text" name="status" value={status}  onChange={this.onInputChange} id="status" className="form-control" />
    </div>
      
    </div>
<div className="text-center">
  <button type="submit" className="btn btn-success">Save</button>
  <Link to='/user' className="btn btn-light">Cancel</Link>
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
export default UserCreate;


















