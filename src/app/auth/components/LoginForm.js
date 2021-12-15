import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import {	
	loginCredentials,
	updateErrors,
	alertMessage
} from '../../../redux/actions/Auth';
import { Link } from "react-router-dom"
import { motion } from 'framer-motion';
import { rules } from '../../common/rules'


export const LoginForm = (props) => {			
	
	const { errors } = props	

	const onLogin = e => {				
		props.updateErrors('')
		props.loginCredentials(e)		
	};	

	useEffect(() => {					
		if(localStorage.getItem('Token')) {
			props.history.push('/companies-list')
		}
	})

	const clearAlerts = () => {
    props.updateErrors('')
    props.alertMessage('')
  }

	return (
		<>
			<motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity:  1, 
          marginBottom: 20
        }}>
        {(errors != '') ? <Alert type="error" closable message={props.errors}></Alert>: ''}				
      </motion.div>
			<Form
				layout="vertical"
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item
					name="email"
					label="Email"
					rules={rules.email}>
					<Input className="sign-in-email" data-testid='sign-in-email'
						prefix={<MailOutlined className="text-primary" />}
					/>
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={rules.password}>
					<Input.Password className="sign-in-password" data-testid='sign-in-password'
						prefix={<LockOutlined className="text-primary" />}
					/>
				</Form.Item>				
				<p className="sign-in-forgotpassword">
					<Link to="/forgot-password" onClick={() =>  clearAlerts()}>Forgot Password?</Link>					
				</p>				
				<Form.Item>
					<Button type="primary" htmlType="submit" block  
						className="sign-in-button"
						data-testid='sign-in-btn'>
						Sign In
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}


const mapStateToProps = (state) => {
	const { errors, isTokenAvailable } = state.auth		
	return { errors }
}

const mapDispatchToProps = {
	loginCredentials,
	updateErrors,
	alertMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
