import React from 'react'
import apiurl from '../../api/apiurl'
import {  Link  } from 'react-router-dom';


class EditBlockedDomain extends React.Component{
   
  state ={ 

   domains : []
}
 
    componentDidMount(){
 
            apiurl.get(`/settings/block-domains/`)
            .then((posRes) => {
              this.setState({ 
               emails: posRes.data.blocked_domains
            
              })
               
              }).catch(errRes=> {
                       console.log(errRes)
                         });
                        }

     onHandleChange = e => {
      this.setState({ ...this.state, [e.target.name] : e.target.value });
      };

     onSubmit = e => {
      const id = this.props.match.params.id
       e.preventDefault()
        apiurl.put(`/settings/block-domains/${id}/`,this.state)
      this.props.history.push('/settings/contacts')
        
        }

   render() {
  
    return(
          <div className= "container mt-5 py-5">
             <div className="row">
              <div className="col-6 offset-3">
          <div className="card">
          <div className="card-header text-center">
           <b><i>EDIT DOMAIN</i></b> 
          </div>
          <div className="card-body">

          <form onSubmit={this.onSubmit}>
      
        <div className="form-group">
          <label><b>Email</b></label>
          <input type="email" name="email" value={this.state.emails.email}  onChange={this.onHandleChange} className="form-control" required />
  
        </div>
    <div className="text-center">
  <button type="submit"className="btn btn-success">Save</button>
  <Link to='/settings/contacts'className="btn btn-light">Cancel</Link>
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
export default EditBlockedDomain;