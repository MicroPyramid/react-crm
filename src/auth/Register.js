import React, { useState } from 'react';
import axios from 'axios';
import { AUTHENTICATION } from '../common/apiUrls';
import TextInput from '../crm/UIComponents/Inputs/TextInput';
import EmailInput from '../crm/UIComponents/Inputs/EmailInput';
import PasswordInput from '../crm/UIComponents/Inputs/PasswordInput';
import { Validations } from './Validations';

const Register = (props) =>  {    

    const [registrationDetails, setRegistrationDetails] = useState({
     sub_domain: '', username: '', email: '', password: ''
    });
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {        
     setRegistrationDetails({...registrationDetails, [e.target.name]: e.target.value});
    }
    
    const onRegister = (e) => {
     e.preventDefault();

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

     const validationResults = Validations(registrationDetails);
     setErrors(validationResults);        

     let isValidationsPassed = true;
    
     for (let i in validationResults) {      
        if (validationResults[i].length > 0) {       
            isValidationsPassed = false;
            break;

        }
     }        

     let config = {
        'Content-Type': 'application/json',
     }

     if (isValidationsPassed) {
        axios.post(`${AUTHENTICATION}register/`, registrationDetails, config)
            .then(res => {            
                if(res.status === 201) {
                    props.history.push('/validate-domain');
                    }
                })
            }               
    }    

        return (
            <div className="main_container main_container_mt">
                <div className="container">
                    <div className="row marl justify-content-center login_row">
                        <div className="col-md-6 col-lg-6 col-xl-4">
                            <div className="login_block">
                                <div className="login_form_block">
                                    <div className="welcome">bottlecrm</div>
                                    <form>
                                        <TextInput  elementSize="col-md-12" attrName="sub_domain" attrPlaceholder="Sub-domain" inputId="id_sub_domian" 
                                                    value={registrationDetails.subDomain} getInputValue={handleChange} error={errors.sub_domain}
                                                    styles="register-inputstyles"
                                                    />
                                        <TextInput  elementSize="col-md-12" attrName="username" attrPlaceholder="Username" inputId="id_username" 
                                                    value={registrationDetails.username} getInputValue={handleChange} error={errors.username}
                                                    styles="register-inputstyles"
                                                    />
                                        <EmailInput elementSize="col-md-12"  attrName="email"  attrPlaceholder="Email"  inputId="id_email"  
                                                    value={registrationDetails.email} getInputValue={handleChange} error={errors.email}
                                                    styles="register-inputstyles"/>
                                        <PasswordInput elementSize="col-md-12"  attrName="password"  attrPlaceholder="Password"  inputId="id_password"  
                                                    value={registrationDetails.password} getInputValue={handleChange} error={errors.password}
                                                    styles="register-inputstyles"/>
                                        <div className="forgot mt-3">Have an account? <a href="/app" onClick={() => this.props.history.push('/login')}>Login here</a></div>
                                        <button type="button" onClick={onRegister} className="btn btn-warning text-white">Register</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>                                                                                                  
                </div>
            </div>
        );    
}

export default Register;
