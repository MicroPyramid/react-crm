import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import {	
	login,
	hideAuthMessage,
	authenticate
} from '../../../redux/actions/Auth';
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const rules = {
	email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
}

export const LoginForm = (props) => {		

	const {				
		showMessage,
		message,
		auth				
	} = props

	const onLogin = e => {								
			props.login(e)
	};		

	useEffect(() => {		
		if(window.localStorage.getItem('Token')) {
			props.history.push('/home')
		}else{
			props.history.push('/login')
		}
	}, [auth])

	useEffect(() => {			
		if(showMessage) {			
			setTimeout(() => {				
				props.hideAuthMessage();
			}, 1000);
		}
	}, [showMessage])

	return (
	
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0
				}}>
				<Alert type="error" showIcon message={message}></Alert>
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
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={rules.password}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<p>Don't have an account yet? <Link to="/register">Register</Link></p>
				<p>Forgot password? <Link to="/forgot-password">Reset</Link></p>
				<Form.Item>
					<Button type="primary" htmlType="submit" block >
						Login
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}


const mapStateToProps = (state) => {
	const { auth, message, showMessage } = state.auth;
	return { auth, message, showMessage }
}

const mapDispatchToProps = {
	login,
	hideAuthMessage,
	authenticate
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
