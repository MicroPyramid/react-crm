import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import { MailOutlined } from '@ant-design/icons';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import { forgotPassword, hideAuthMessage } from '../../../redux/actions/Auth'


const rules = [
	{ 
		required: true,
		message: 'Please input your email',
	},
	{ 
		type: 'email',
		message: 'Please enter a validate email!'
	}
]

export const ForgotPasswordForm = (props) => {	

	const { 						
		showMessage,
		message,
		auth
	} = props

	const onSubmit = e => {
		props.forgotPassword(e)
	};

	useEffect(() => {		
		if(auth) {			
			props.history.push('/forgot-password/done')
		}		
		if(showMessage) {			
			setTimeout(() => {				
				props.hideAuthMessage();
			}, 1000);
		} 		
	}, [auth, showMessage]);
	

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
				onFinish={onSubmit}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={rules.email}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>                
				<p>Don't have an account yet? <Link to="/register">Register</Link></p>
				<Form.Item>
					<Button type="primary" htmlType="submit" block >
						Submit
					</Button>
				</Form.Item>
				
			</Form>
		</>
	)
}

const mapStateToProps = (state) => {
	const {auth, message, showMessage } = state.auth;
  	return { auth, message, showMessage }
}

const mapDispatchToProps = {
	forgotPassword,
	hideAuthMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm)
