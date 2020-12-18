import React from 'react'
import apiurl from '../api/apiurl'
import { Link } from 'react-router-dom'
import InactiveUsers from './inactiveUsers/InactiveUser';

  class Users extends React.Component{
    constructor(){
    super();
    this.state= {
        usersList : [],
        show : true,
        term : '' 
    }
    
    }

componentDidMount(){
       apiurl.get('/users/')
    
 .then((posRes) => {
    this.setState({ 
        usersList : posRes.data.active_users
       })
     //  console.log(posRes.data)
 }, (errRes)=> {
     console.log(errRes)
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
    


    render(){
         const { usersList , term } = this.state
        return (
            <div className="container-fluid py-5">
                        
                        <div className="text-right py-2">
                        
                        <Link to ="/users/create" className="btn btn-success mr-2" >Add New User</Link>
                        
                        </div>
         
         <ul class="nav nav-tabs">
              <li className="nav-item">
             <a className="nav-link active" data-toggle="tab" id="active-tab" aria-current="page" href="#user">Active User()</a>
              </li>
               <li className="nav-item">
               <a className="nav-link" data-toggle="tab" id="inactive-tab" href="#inactive" >Inactive user</a>
                 </li>
  
        </ul>
        <div className="tab-content">
            <div className="tab-pane active" id="user" aria-labelledby="active-tab">

            <div className="card">
                <div className="card-header text-right"> <span className="float-left ">Actives Users</span>
                <input type = "text" value={this.state.term} onChange= {this.handleChange} placeholder="Search an user" />
                </div>

                <div className="card-body">
                 <div className="table-responsive">
                  <table className="table">
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
                                return val
                            } else if(val.username.toLowerCase().includes(term.toLowerCase())){
                                return val;
                            }
                        }).map(user=> ( 
                        <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{this.displayDate(user.date_joined)}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            { user.has_marketing_access || user.has_sales_access ? 'sales,marketing' : 'null' }
                           
                        </td>
                        <td> 
                            {user.is_active? 'Active' : 'inactive' }
                        </td>
                        <td> 
                         {/* <Link to="/users/show" className="btn btn-primary mr-2">View</Link> */}
                           
                         <Link to={`/users/edit/${user.id}`} className="btn btn-warning mr-2">Edit</Link>
                         <Link to ={`/users/delete/${user.id}`} type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
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
               <div className="tab-pane" id="inactive" aria-labelledby="inactive-tab" >
              
                  < InactiveUsers />

                </div>
            
        </div> 
</div>

                 )
                }
            
            }
            export default Users;
                        
   
  

 
   
 
























































