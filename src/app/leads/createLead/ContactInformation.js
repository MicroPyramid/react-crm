import React, { useState } from 'react'
import { Card, Row, Col, Breadcrumb, Form, Input, Collapse } from 'antd'
import {
    DownOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    UserOutlined,
    AccountBookOutlined
} from '@ant-design/icons';
import { motion } from "framer-motion"

const { Panel } = Collapse;



const rules = {
    firstName:[
        {
            required:true,
            message: 'first name required'
        }
    ],
    lastName:[
        {
            required:true,
            message:"last name required"
        }
    ],
   
    jobTitle:[
        {
            required:true,
            message:"job title required"
        }
    ],
    phone:[
        {
            required:true,
            message:"phone number required"
        }
    ],
    email:[
        {
            required:true,
            message:"email required"
        },
        {
            type: 'email',
            message: 'Please enter a validate email'
        }
    ]
}   
const ContactInformation = (props) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (

        <Collapse className="w-100 shadow-sm p-2 mb-5 bg-white" defaultActiveKey={['0']} expandIconPosition={"right"}>
            <Panel style={{ borderBottom: "none", fontWeight: "600", fontSize: 20 }} showArrow={true} header="Contact Details"  >
                <div className='mt-4 w-100 d-flex justify-content-center'>

                    <div className="w-100">
                        <Form {...layout} form={form} name="control-hooks">
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="firstName"
                                        label="First Name"
                                        rules={rules.firstName}
                                    >
                                        <Input style={{ borderRadius: "4px" ,borderLeftColor:"red",marginLeft:"16px"}} placeholder="First Name" />
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="lastName"
                                        label="Last Name"
                                        rules={rules.lastName}
                                    >
                                        <Input style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="Last Name" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="jobTitle"
                                        label="Job Title"
                                        rules={rules.jobTitle}
                                    >
                                        <Input style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="Job Title" />
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="phone"
                                        label="Phone Number"
                                        rules={rules.phone}
                                    >
                                        <Input 
                                        type={"number"}
                                        style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="Phone Number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={rules.email}
                                    >
                                        <Input 
                                        type={"email"}
                                        style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="Email" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>


                </div>

            </Panel>
        </Collapse>
    )
}

export default ContactInformation
