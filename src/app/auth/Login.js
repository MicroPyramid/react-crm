import React from 'react';
import { Link } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { InfoPanel } from './infoPanel';
import { ArrowLeftOutlined } from '@ant-design/icons'

const LoginPage = (props) => {  
  // const { subdomain } = props;
  return (
    <div className="bg-white height-100">    
      <Row justify="center" className="align-items-stretch h-100">
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className="container d-flex flex-column justify-content-center h-100">
            <Row justify="center">
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1 className="sign-in-text mb-0">Sign In</h1>
                <p className='sign-in-signup-btn'>Don't Have an Account yet ? <Link to='/register' data-testid="signup-btn">Sign Up</Link></p>
                <div className="sign-in-subdomain-info">
                  {/* <ArrowLeftOutlined /> Your Subdomain */}
                  {/* <p className='sign-in-subdomain-name'><b>micropyramid.bottlecrm.com</b></p> */}
                </div>
                <div className="mt-4">
                  <LoginForm {...props} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col xs={0} sm={0} md={0} lg={8}>
          <InfoPanel />
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { subdomain } = state.auth;
  return { subdomain };
};
export default connect(mapStateToProps)(LoginPage);
