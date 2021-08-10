import React from 'react'
import { Form, Input, Row, Col, Select } from "antd"
import { motion } from "framer-motion"
import {    
  UserOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';

const { Option } = Select;

const Contact = () => {

  return (
    <>
      <motion.div>
        <h2>Contact Details</h2>
        <Form
          layout="vartical"
          name="addressform">
            <Row gutter={10}>
              <Col md={12}>
                <Form.Item
                name="firstname"
                label="First Name"
                className="label-block mb-10"
                >
                  <Input prefix={<UserOutlined className="text-primary" />} placeholder="first name"></Input>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item
                name="lastname"
                label="Last Name"
                className="label-block mb-10"
                >
                  <Input prefix={<UserOutlined className="text-primary" />} placeholder="last name"></Input>
                </Form.Item>            
              </Col>
            </Row>                        
              <Form.Item
                name="email"
                label="Email"
                className="label-block mb-10"
                >                  
                  <Input prefix={<MailOutlined className="text-primary" />} placeholder="email"></Input>
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                className="label-block"
                >
                <Input prefix={<PhoneOutlined className="text-primary" />} placeholder="email"></Input>
              </Form.Item>                                     
        </Form>
      </motion.div>
    </>
  )
}

export default Contact
