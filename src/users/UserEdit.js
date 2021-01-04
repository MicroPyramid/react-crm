import React from 'react'
import apiurl from '../api/apiurl'
import {  Link  } from 'react-router-dom';


class UserEdit extends React.Component{
   
  state ={ 

    username : '',
    first_name : '',
    last_name : '',
    profile_pic: null,
    has_sales_access : false,
    has_marketing_access : false,
    is_active : true
}
 
    componentDidMount(){
    const id = this.props.match.params.id
            apiurl.get(`/users/${id}/`)
            .then((posRes) => {
              this.setState({ 
                first_name : posRes.data.data.user_obj.first_name,
                last_name : posRes.data.data.user_obj.last_name,
                username : posRes.data.data.user_obj.username,
                profile_pic : posRes.data.data.user_obj.profile_pic,
                has_marketing_access : posRes.data.data.user_obj.has_marketing_access,
                has_sales_access : posRes.data.data.user_obj.has_sales_access,
                is_active: posRes.data.data.user_obj.is_active
              })
               
              }).catch(errRes=> {
                         console.log(errRes)
                         });
                        }

     onHandleChange = e => {
      this.setState({ ...this.state, [e.target.name] : e.target.value });
      };

     onSubmit = e => {
      const id = this.props.match.params.id
       e.preventDefault()
        apiurl.put(`/users/${id}/`,this.state)
      this.props.history.push('/user')
        
        }

   render() {
  
    return(
          <div className= "container mt-5 py-5">
             <div className="row">
              <div className="col-6 offset-3">
          <div className="card">
          <div className="card-header text-center">
           <b><i>EDIT USER</i></b> 
          </div>
          <div className="card-body">

          <form onSubmit={this.onSubmit}>
      <div className="form-row">
      <div className="form-group col-md-4">
        <label><b>First Name</b></label>
        <input type="text" name="first_name" value={this.state.first_name} onChange={this.onHandleChange} className="form-control" required />
      </div>
      <div className="form-group col-md-4">
        <label><b>Last Name</b></label>
        <input type="text" name="last_name" value={this.state.last_name}  onChange={this.onHandleChange}  className="form-control" />
      </div>
        <div className="form-group col-md-4">
          <label><b>User Name</b></label>
          <input type="text" name="username" value={this.state.username}  onChange={this.onHandleChange} className="form-control" required />
  
        </div>
    
    </div>
    <div className="form-group">
      <label><b>Upload Profile Picture</b></label>
      <input type="file" name="profile_pic" value={''}  onChange={this.onHandleChange} className="form-control" />
    </div>
    <div className="form-row">
    <div className="form-group col-md-6">
    <label><b>Marketing Access</b></label>
    <select  name="has_marketing_access" onChange={this.onHandleChange}  className="form-control" required >
    <option >.....</option>
        <option value={false} >false</option>
        <option  value={true} > true </option>
      </select>
    </div>
    <div className="form-group col-md-6">
    <label><b>Sales Access</b></label>
    <select name="has_sales_access" onChange={this.onHandleChange} className="form-control" required >
    <option  >.....</option>
    <option value={false}> false </option>
    <option  value={true}>true </option>

        
      </select>
    </div>
    
    </div>

    
    <div className="text-center">
  <button type="submit"className="btn btn-success">Save</button>
  <Link to='/user'className="btn btn-light">Cancel</Link>
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
export default UserEdit;



