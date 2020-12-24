import React from 'react';
import apiurl from '../api/apiurl';
import { Link } from 'react-router-dom'

class Status extends React.Component{

    state = {
        user: []
    }

    componentDidMount(){
        const id = this.props.match.params.id
                apiurl.get(`/users/${id}/`)
                .then((posRes) => {
                  this.setState({ 
                    user : posRes.data.data.user_obj
                    
                  })
                    console.log(posRes.data.data.user_obj)
                     
                           
                }).catch(errRes=> {
                             console.log(errRes)
                             });
                            }
                

        inactiveuser= () =>{
         this.setState({
          ...this.state.user, is_active: false
         })
         console.log(this.state.user)
           this.props.history.push('/user')
          }
       
    render(){
        return (
            <div className="container mt-5">
 <div class="card">
   <div class="card-header">
    inactive User?
   </div>
   <div class="card-body">
    
     <p class="card-text"> Are You sure you want to deactivate this user ?</p>
     <button onClick={this.inactiveuser} className="btn btn-primary">Ok</button>
          <Link to='/user' className="btn btn-secondary">Cancel</Link>
   </div>
 </div>
 </div>

        )
    }
}

export default Status;

