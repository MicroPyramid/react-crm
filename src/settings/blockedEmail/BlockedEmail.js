import React from 'react';
import { Link } from 'react-router-dom'
import apiUrl from '../../api/apiurl'

class BlockedEmail extends React.Component{
      constructor(props){
          super(props)
         this.state= {
            blockedEmail : [],
            term : '',
            error : "",
        }
    }
    
    filterData=()=>{
        const updatedBlockedEmail= this.state.blockedEmail.filter(item => {
            return item.email.toLowerCase().includes(this.state.term.toLowerCase())
        })
        this.setState({blockedEmail: updatedBlockedEmail})
    }

       onChange = (e)=>{
         this.setState({
             term : e.target.value
         })
      }
      

  
    componentDidMount(){
        apiUrl.get('/settings/block-emails/')
        .then(posRes => {
            this.setState({
            blockedEmail : posRes.data.blocked_emails
        })
       console.log(posRes.data)
    }).catch(errRes => {
        this.setState({
            error : errRes
        })
    })
}
    render(){
       const {blockedEmail} = this.state

       return(
            
        
            <React.Fragment>
          { blockedEmail.length === 0 ? 
          <React.Fragment>
          <div className="card">
                   <div className="card-header"><b>Blocked Emails - 0</b></div>
                   <div className="card-body text-center">
                       No Records Found
                   </div>
               </div>
      </React.Fragment> :  
     <div className="card">
     <div className="card-header text-right"> <span className="float-left "><h6><b>Blocked Email - {blockedEmail.length}</b></h6></span>
     
    <button className="btn btn-warning btn-md" onClick={this.actions} ><i className="fas fa-filter"></i>Filter</button>
   
  </div>
  <div className="card-body">
      <div className="table-responsive">
  <table className="table table-striped">
    <thead>
         <tr>
             <th>ID</th>
             <th>Email</th>
             <th>Created By</th>
             <th>Created On</th>
             <th> Actions</th>
         </tr>
    </thead>
    <tbody>
        {blockedEmail.map((email) => (
                <tr key={email.id}>
                <td>{email.id}</td>
                <td>{email.email}</td>
                <td>
                    <img src={email.created_by.profile_pic} alt="image" />
                </td>
                <td>{email.created_on}</td>
                <td>
                    <Link to={`/settings/editblockedemail/${email.id}`} className="btn btn-primary mr-2"><i className="fas fa-edit"></i>Edit</Link>
                    <Link to={`/settings/deleteblockedemail/${email.id}`} className="btn btn-danger"><i className="far fa-trash-alt"></i>Delete</Link>

                </td>
            </tr>
        ))}
          
    </tbody>
</table>
  </div>
</div>
     </div>
    } 
     
     </React.Fragment>

                
              
        )
    }
}
export default BlockedEmail
