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
    has_sales_access_true: true,
    has_marketing_access : false,
    has_marketing_access_true : true,

  //  user : ''
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
                has_sales_access : posRes.data.data.user_obj.has_sales_access
                 //user :  posRes.data.data.user_obj
              })
                console.log(posRes.data.data.user_obj)
                        
                       
            }).catch(errRes=> {
                         console.log(errRes)
                         });
                        }

     onHandleChange = e => {
      
       console.log({[e.target.name] : e.target.value })
        this.setState({ ...this.state, [e.target.name] : e.target.value });
      };

     onSubmit = e => {
      const id = this.props.match.params.id
       e.preventDefault()
        apiurl.put(`/users/${id}/`,this.state)
      this.props.history.push('/user')
        
        }

     

        
    render() {
    //   if(!this.state.user){
    //     return <div>Loading</div>
    // }
           
        return(
         

          
          <div class="container py-5 mt-5">
              <form onSubmit={this.onSubmit}>
            <h1 className="text-center bg-light">Edit User</h1>
      <div className="form-row">
      <div className="col-md-4">
        <label>First Name</label>
        <input type="text" name="first_name" value={this.state.first_name} onChange={this.onHandleChange} className="form-control" required />
      </div>
      <div className="col-md-4">
        <label>Last Name</label>
        <input type="text" name="last_name" value={this.state.last_name}  onChange={this.onHandleChange}  className="form-control" />
      </div>
        <div className="form-group col-md-4">
          <label>User Name</label>
          <input type="text" name="username" value={this.state.username}  onChange={this.onHandleChange} className="form-control" required />
  
        </div>
    
    </div>
    <div className="form-row">
    <div class="form-group col-md-4">
      <label>Upload Profile Picture</label>
      <input type="file" name="profile_pic" value={this.state.profile_pic}  onChange={this.onHandleChange} className="form-control" />
    </div>
    <div class="form-group col-md-4">
    <label>has_marketing Access</label>
    <select  name="has_marketing_access" onChange={this.onHandleChange} class="form-control" required >
    <option >.....</option>
        <option  value={this.state.has_marketing_access} > false </option>
        <option  value={this.state.has_marketing_access_true} > true </option>
      </select>
    </div>
    <div class="form-group col-md-4">
    <label>has_sales_access</label>
    <select  onChange={this.onHandleChange} class="form-control" required >
    <option name="has_sales_access" >.....</option>
    <option  value={this.state.has_sales_access}> false </option>
    <option  value={this.state.has_sales_access_true}> true </option>

        
      </select>
    </div>
    </div>
    <div class="text-center">
  <button type="submit" class="btn btn-success">Save</button>
  <Link to='/user' class="btn btn-light">Cancel</Link>
  </div>
    </form>
        </div>
          

   
        )
    }

}
export default UserEdit;



