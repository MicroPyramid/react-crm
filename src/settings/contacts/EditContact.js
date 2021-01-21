import React from 'react'
import apiurl from '../../api/apiurl'
import {  Link, withRouter  } from 'react-router-dom';


class EditContact extends React.Component{
   
  state ={ 

   editcontacts : [],
   error : ""
}
 
    componentDidMount(){
    const id = this.props.match.params.id
    console.log( this.props.match.params.id)
            apiurl.get(`/settings/contacts/`)
            .then((posRes) => {
              this.setState({ 
               editcontacts : posRes.data.contacts
            
              })

               
              }).catch(errRes=> {
                        this.setState({
                          error:errRes
                        })
                         });
                        }

     onHandleChange = e => {
      this.setState({ ...this.state, [e.target.name] : e.target.value });
      };

     onSubmit = e => {
      const id = this.props.match.params.id
       e.preventDefault()
        apiurl.put(`/settings/contacts/${id}/`,this.state)
      this.props.history.push('/settings/contacts')
        
        }

   render() {
  
    return(

          <div className= "container mt-5 py-5">
             <div className="row">
              <div className="col-6 offset-3">
          <div className="card">
          <div className="card-header text-center">
           <b><i>EDIT USER</i></b> 
          </div>
          <div className="card-body">

          <form onSubmit={this.onSubmit}>
      
      <div className="form-group">
        <label><b>First Name</b></label>
        <input type="text" name="name" value={this.state.editcontacts.name} onChange={this.onHandleChange} className="form-control" required />
      </div>
      <div className="form-group ">
        <label><b>Last Name</b></label>
        <input type="text" name="last_name" value={this.state.editcontacts.last_name}  onChange={this.onHandleChange}  className="form-control" />
      </div>
        <div className="form-group">
          <label><b>Email</b></label>
          <input type="email" name="email" value={this.state.editcontacts.email}  onChange={this.onHandleChange} className="form-control" required />
  
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
export default withRouter(EditContact);





















//import React from 'react';
// import apiurl from '../../api/apiurl';

// class EditContact extends React.Component{
//     state = {
//         contact : []
//     }
    
//     componentDidMount(){
//         const id= this.props.match.params.id
//         apiurl.get()
//     }

// }






// import React, { useState,useEffect } from 'react';
// import apiurl from '../../api/apiurl';

// const EditContact = (props) =>{
//     const [contact, setContact] = useState([])

//     EditContact = ()=>{
//       const id= props.match.params.id 
//       apiurl.get(`/settings/contacts/${id}`)
//       .then(posRes=>{
//           setContact(posRes.data)
//       })
//       console.log(posRes.data)
//     }
    
//     useEffect=() =>{
//       EditContact()
//     }

//     return(
//         <div>hello</div>
//     )
// }

// export default EditContact;