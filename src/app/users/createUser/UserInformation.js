import React, { useState } from 'react'
import { Row, Col, Form, Input, Collapse, Upload, Button } from 'antd'
import {
    DownOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    UploadOutlined,
    AccountBookOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { motion } from "framer-motion"

const { Panel } = Collapse;



const rules = {
    userName: [
        {
            required: true,
            message: 'user name required'
        }
    ],
    firstName: [
        {
            required: true,
            message: 'first name required'
        }
    ],
    lastName: [
        {
            required: true,
            message: "last name required"
        }
    ],

    jobTitle: [
        {
            required: true,
            message: "job title required"
        }
    ],
    phone: [
        {
            required: true,
            message: "phone number required"
        }
    ],
    email: [
        {
            required: true,
            message: "email required"
        },
        {
            type: 'email',
            message: 'Please enter a validate email'
        }
    ],
    userType: [
        {
            required: true,
            message: "user type required"
        },

    ]
}
const UserInformation = (props) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (

        <Collapse className="w-100 shadow-sm p-2 mb-5 bg-white" defaultActiveKey={['0']} expandIconPosition={"right"}>
            <Panel style={{ borderBottom: "none", fontWeight: "600", fontSize: 20 }} showArrow={true} header="User Details"  >
                <div className='mt-4 w-100 d-flex justify-content-center'>

                    <div className="w-100">
                        <Form {...layout} form={form} name="control-hooks">
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="userName"
                                        label="User Name"
                                        rules={rules.userName}
                                    >
                                        <Input style={{ borderRadius: "4px", borderLeftColor: "red", marginLeft: "16px" }} placeholder="User Name" />
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                <Form.Item
                                        name="Email "
                                        label="Email Address"
                                        rules={rules.userName}
                                    >
                                        <Input style={{ borderRadius: "4px", borderLeftColor: "red", marginLeft: "16px" }} placeholder="Role" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                <Form.Item
                                        name="firstName"
                                        label="First Name"
                                        rules={rules.userName}
                                    >
                                        <Input style={{ borderRadius: "4px", borderLeftColor: "red", marginLeft: "16px" }} placeholder="Role" />
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="lastName"
                                        label="      "
                                        // rules={rules.email}
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Altername Email" />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="lastName"
                                        label="Last Name"

                                        rules={rules.lastName}
                                    >
                                        <Input
                                            
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="User Type" />
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="mobileNumber"
                                        label="Mobile Number"
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="phone number" />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                <Form.Item
                                        name="userType"
                                        label="User Type"
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="phone number" />

                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="mobileNumber"
                                        label="      "
                                        // rules={rules.email}
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Altername mobile number" />

                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                <Form.Item
                                        name="userRole"
                                        label="User Role"
                                        rules={rules.email}
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="skypeID" />

                                    </Form.Item>
                                </Col>

                                <Col className="ml-16" span={10} xs={18} xl={10}>
                                <Form.Item
                                        name="skypeID"
                                        label="Skype ID"
                                        rules={rules.email}
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="skypeID" />

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

export default UserInformation
