import React from 'react';
import { Link } from 'react-router-dom';
import apiurl from '../api/apiurl';

class ProfileDetails extends React.Component{

    state={
        profile : [],
        error: ""
    }

    componentDidMount(){
    
        apiurl.get('/profile/')
        .then(pos => {
            this.setState({
                profile: pos.data.user_obj
            })
            

        }).catch(err=>{
            this.setState({
              error : err
            })
        })
    }
     
    render(){
      const {profile} = this.state

      if(this.state.error){
        return <div className="container text-center"><h1>404 Error Bad Request</h1></div>
       }
      
        return( 
        <div className="container mt-5"> 
         <div className="row">
              <div className="col-6 offset-3">
         
          <div className="card">
          <div className="card-header text-right bg-secondary"> <span className="float-left "><h6><b>PROFILE</b></h6></span>
                <Link to ='/profile/change-password' className="btn btn-warning btn-md">Change Password</Link>
                </div>
 
               <div className="card-body">
       <form>     
       <div className="form-group row">
    
    <div className="col-md-6">
    <img src={profile.profile_pic} className="form-control-plaintext" alt="Micro profile pic" />
    </div>
    
  
  </div>       
     <div className="form-group row">
   
    <label for="staticEmail" className="col-sm-3 col-form-label">Name:</label>
    <div className="col-md-4">
      <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={profile.first_name+profile.last_name}/>
    </div>
    
  </div>
 
  <div className="form-group row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Username:</label>
    <div className="col-md-6">
      <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={profile.username} />
    </div>
    
  
  </div>
  <div className="form-group row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Email:</label>
    <div className="col-md-6">
      <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={profile.email} />
    </div>
  </div>
    <div class="form-group row">
    <label for="staticEmail" class="col-sm-3 col-form-label">Permissions:</label>
    <div class="col-md-6">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail"
             value={profile.has_sales_access || profile.has_marketing_access? 'sales,marketing' : 'null'} />
    </div>
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
export default ProfileDetails;