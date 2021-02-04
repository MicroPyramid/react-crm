import React from 'react';
import { Link } from 'react-router-dom'
import apiUrl from '../../api/apiurl'

class BlockedDomain extends React.Component{
      constructor(props){
          super(props)
         this.state= {
            blockdomain : [],
            term : '',
            error : ""
        }
    }
    
     componentDidMount(){
        apiUrl.get('/settings/block-domains/')
        .then(posRes => {
            this.setState({
            blockedomain : posRes.data.blocked_domains
        })
    }).catch(errRes => {
        this.setState({
            error : errRes
        })
    })
}

filterData=()=>{
    const updatedBlockedDomain= this.state.blockdomain.filter(item => {
        return item.email.toLowerCase().includes(this.state.term.toLowerCase())
    })
    this.setState({blockdomain: updatedBlockedDomain})
}




  onChange = (e)=>{
     this.setState({
         term : e.target.value
     })
  }
  
    render(){
       const {blockdomain} = this.state

      return(
            <React.Fragment>
        {blockdomain.length === 0 ?  
        <React.Fragment>
            <div className="card">
                     <div className="card-header"><b>Blocked Domains - {blockdomain.length}</b></div>
                     <div className="card-body text-center">
                         No Records Found
                     </div>
                 </div>
        </React.Fragment>: 
     <div className="card">
     <div className="card-header text-right"> <span className="float-left "><h6><b>Blocked Domain - {blockdomain.length}</b></h6></span>
     
    <input type="text" onChange={this.onChange} value= {this.state.term} />
    <button className="btn btn-warning btn-md" onClick={this.filterData} ><i className="fas fa-filter"></i>Filter</button>
   
  </div>
  <div className="card-body">
      <div className="table-responsive">
  <table class="table table-striped">
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
        {blockdomain.map((domain) => (
                <tr key={domain.id}>
                <td>{domain.id}</td>
                <td>{domain.email}</td>
                <td>
                    <img src={domain.created_by.profile_pic} alt="image" />
                </td>
                <td>{domain.created_on}</td>
                <td>
                    <Link to={`/settings/blockdomain/edit/${domain.id}`} className="btn btn-primary mr-2"><i className="fas fa-edit"></i>Edit</Link>
                    <Link to={`/settings/blockdomain/delete/${domain.id}`} className="btn btn-danger"><i className="far fa-trash-alt"></i>Delete</Link>

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
export default BlockedDomain;
