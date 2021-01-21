import React from 'react';
import apiurl from '../../api/apiurl';
import { Link } from 'react-router-dom';

class CreateBlockedDomain extends React.Component{
     
    state={
        email: ''
    }

      

    onHandleChange = e =>{
        console.log(e.target.value)
        this.setState({ [e.target.name] : e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        apiurl.post('/settings/block-domains/', this.state)
        this.props.history.push('/settings/contacts')
    }


    render(){
        const {email} = this.state
        return(
            <div className="container mt-5 py-5">
            <div className="row">
                <div className="col-6 offset-3">
                   <div className="card">
                       <div className="card-header text-center"><h6><b>Create Block Email</b></h6></div>
                       <form>
                           <div className="card-body">
                       <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name="email" onChange={this.onHandleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
  </div>
  <div className="text-center">
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/settings/contacts" className="btn btn-warning">Cancel</Link>
  </div>
  </div>
  </form>

                   </div>
                </div>
            </div>
            </div>
)

}
}
export default CreateBlockedDomain;