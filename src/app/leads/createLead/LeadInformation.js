import React, { useState } from 'react'
import { Row, Col, Form, Input, Collapse } from 'antd'

const { Panel } = Collapse;

const rules = {
    leadName: [
        {
            required: true,
            message: 'Please input your lead name'
        }
    ],
    amount: [
        {
            required: true,
            message: "please input your amount"
        }
    ],
    website: [
        {
            required: true,
            message: "please input your website details"
        }
    ],
    contactName: [
        {
            required: true,
            message: "please input contact name"
        }
    ]
}


const LeadInformation = (props) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (

        <Collapse className="w-100 shadow-sm p-2 mb-5 bg-white" defaultActiveKey={['0']} expandIconPosition={"right"}>
            <Panel style={{ borderBottom: "none", fontWeight: "600", fontSize: 20 }} showArrow={true} header="Lead Details">
                <div className='mt-4 w-100 d-flex justify-content-center'>

                    <div className="w-100">
                        <Form {...layout} form={form} name="control-hooks">
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="lead"
                                        label="Lead Name"
                                        rules={rules.leadName}
                                    >
                                        <Input style={{ borderRadius: "4px", marginLeft: "16px" }}
                                            placeholder="Lead Name"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12} xs={18} xl={10}>
                                    <Form.Item
                                        name="amount"
                                        label="Amount"
                                        rules={rules.amount}
                                    >
                                        <Input
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Amount" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="website"
                                        label="Website"
                                        rules={rules.website}
                                    >
                                        <Input style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Website" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} xs={18} xl={10}>
                                    <Form.Item
                                        name="contactName"
                                        label="Contact Name"
                                        rules={rules.contactName}
                                    >
                                        <Input style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Contact Name" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="assignTo"
                                        label="AssignTo"
                                    >
                                        <div style={{ marginLeft: "16px" }}>---</div>
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="organization"
                                        label="Organization"
                                    >
                                        <div style={{ marginLeft: "16px" }}>---</div>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="status"
                                        label="Status"
                                    >
                                        <div style={{ marginLeft: "16px" }}>---</div>
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="skypeID"
                                        label="SkypeID"
                                    >
                                        <div style={{ marginLeft: "16px" }}>---</div>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="source"
                                        label="Source"
                                    >
                                        <div style={{ marginLeft: "16px" }}>---</div>
                                    </Form.Item>
                                </Col>
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="attachment"
                                        label="Attachment"
                                    >
                                        <div style={{ marginLeft: "16px" }}>---</div>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="tags"
                                        label="Tags"
                                    >
                                        <div style={{ marginLeft: "16px" }}>---</div>
                                    </Form.Item>
                                </Col>
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="industry"
                                        label="Industry"
                                    >
                                        <div style={{ marginLeft: "16px" }}>---</div>
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

export default LeadInformation
