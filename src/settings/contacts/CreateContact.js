import React from 'react';
import apiurl from '../../api/apiurl';
import { Link } from 'react-router-dom';

class CreateContact extends React.Component{
     
    state={
        name : '',
        last_name : '',
        email: ''
    }

      

    onHandleChange = e =>{
        console.log(e.target.value)
        this.setState({ [e.target.name] : e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        apiurl.post('/settings/contacts/', this.state)
        this.props.history.push('/settings/contacts')
    }


    render(){
        const {name , last_name , email} = this.state
        return(
            <div className="container mt-5 py-5">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <div className="card-header text-center">
                            <h6><b><i>Add Email For Campaign</i></b></h6>
                        </div>
                        <div className="card-body">
                             
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
    <label htmlFor="username">First Name</label>
    <input type="text" class="form-control" name="name" onChange={this.onHandleChange} id="username"  placeholder="Enter name" required/>
    {/* <span style={{color:"red"}}>{!this.state.name? 'This Field is required' : null}</span> */}
    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>
 
  <div className="form-group">
    <label for="lastname">Last Name</label>
    <input type="text" className="form-control" name="last_name" onChange={this.onHandleChange} id="lastname" placeholder="Enter lastname" required />
    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name="email" onChange={this.onHandleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/settings/contacts" className="btn btn-warning">Cancel</Link>
</form>
                        </div>
                    </div>
                </div>
            </div>




            </div>
        )
    }
}
export default CreateContact;