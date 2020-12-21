import React from 'react'
import apiurl from '../../api/apiurl'
import { Link } from 'react-router-dom'


class InactiveUsers extends React.Component{

    constructor(){
    super();
    this.state= {
        inactiveuser : [],
        show : true,
        term : ''
    }
    }

componentDidMount(){
       apiurl.get('/users/')
    
 .then((posRes) => {
    this.setState({ 
        inactiveuser : posRes.data.inactive_users
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
    


    render(){
         const { inactiveuser , term } = this.state
        return (
        <div>
          <div className="card">
                <div className="card-header text-right"> <span className="float-left ">Inctives Users</span>
                <input type = "text" value={this.state.term} onChange= {this.handleChange} />
                </div>
                         <div className="card-body">
                             <div className="table-responsive">
                         <table className="table">
                        <thead>
                        <tr>
                            <td>ID</td>
                        <th >Username</th>
                   
                   <th >Email Address</th>
                   <th >UserRole</th>
                  <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inactiveuser.filter((val)=>{
                            if(term===""){
                                return val
                            } else if(val.username.toLowerCase().includes(term.toLowerCase())){
                                return val;
                            }
                        }).map(user=> ( 
                        <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td> 
                         {/* <Link to="/users/show" className="btn btn-primary mr-2">View</Link> */}
                           
                         <Link to={`/users/edit/${user.id}`} className="btn btn-warning mr-2">Edit</Link>
                         <Link to ={`/users/delete/${user.id}`} type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
              Delete
            </Link>
                          
                         
        
                         </td>
                        </tr> 
                        ))} 
                        </tbody>
                        </table>
                        </div>
                        
                        </div>
                        </div>
                
           
            
        </div> 
                  )
                }
            }
    export default InactiveUsers;
                        