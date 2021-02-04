import React from 'react';
import { Link } from 'react-router-dom';
import BlockDomain from '../blockedomain/BlockDomain';
import BlockedEmail from '../blockedEmail/BlockedEmail';
import apiUrl from '../../api/apiurl';
import ContactFilter from './ContactFilter'

class ContactList extends React.Component{
      constructor(props){
          super(props)
         this.state= {
            contactsList : [],
            show: false,
            term : '',
            error : ""
        }
    }
    componentDidMount(){
    this.renderRequest()
}
 
renderRequest = ()=>{
    apiUrl.get('/settings/contacts/')
    .then(posRes => {
        this.setState({
        contactsList : posRes.data.contacts
    })
   
}).catch(errRes => {
    this.setState({
        error : errRes
    })
})
}
 
onChange = (e)=>{
    this.setState({
        term : e.target.value
    })
 }
 
 actions = () => {
    this.setState({
        show : !this.state.show
    })
}
  filterData=(e)=>{
      
        const updatedContactList= this.state.contactsList.filter(item => {
            return item.name.toLowerCase().includes(this.state.term.toLowerCase())
                  
                 
        })
        this.setState({contactsList: updatedContactList})
        e.preventDefault()
    }

  
   
    render(){
        
       const {contactsList} = this.state

        return(
            
            <div className="ui container-fluid mt-5">

                  <div className="text-right py-2">
                   <Link to ="/settings/contacts/create" className="btn btn-danger mr-1" ><i className="fas fa-plus"></i> Contacts</Link>
                   <Link to ="/settings/blockedomain/create" className="btn btn-danger mr-1" ><i className="fas fa-plus"></i> Block Domains</Link>
                   <Link to ="/settings/blockedemail/create" className="btn btn-danger" ><i className="fas fa-plus"></i> Block Emails</Link>
                 </div>
     <nav>
       { this.state.show ? <div> <ContactFilter onChange={this.onChange} 
                                               value= {this.state.term}
                                               onClick={this.filterData} />  </div> : null

       }

    <div className="nav nav-tabs" id="myTab" role="tablist">
  
    <a className="nav-link active" className="btn btn-primary" id="nav-contacts-tab" data-toggle="tab" href="#contacts" role="tab" aria-controls="contacts" aria-selected="true">Contacts</a>
  
  
    <a className="nav-link" className="btn btn-secondary" id="nav-domain-tab" data-toggle="tab" href="#blockdomain" role="tab" aria-controls="blockdomain" aria-selected="false">Blocked Domain</a>
  
  
    <a className="nav-link" className="btn btn-secondary" id="nav-email-tab" data-toggle="tab" href="#blockemail" role="tab" aria-controls="blockemail" aria-selected="false">Blocked Email</a>
  
</div>
</nav>
<div className="tab-content" id="mtTabContent">
  <div className="tab-pane fade show active" id="contacts" role="tabpanel" aria-labelledby="nav-home-tab">
      <React.Fragment>
   
      {contactsList.length ===0 ?  
         <React.Fragment>
         <div className="card">
                  <div className="card-header">contacts - 0</div>
                  <div className="card-body text-center">
                      No Records Found
                  </div>
              </div>
     </React.Fragment> :
      <React.Fragment>
     <div className="card">
     <div className="card-header text-right"> <span className="float-left "><h6><b>contacts -{contactsList.length}</b></h6></span>
    <button className="btn btn-warning btn-md" onClick={this.actions} ><i className="fas fa-filter"></i>Filter</button>
   
  </div>
  <div className="card-body">
      <div className="table-responsive">
  <table className="table table-striped">
    <thead>
         <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Email</th>
             <th>Created By</th>
             <th>Created On</th>
             <th> Actions</th>
         </tr>
    </thead>
    <tbody>
        {contactsList.map(contact => (
                <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>
                    <img src={contact.created_by.profile_pic} alt="image" />
                </td>
                <td>{contact.created_on}</td>
                <td>
                    <Link to={`/settings/contacts/edit/${contact.id}`} className="btn btn-primary mr-2"><i className="fas fa-edit"></i>Edit</Link>

                    <Link to={`/settings/contacts/delete/${contact.id}`} className="btn btn-danger"><i className="far fa-trash-alt"></i>Delete</Link>

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
      </React.Fragment>

     </div>
     
    
  <div className="tab-pane fade" id="blockdomain" role="tabpanel" aria-labelledby="nav-domain-tab">
  { this.state.show ? <div> <ContactFilter onChange={this.onChange} 
                                               value= {this.state.term}
                                               onClick={this.filterData} />  </div> : null

       }
      <BlockDomain />
  </div>
  <div className="tab-pane fade" id="blockemail" role="tabpanel" aria-labelledby="nav-email-tab">
      <BlockedEmail />
      </div>
</div>

                        </div>
                
              
        )
    }
}
export default ContactList;
