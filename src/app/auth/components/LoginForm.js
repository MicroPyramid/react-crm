import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
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
			props.history.push('/companies-list')
		}else{
			props.history.push('/login')
		}
	}, [auth])
		
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
					<Link to="forgot-password">Forgot Password?</Link>
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
	const { auth, message, showMessage } = state.auth;
	return { auth, message, showMessage }
}

const mapDispatchToProps = {
	login,
	hideAuthMessage,
	authenticate
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
