import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Alert } from 'antd';
import {
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  authenticated,
  subdomain,
  authenticate,
} from '../../../redux/actions/Auth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const SubDomainForm = (props) => {
  const { loading, showMessage, message, auth } = props;

  useEffect(() => {    
    props.authenticate(false)    
      if(window.localStorage.getItem('SubDomain')) {
        props.history.push("/login/")
      }    
  }, [auth])

  const onLogin = (e) => {
    props.subdomain(e);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="subdomain"
          label="Sub Domain"
          rules={[
            {
              required: true,
              message: 'Please enter a subdomain',
            },
          ]}
        >
          <Input
            className="text-primary"
            addonAfter=".bottlecrm.com"
            placeholder="subdomain"
          />
        </Form.Item>

        <Form.Item>
          <p>
            Don't have an account yet? <Link to="/register">Register</Link>
          </p>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    subdomain,
    auth,
    loading,
    message,
    showMessage,
    token,
    redirect,
  } = state.auth;
  return { subdomain, auth, loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  authenticated,
  subdomain,
  authenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubDomainForm);
