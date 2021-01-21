import React from 'react'
import apiurl from '../../api/apiurl'
import { Link } from 'react-router-dom'



class InactiveUsers extends React.Component{

    constructor(){
    super();
    this.state= {
        inactiveuser : [],
        term : '',
        error : ""
    }
    }

componentDidMount(){
       apiurl.get('/users/')
    
 .then((posRes) => {
    this.setState({ 
        inactiveuser : posRes.data.inactive_users
       })
     
 }).catch((errRes)=> {
       this.setState({
           error: errRes
       })
     });

    }

    handleChange= (e) => {
        this.setState({
            term : e.target.value
        })
    }
    
    render(){
         const { inactiveuser , term } = this.state
         if(this.state.error){
            return <div className="container text-center"><h1>404 Error bad Request</h1></div>
           }
        return (
        <div>
            {inactiveuser.length === 0 ? 
                <React.Fragment>
            <div className="card">
                     <div className="card-header">Inactive Users - 0</div>
                     <div className="card-body text-center">
                         No Records Found
                     </div>
                 </div>
        </React.Fragment> :
             <React.Fragment>
                   <div className="card">
               
               <div className="card-header text-right bg-dark text-white"> <span className="float-left "><h6><b>Inactive Users - {inactiveuser.length}</b></h6></span>

               <input type = "text" value={this.state.term} onChange= {this.handleChange} placeholder="search user"/>
               </div>
                        <div className="card-body">
                            <div className="table-responsive">
                        <table className="table table-striped">
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
                        
                       <tr key={user.id}>
                       <td>{user.id}</td>
                       <td>{user.username}</td>
                       <td>{user.email}</td>
                       <td>{user.role}</td>
                       <td> 
                        <Link to={`/users/edit/${user.id}`} className="btn btn-warning mr-2">Edit</Link>
                        <Link to ={`/users/delete/${user.id}`} className="btn btn-danger"> Delete </Link>
                         
                         </td>
                       </tr> 
                       ))} 
                       </tbody>
                       </table>
                       </div>
                       
                       </div>
                       </div>
             </React.Fragment>
             }
          
                      </div> 
                  )
                }
            }
    export default InactiveUsers;
                        