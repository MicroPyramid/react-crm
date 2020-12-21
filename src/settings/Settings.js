import React from 'react';
import { Link } from 'react-router-dom';
import apiurl from '../api/apiurl'

class Settings extends React.Component{

    constructor(){
        super();
        this.state= {
            contactList : [],
            search : '',
            isFilterClicked: false
        }
        }

        filterClicked= () => {
          this.setState({isFilterClicked: !this.state.isFilterClicked })
        }
    
    componentDidMount(){
           apiurl.get('/contacts/')
        
     .then((posRes) => {
        this.setState({ 
            contactList : posRes.data.users
           })
          console.log(posRes.data.users)
     }, (errRes)=> {
         console.log(errRes)
         });
    
        }

        handleChange(e) {
            this.setState({
                search : e.target.value
            })
        }
    displayDate = (string) =>{
      let date = new Date(string)
       return date.toLocaleDateString();
    }
      
    render() {
    
   
         const { contactList,search} = this.state;
    
        
        return (
            <div className="container-fluid py-5">
            
            <div className="text-right py-2">
        
        <Link className="btn btn-success mr-2" to="/contacts"  >Add Contact</Link>
         
        <Link className="btn btn-success mr-2" to="/blockdomain  ">Block Domain</Link>
         
        <Link className="btn btn-success mr-2" to="blockemail  ">Block Email</Link>
        </div>
        <div>
          <span> 
        { this.state.isFilterClicked && <input type = "text text-center" value={this.state.search} onChange= {(e) => this.handleChange(e)} placeholder="search an user"/> }
          </span>
          </div>
            <div>
            {/* <input type = "text" value={this.state.search} onChange= {(e) => this.handleChange(e)} /> */}
             
          

             </div>
            <button type="button" class="btn btn-primary  ">Contacts</button>
            <button type="button" class="btn btn-info  ">Blocked Domains</button>
            <button type="button" class="btn btn-info  ">Blocked Emails</button>

            <div class="card">
              <div class="card-header text-dark text-right"> 
              <span class="float-left ">Contacts - 1</span>
              <span>
                {/* { this.state.isFilterClicked && <Filter />} */}
                <button onClick={this.filterClicked}>Filter</button>
              </span>
    
              </div>
             <div class="card-body">
                 {/* <div class="card-title">Contacts</div> */}
                 <div className="table-responsive">
             <table className="table">
  <thead>
  <tr>
       <th >ID</th>
       <th >Name</th>
       <th >Email Address</th>
       <th >Created by</th>
       <th> Created on</th>
       
       <th>Actions</th> 
     </tr>
  </thead>
  <tbody>
  {contactList.filter((val)=>{
     if(search==""){
       return val
     } else if(val.first_name.toLowerCase().includes(search.toLowerCase())){
       return val
     }
   }).map((contact)=>(
          <tr>
           <td>{contact.id}</td>
           <td>{contact.first_name}</td>
           <td>{contact.email}</td>
           <td>
           <img src="https://bottlecrm.s3.amazonaws.com/images/user.png" width="40px"height="40px" title="contact.email"></img>
          
           </td>
           <td>{this.displayDate(contact.date_joined)}</td>
         
           <td> 
            <button className="btn btn-warning mr-2">Edit</button>
             <button className="btn btn-danger">Delete</button>
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

export default Settings;