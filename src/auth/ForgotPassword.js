import React, { useState } from 'react';
import { AUTHENTICATION } from '../common';

const ForgotPassword = (props) => {

    const [email, setEmail] = useState(); 
    const [errors, setErrors] = useState();

    const forgotPassword = (e) => {
        e.preventDefault();
        fetch(`${AUTHENTICATION}forgot-password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body:  JSON.stringify({
                email: email
            })
        }).then(response => response.json())
            .then(res => {
                console.log(res)
                if (res.error === false) {
                    props.history.push('/password-reset/done');
                } else if(res.errors.email){
                    setErrors('This field is required');
                } else if (res.errors.non_field_errors) {
                    setErrors('Please enter valid email');
                }                
            });        
    } 
        
    return (
        <div className="main_container main_container_mt">
            <div className="container">
                <div className="row marl justify-content-center login_row">
                    <div className="col-md-6 col-lg-6 col-xl-4">
                        <div className="login_block">
                            <div className="login_form_block">
                                <div className="card-title">
                                    <center>
                                        <h2 className="welcome">Forgot Password</h2>
                                    </center>
                                </div>
                                <form method="post">
                                    <div className="form-group">                
                                        <input type="email" className="form-control" id="exampleinputmail" placeholder="Email" name="email"                                         
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>
                                        <span className="error mt-0">{errors}</span>
                                    </div>                                
                                    <input type="hidden" name="csrfmiddlewaretoken" value="gutrZqHraIsF688uNtedV7TiyquOqHZWk0V3mXZgNey3p3NF0EI7qMyTxZ0Vf6M0" />
                                    <center><button type="submit" className="btn btn-warning text-white" onClick={forgotPassword}>Submit</button></center>
                                    <div className="col-sm-10 form-group text-center forgot mt-2">
                                        Already Have An Account? <a href="/app" onClick={() => this.props.history.push('/login')}>Login</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>   
        </div>         
    );    
}

export default ForgotPassword;
