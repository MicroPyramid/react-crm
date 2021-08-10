import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Alert } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

import { 
		register, 				
		hideAuthMessage
	} from '../../../redux/actions/Auth'

const rules = {
  subdomain: [
		{ 
			required: true,
			message: 'Please input your subdomain'
		}
	],
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
  username: [
		{ 
			required: true,
			message: 'Please input your username'
		}
	],
  password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
}

export const RegisterForm = (props) => {
    
  const { auth, message, showMessage } = props

  const onRegister = (e) => {    
    props.register(e);    
  }
  
	useEffect(() => {
		window.localStorage.clear()		
		if(auth) {
			props.history.push("/domain/")			
		}
	}, [auth])

	useEffect(() => {
		if(showMessage){
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
				}}
        >
          <Alert type="error" showIcon message={message}></Alert>
			</motion.div>      
			<Form layout="vertical" name="register-form" onFinish={onRegister}>
				{/* <Form.Item 
					name="subdomain" 
					label="SubDomain" 
					rules={rules.subdomain}
					hasFeedback
				>
					<Input className="text-primary" addonAfter=".bottlecrm.com" placeholder="subdomain"/>					
				</Form.Item> */}
				<Form.Item 
					name="username" 
					label="Username" 
					rules={rules.username}
					hasFeedback
				>
					<Input prefix={<UserOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={rules.email}
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label="Password" 
					rules={rules.password}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>				
				<p>Already have an account ? <Link to="/domain">Login</Link></p>
				<Form.Item>
					<Button type="primary" htmlType="submit" block >
						Register
					</Button>
				</Form.Item>
			</Form>
		</>
  )
}

const mapStateToProps = (state) => {	
  const { auth, message, showMessage } = state.auth
  return { auth, message, showMessage }
}

const mapDispatchToProps = {
  register,    
	hideAuthMessage
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm)