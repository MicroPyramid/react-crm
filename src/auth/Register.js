import React, { Component } from 'react';
import {DOMAIN} from '../common/apiUrls';

export default class Register extends Component{
  constructor(){
    super()
    this.state = {
      subDomain: '',
      email: '',
      password: '',
      username: '',
      errors: {}
    }
  }

  onRegister(){
    if(this.state.subDomain !== '') {
      if(this.state.username !== '') {
        if(this.state.email !== '') {
          if(this.state.password !== '') {
            fetch(`${DOMAIN}register/`,
              { method: 'POST',
                headers: 
                  {
                    'Content-Type': 'application/json',
                    'company': localStorage.getItem('SubDomain')
                  },
                body: JSON.stringify({ 
                  sub_domain: this.state.subDomain, 
                  username: this.state.username,
                  email: this.state.email,
                  password: this.state.password  
                })
              }
            )
            .then((response) => response.json())
            .then(response => {
              if(response.status === 'failure') {
                this.setState({ errors: response })
              } else {
                this.props.history.push('/validate-domain')
              }
            })
          } else {
            this.setState({ errors: {password: 'please enter password'} })
          } 
        } else {
          this.setState({ errors: {email: 'please enter email'} })
        }
      } else {
        this.setState({ errors: {username: 'please enter username'} })
      }
    } else {
      this.setState({ errors: {subDomain: 'please enter subdomin'} })
    }  
  }

  render() {
    return (
      <div classNameName="main_container" style={{paddingTop: '65px'}}>
        <div className="container">
          <div className="row marl justify-content-center login_row">
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="login_block">
                <div className="login_form_block">
                  <div className="welcome">bottlecrm</div>
                  <form>
                    <div className="form-group">
                      <input 
                        type="text"
                        className="form-control"
                        id="id_sub_domain"
                        placeholder="Sub-domain"
                        name="sub_domain"
                        value={this.state.subDomain}
                        onChange={(e) => this.setState({ subDomain: e.target.value, errors: {} })}
                      />
                      <span className="error">{this.state.errors.subDomain || (this.state.errors.errors && this.state.errors.errors.sub_domain)}</span>
                    </div>
                    <div className="form-group">
                      <input 
                        type="text"
                        className="form-control"
                        id="exampleInputEmail2"
                        placeholder="username" 
                        name="username"
                        value={this.state.username}
                        onChange={(e) => this.setState({ username: e.target.value, errors: {} })}
                      />
                      <span className="error">{this.state.errors.username || (this.state.errors.errors && this.state.errors.errors.username)}</span>
                    </div>
                    <div className="form-group">
                      <input 
                        type="text"
                        className="form-control"
                        id="exampleInputEmail2"
                        placeholder="email"
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value, errors: {} })}
                      />
                      <span className="error">{this.state.errors.email || (this.state.errors.errors && this.state.errors.errors.email)}</span>
                    </div>
                    <div className="form-group">
                      <input 
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value, errors: {} })}
                      />
                      <span className="error">{this.state.errors.password || (this.state.errors.errors && this.state.errors.errors.password)}</span>
                    </div>
                    <span className="error">{this.state.errors.message}</span>
                    <div className="forgot">Have an account? <a onClick={() => this.props.history.push('/login')}>Login here</a></div>
                    <button type="button" onClick={() => this.onRegister() } className="btn btn-danger">Register</button>
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
