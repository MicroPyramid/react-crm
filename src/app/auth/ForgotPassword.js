import React from 'react';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd';
import { updateErrors } from '../../redux/actions/Auth';
import { connect } from "react-redux";

const ForgotPassword = (props) => {  
  return (
    <div className="bg-white height-100 registration">
      <Row>                  
        <Col span={15}>
        <img src={require('../../assets/images/logo.png').default} alt="" className="register-logo" />
          <Row justify="center" align="middle">                  
                <Col className="forgotpassword-margin">
                  <h1>Forgot Password</h1>
                  <p>Remember password? &nbsp;
                    <Link to="/login" onClick={() => props.updateErrors('')}>Sign In</Link>
                  </p>
                  <ForgotPasswordForm {...props} />
                </Col>
          </Row>
        </Col>
        
        <Col span={9}>
          <img src={require('../../assets/images/img-17.jpg').default} alt="" className="register-ad-bg-image"/>
          <div className="register-ad-text">
            <h3>Welcome to BottleCRM</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt consequatur itaque qui, aliquid id provident delectus perspiciatis. </p>
            <img src={require('../../assets/images/forgotPassword.png').default} alt="" className="register-ad-image"/>
          </div>
          <footer className="register-footer">www.bottlecrm.com | About Us | Contact Us</footer>
        </Col>

      </Row>
    </div>
  );
};

const mapDispatchToProps = {
  updateErrors
}

export default connect(null, mapDispatchToProps)(ForgotPassword);
