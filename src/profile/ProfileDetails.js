import React from 'react';
import { Link } from 'react-router-dom';
import apiurl from '../api/apiurl';

class ProfileDetails extends React.Component{

    state={
        profile : []
    }

    componentDidMount(){
    
        apiurl.get('/profile/')
        .then(pos => {
            this.setState({
                profile: pos.data.user_obj
            })
            console.log(pos.data.user_obj)

        }).catch(err=>{
            console.log(err)
        })
    }
     
    render(){
        const {profile} = this.state
        return( 
        <div className="container mt-5"> 
          <div className="card">
          <div className="card-header text-right bg-secondary"> <span className="float-left "><h6><b>PROFILE</b></h6></span>
                <Link to ='/profile/change-password' className="btn btn-warning btn-md">Change Password</Link>
                </div>
 
               <div className="card-body">
       <form>            
     <div class="form-group row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Name:</label>
    <div class="col-md-6">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={profile.first_name+profile.last_name}/>
    </div>
  </div>
 
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Username</label>
    <div class="col-md-6">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={profile.username} />
    </div>
  </div>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-md-6">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={profile.email} />
    </div>
  </div>
    <div class="form-group row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Permissions</label>
    <div class="col-md-6">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail"
             value={profile.has_sales_access || profile.has_marketing_access? 'sales,markting' : 'null'} />
    </div>
  </div>

  <div class="col-md-4">
              <div class="profile_pic">
                
                <img src="https://bottlecrm.s3.amazonaws.com/images/user.png" alt="Micro profile pic" />
                
              </div>
            </div>
    </form>
  </div>
</div>
        </div>
        )
    }
}
export default ProfileDetails;