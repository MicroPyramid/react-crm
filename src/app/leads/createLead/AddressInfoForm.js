import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Button, Form, Input, Divider, Alert, Col, Row, Upload, Select } from "antd";

import {    
    UserOutlined,    
} from '@ant-design/icons';



const { Option } = Select;

const rules = {

    addressLine: [
        {
            required: true,
            message: 'Please input your address'
        }
    ],
    street: [
        {
            required: true,
            message: 'Please input your street'
        }
    ],
    city: [
        {
            required: true,
            message: 'Please input your city Name'
        }
    ],
    state: [
        {
            required: true,
            message: 'Please input your state'
        }
    ],
    pincode: [
        {
            required: true,
            message: 'Please input your pin code'
        }
    ]
}

const PersonalDetails = props => {

    const [country, setCountry] = useState('')
    const {
        otherSignIn,
        showForgetPassword,
        hideAuthMessage,
        onForgetPasswordClick,
        showLoading,
        extra,
        loading,
        showMessage,
        message,
        authenticated,
        showAuthMessage,
        token,
        redirect,
        allowRedirect
    } = props

    function handleChange(value) {
        
    }

    return (
        <>
            <motion.div
            >
                <Form
                    layout="vertical"
                    name="login-form"
                >
                    <Form.Item
                        name="address"
                        label="Address Line"
                        rules={rules.addressLine}
                    >
                        <Input prefix={<UserOutlined className="text-primary" />} placeholder="address line" />
                    </Form.Item>
                    <Form.Item
                        name="street"
                        label="Street"
                        rules={rules.street}
                    >
                        <Input prefix={<UserOutlined className="text-primary" />} placeholder="street" />
                    </Form.Item>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                name="city"
                                label="City"
                                rules={rules.city}
                            >
                                <Input placeholder="city" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="state"
                                label="State"
                                rules={rules.state}
                            >
                                <Input placeholder="state" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="pincode"
                                label="Pincode"
                                rules={rules.pincode}
                            >
                                <Input type="number" placeholder="pincode" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="country"
                        label="Country"
                    >
                       <Select>
                            <Option value="Afghanistan">Afghanistan</Option>
                            <Option value="Albania">Albania</Option>
                            <Option value="Algeria">Algeria</Option>
                            <Option value="Andorra">Andorra</Option>
                            <Option value="Angola">Angola</Option>
                            <Option value="Anguilla">Anguilla</Option>
                            <Option value="Antigua & Barduba">Antigua & Barbuda</Option>
                        </Select>
                    </Form.Item>




                </Form>
            </motion.div>
        </>
    )
}

export default PersonalDetails