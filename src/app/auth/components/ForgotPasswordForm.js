import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Alert, Button, Form, Input } from "antd";
import { MailOutlined } from '@ant-design/icons';
import { forgotPassword } from '../../../redux/actions/Auth'
import { motion } from 'framer-motion';
import { rules } from '../../common/rules'

export const ForgotPasswordForm = (props) => {		
	const onSubmit = e => {
		props.forgotPassword(e)
	};	

	const { errors, alert } = props

	useEffect(() =>{
		if(alert === 'success') {
			props.history.push('/reset-password-done')
		}
	}, [alert])

	return (
		<>			
		<motion.div
			initial={{ opacity:0, marginBottom:0 }}
			animate={{
				opacity: 1,
				marginBottom: 20
			}}
		>
			{(errors != '') ? <Alert type="error" closable message={errors}></Alert>: ''}
		</motion.div>
			<Form 
				layout="vertical" 
				name="forgotpassword-form"
				onFinish={onSubmit}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={rules.email}
					className="mb-0">
					<Input className="sign-in-email req" prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<small>Enter your email address we will send you password link</small>
				<Form.Item>
					<Button className="sign-in-button mt-4" type="primary" htmlType="submit" block >
						Submit
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
	forgotPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm)
