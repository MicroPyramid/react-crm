import React, { Component } from 'react';

import { AUTHENTICATION } from '../common/apiUrls';


export default class ValidateDomain extends Component {
    constructor () {
        super();
        this.state = {
            domain: '',
            errors: {}
        };
    }


    onClick () {
        if (this.state.domain.trim()) {
            fetch(`${AUTHENTICATION}validate-subdomain/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sub_domain: this.state.domain })
            })
                .then((res) => res.json())
                .then((res) => {                    
                    if (res.error) {                        
                        this.setState({ errors: { message: 'Company does not exist'}})
                    } else {
                        const redirectUrl = `//${this.state.domain}.bottlecrm.com/app/login`;                                                                                                            
                        window.location.href = redirectUrl;
                    }                    
                });
        } else {
            this.setState({ errors: { message: 'Please mention a sub_domain' } });

        }
    }

    render () {
        return (
            <div className="main_container main_container_mt">
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
                                                id="id_sub_domain"
                                                placeholder="subdomain.bottle.crm"
                                                name="sub_domain"
                                                value={this.state.domain}
                                                onChange={(e) =>
                                                    this.setState({ domain: e.target.value, errors: {} })
                                                }
                                            />
                                            <span className="error">{this.state.errors.message}</span>
                                        </div> 
                                        <div className="forgot">New Here? <a href="/app/register" onClick={() => this.props.history.push('/register')}>Register</a></div>
                                        <div className="forgot">Forgot Password <a href="/app/password-reset/">Click Here?</a></div>
                                        <button type="button" onClick={() => this.onClick()} className="btn btn-warning text-white">Login</button>                                                                                                                    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                    
                  
        );
    }
}

