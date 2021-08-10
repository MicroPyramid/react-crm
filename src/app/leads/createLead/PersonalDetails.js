import React from 'react'
import { motion } from "framer-motion"
import { Button, Form, Input, Divider, Alert,Row,Col,Upload } from "antd";
import {
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    UserOutlined,
    AccountBookOutlined
} from '@ant-design/icons';


import { connect } from 'react-redux';

const rules = {

    firstName: [
        {
            required: true,
            message: 'Please input your First Name'
        }
    ],
    LastName: [
        {
            required: true,
            message: 'Please input your last Name'
        }
    ],
    leadName: [
        {
            required: true,
            message: 'Please input your Account Name'
        }
    ],
    Title: [
        {
            required: true,
            message: 'Please input your Title'
        }
    ],
    Phone: [
        {
            required: true,
            message: 'Please input your phone number'
        }
    ],
    Email: [
        {
            required: true,
            message: 'Please input your email address'
        },
        {
            type: 'email',
            message: 'Please enter a validate email!'
        }
    ]
}
const PersonalDetails = props => {

    const {				
		showMessage,
		message,
		auth				
	} = props

    return (
        <>
            <motion.div
                initial={{ opacity: 1, marginBottom: 0 }}
                animate={{
                    opacity: showMessage? 1: 1,
                    marginBottom: showMessage ? 20 : 0
                }}
            >
                <Form
                    layout="vertical"
                    name="create-lead"
                >
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={rules.firstName}
                            >
                                <Input prefix={<UserOutlined className="text-primary"/>} placeholder="first name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={rules.LastName}
                            >
                                <Input prefix={<UserOutlined className="text-primary"/>} placeholder="last name" />
                            </Form.Item>
                        </Col>
                       
                    </Row>
                    <Form.Item
                        name="account"
                        label="Lead Name"
                        rules={rules.leadName}
                    >
                        <Input prefix={<AccountBookOutlined className="text-primary" />} placeholder="lead name" />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="Job Title"
                        rules={rules.Title}
                    >
                        <Input prefix={<AccountBookOutlined className="text-primary" />} placeholder="title" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={rules.Phone}
                    >
                        <Input type="number" max={10} prefix={<PhoneOutlined className="text-primary" />} placeholder="+91234567890" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={rules.Email}
                    >
                        <Input prefix={<MailOutlined className="text-primary" />} placeholder="xyz@bottlecrm.com" />
                    </Form.Item>
                    
                </Form>
            </motion.div>
        </>
    )
}

const mapStateToProps = (state) => {
	const { auth, message, showMessage } = state.auth;
	return { auth, message, showMessage }
}

export default connect(mapStateToProps)(PersonalDetails)