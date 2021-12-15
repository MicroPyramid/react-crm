import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Alert } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { registrationDetails, 
         updateErrors,
         alertMessage } from '../../../redux/actions/Auth'
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { rules } from '../../common/rules'

const RegistrationForm = (props) => {
  
  const onRegister = (e) => {    
    props.updateErrors('')
    props.alertMessage('')
    props.registrationDetails(e)
  }      

  const { errors, alert } = props

  useEffect(() => {
    let alertTimeoutId;
    if(alert != '') {
      alertTimeoutId = setTimeout(() => {
        props.history.push('/login')
      }, 1500)
    }
    return () => {
      clearTimeout(alertTimeoutId)
    }
  }, [alert])
  
  return(
    <>
    <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity:  1, 
          marginBottom: 20
        }}>
        { (errors != '') 
            ? <Alert type="error" closable message={errors}></Alert>
            : ''
        }
        { (alert != '')
            ? <Alert type="success" closable message={alert}></Alert>
            : ''
        }
      </motion.div>
    <Form 
      layout="vertical"
      name="registration-form"
      onFinish={onRegister}
    >
      <Form.Item
        name="first_name"
        label="Name"
        rules={rules.name}
        >
          <Input className="sign-in-email"
            prefix={<UserOutlined className="text-primary"/>}
          />
      </Form.Item>
      <Form.Item
        name="org_name"
        label="Organisation"
        rules={rules.company}        
        >
          <Input className="sign-in-email"
            prefix={<UserOutlined className="text-primary" />}
          />          
      </Form.Item>      
      <Form.Item
        name="email"
        label="Email" 
        rules={rules.email}       
        >
          <Input className="sign-in-email"
            prefix={<MailOutlined className="text-primary"/>}
          />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={rules.password}
        >
          <Input.Password className="sign-in-email"
            prefix={<LockOutlined />}
          />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit"
                className="sign-in-button"                
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

const mapStateToProps = (state) => {  
  const { errors, alert } = state.auth
  return { errors, alert }
}

const mapDispatchToProps = {
  registrationDetails,
  updateErrors,
  alertMessage
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm))