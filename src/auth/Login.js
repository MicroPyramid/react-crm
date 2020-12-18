import React, { Component } from 'react';
import { DOMAIN } from '../common';

export default class Login extends Component{
  constructor(props) {
    super()
    this.state = {
      email: '',
      password: '',
      company: '',
      errors: {}
    }
    localStorage.setItem('SubDomain', window.location.host.split('.')[0]);
  }

  componentDidMount() {
    if(localStorage.getItem('Token')) {
      this.props.history.push('/dashboard')
    }
  }
    
  onClickLogin() {
    if(this.state.email !== '') {
      if(this.state.password !== '') {
        let formData = {
          email: this.state.email,
          password: this.state.password
        }
        fetch('https://bottlecrm.com/api/auth/login/',
          { method: 'POST',
            headers: 
              {
                'Content-Type': 'application/json',
                'company': localStorage.getItem('SubDomain')
              },
            body: JSON.stringify(formData)
          }
        )
        .then((response) => response.json())
        .then(response => {
          if(response.status === 'failure') {
            this.setState({ errors: response })
          } else {
            localStorage.setItem('Token', response.token)
            this.props.history.push('/dashboard')
          }
        })
      } else {
        this.setState({ errors: { ...this.state.errors, password: 'please enter password' } })
      } 
    } else {
      this.setState({ errors: { ...this.state.errors, email: 'please enter email' } })
    }
  } 

  render() {
    return (
      <div id="mainbody" className="main_container" style={{ paddingTop: '65px' }}>
        <div className="container">
          <div className="row marl justify-content-center login_row">
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="login_block">
                <div className="login_form_block">
                  <div className="welcome">bottlecrm</div>
                  <form method="POST" action="">
                    <div className="form-group">
                      <input
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="email" 
                        name="email" 
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value, errors: {} })}
                      />
                      <span className="error">{this.state.errors.email}</span>
                    </div>
                    <div className="form-group">
                      <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value, errors: {} })} 
                      />
                      <span className="error">{this.state.errors.password}</span>
                      <span className="error">{this.state.errors.message}</span>
                    </div>
                    <div className="forgot">New Here? <a onClick={() => this.props.history.push('/register')}>Register</a></div>
                    <div className="forgot">Forgot Password <a onClick={() => this.props.history.push('/password-reset')}>Click Here?</a></div>
                    <button type="button" onClick={() => this.onClickLogin()}  className="btn btn-danger">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
