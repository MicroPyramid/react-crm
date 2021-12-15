import React from 'react';
import { Link } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { updateErrors, alertMessage } from '../../redux/actions/Auth'
import './auth.css' 

const LoginPage = (props) => { 
  
  const clearAlerts = () => {
    props.updateErrors('')
    props.alertMessage('')
  }
  return (
<div className="bg-white height-100 registration">
      <Row>                  
        <Col span={15}>
        <img src={require('../../assets/images/logo.png').default} alt="" className="register-logo" />
          <Row justify="center" align="middle">                  
                <Col className="register-margin" style={{marginTop: '200px'}}>
                  <h1>Sign In</h1>
                  <p>Don't have an account? &nbsp;
                    <Link to="/register" onClick={() =>  clearAlerts() }>Sign Up</Link>
                  </p>
                  <LoginForm {...props} />
                </Col>                                                                          
          </Row>
        </Col>
        
        <Col span={9}>
          <img src={require('../../assets/images/img-17.jpg').default} alt="" className="register-ad-bg-image"/>
          <div className="register-ad-text">
            <h3>Welcome to BottleCRM</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt consequatur itaque qui, aliquid id provident delectus perspiciatis. </p>
            <img src={require('../../assets/images/login.png').default} alt="" className="register-ad-image"/>
          </div>                    
          <footer className="register-footer">www.bottlecrm.com | About Us | Contact Us</footer>
        </Col>

      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state
};
const mapDispatchToProps = {
  updateErrors,
  alertMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
