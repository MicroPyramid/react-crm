import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { register } from '../../../redux/actions/Auth'
import { withRouter } from 'react-router-dom';

const RegistrationForm = (props) => {

  const { auth, message } = props

  const [name, setName] = useState([{
      required : true, 
      message: 'Please input name'
  }])
  const [company, setCompany] = useState([{
      required: true,
      message: 'Please input company'
  }])
  const [email, setEmail] = useState([
    { 
      required: true,
      message: 'Please input your email address'
    },
    { 
      type: 'email',
      message: 'Please enter a validate email!'
    }
  ])
  const [password, setPassword] = useState([
      {
        required: true,
        message: 'Please input password'
      }    
  ])
  
  const onRegister = (e) => {
    props.register(e)
  }    

  useEffect(() => {
    if(auth) {
      props.history.push('/login')
    }
  }, [auth])

  useEffect(() => {
    console.log('The va;ue of props in useeffect :', props)
    if(message && message.company_name[0].length > 0) {
      setCompany([{ required: true, message: message.company_name[0]}])
    }
  }, [message])

  console.log(props)
  return(
    <Form 
      layout="vertical"
      name="registration-form"
      onFinish={onRegister}
    >
      <Form.Item
        name="first_name"
        label="Name"
        rules={name}
        >
          <Input className="sign-in-email"
            prefix={<UserOutlined className="text-primary"/>}
          />
      </Form.Item>
      <Form.Item
        name="company_name"
        label="Organisation"
        rules={company}        
        >
          <Input className="sign-in-email"
            prefix={<UserOutlined className="text-primary" />}
          />          
      </Form.Item>      
      <Form.Item
        name="email"
        label="Email" 
        rules={email}       
        >
          <Input className="sign-in-email"
            prefix={<MailOutlined className="text-primary"/>}
          />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={password}
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
  )
}

const mapStateToProps = (state) => {  
  const { auth, message } = state.auth  
  return { auth, message }
}

const mapDispatchToProps = {
  register
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm))