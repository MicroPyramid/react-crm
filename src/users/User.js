import React from 'react'
import apiurl from '../api/apiurl'
import { Link } from 'react-router-dom'
import InactiveUsers from './inactiveUsers/InactiveUser';
import ShowMe from './ShowMe'

  class Users extends React.Component{
    constructor(){
    super();
    this.state= {
        usersList : [],
        inactiveuser : [],
        show : false,
        term : '' ,
        error: ""
    }

    }

componentDidMount(){
       apiurl.get('/users/')
    
 .then((posRes) => {
    this.setState({ 
        usersList : posRes.data.active_users,
        inactiveuser : posRes.data.inactive_users
        
        
       })
     
   
 }).catch((errRes)=> {
        this.setState({
            error:errRes
        })
     });

    }

    handleChange= (e) => {
        this.setState({
            term : e.target.value
        })
    }

    displayDate = (string) =>{
        let date = new Date(string)
         return date.toLocaleDateString();
      }

      actions = () => {
          this.setState({
              show : !this.state.show
          })
      }

    render(){
         const { usersList,inactiveuser , term } = this.state
         
         if(this.state.error){
            return <div className="container text-center mt-5 py-5"><h1>404 Error bad Request</h1></div>
           }
        return (
            <div className="container-fluid py-5">
                        
                        <div className="text-right py-2">
                        
                        <Link to ="/users/create" className="btn btn-success mr-2" >Add New User</Link>
                        </div>

            <div>
                {
                    this.state.show? <div> <ShowMe value={this.state.term} 
                                                   onChange={this.handleChange}   /> </div> :null
                }
            </div>
                   <br></br>
 

                        <nav>
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <a className="nav-link active" className ="btn btn-success"  id="nav-user-tab" data-toggle="tab" href="#user" role="tab" aria-controls="nav-user" aria-selected="true">Active Users({usersList.length})</a>
    <a className="nav-link"  className="btn btn-secondary"  id="nav-inactive-tab"  data-toggle="tab" href="#inactive" role="tab" aria-controls="nav-inactive" aria-selected="false">Inactive Users({inactiveuser.length})</a>
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="user" role="tabpanel" aria-labelledby="nav-home-tab">
  <div>
            <div className="card">
                <div className="card-header text-right bg-dark text-white"> <span className="float-left "><h6><b>Active Users - {usersList.length}</b></h6></span>
                <button className="btn btn-warning btn-md" onClick={this.actions} >Filter</button>
                </div>

                <div className="card-body bg-light">
                 <div className="table-responsive">
                  <table className="table table-striped table-light">
                    <thead>
                     <tr>
                        <td>ID</td>
                        <th >Username</th>
                        <th >Created</th>
                        <th >Email Address</th>
                        <th >UserRole</th>
                        <th> Permissions</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                        </thead>
                        <tbody>
                        {usersList.filter((val)=>{
                            if(term===""){
                                return val;
                            } else if(val.username.toLowerCase().includes(term.toLowerCase())){
                                return val;
                            }
                        }).map(user => ( 
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{this.displayDate(user.date_joined)}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            { user.has_marketing_access || user.has_sales_access ? 'sales,marketing' : 'null' }
                           
                        </td>
                        <td> 
                        <Link to={`/users/status/${user.id}`}  >Active</Link>

                          
                        </td>
                        <td> 
                           
                          <Link to={`/users/edit/${user.id}`} className="btn btn-primary mr-2">Edit</Link>
  
                          <Link to ={`/users/delete/${user.id}`} className="btn btn-danger">
                            Delete </Link> 
                            </td>
                       </tr> 
                        ))} 
                        </tbody>
                        </table>
                        </div>
                        
                        </div>
                        </div>
                
            </div>
            </div>
      
     

  <div className="tab-pane fade" id="inactive" role="tabpanel" aria-labelledby="nav-inactive-tab">
      
      <InactiveUsers />
      </div>
</div> 


                        </div>
                        )
                }
            
            }
            export default Users;
                        
   
  

 
   
 
























































