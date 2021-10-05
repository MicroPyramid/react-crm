import React from 'react'
import { Row, Col, Form, Input, Collapse, Switch } from 'antd'
import {
    DownOutlined,
} from '@ant-design/icons';

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
const OrganizationDetails = (props) => {
    // const [open, setOpen] = useState(false)
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (

        <Collapse className="w-100 shadow-sm p-2 mb-5 bg-white" defaultActiveKey={['0']} expandIconPosition={"right"}>
            <Panel style={{ borderBottom: "none", fontWeight: "600", fontSize: 20 }} showArrow={true} header="Organization Details"  >
                <div className='mt-4 w-100 d-flex justify-content-center'>

                    <div className="w-100">
                        <Form {...layout} form={form} name="control-hooks">
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="organiationName"
                                        label="Organization Name"
                                        rules={rules.userName}
                                    >
                                        <Input style={{ borderRadius: "4px", borderLeftColor: "red", marginLeft: "16px" }} placeholder="User Name" />
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item

                                        name="status"
                                        label="Status"
                                        rules={rules.userName}
                                    >
                                        <Input
                                            addonAfter={<DownOutlined />}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Role" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="primaryEmail"
                                        label="Primary Email"
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="phone number" />

                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="SecondaryEmail"
                                        label="Secondary Email"
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="phone number" />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        rules={rules.email}
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="skypeID" />

                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="secondaryMobile"
                                        label="Secondary Number"
                                        rules={rules.email}
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="skypeID" />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="language"
                                        label="Language"
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="phone number" />

                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="twitterUsername"
                                        label="Twitter Username"
                                        rules={rules.email}
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="skypeID" />

                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={160} className='ml-5'>
                                <Col  >
                                    <Row gutter={20}>
                                        <Col>
                                            <Switch defaultChecked />
                                        </Col>
                                        <Col>
                                            Do Not Call
                                        </Col>
                                    </Row>


                                </Col>

                                
                            </Row>

                        </Form>
                    </div>


                </div>

            </Panel>
        </Collapse>
    )
}

export default OrganizationDetails
