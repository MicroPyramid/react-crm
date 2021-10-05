import React, { useState } from 'react'
import { Row, Col, Form, Input, Collapse, Select, Upload, Button } from 'antd'
import { DownOutlined, PlusOutlined, VerticalAlignTopOutlined, UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import {
    leadName,
    amount,
    website,
    contact,
    assignTo,
    organization,
    status,
    skypeID,
    source,
    attachment,
    tag,
    industry
} from '../../../redux/actions/Leads'

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
    ],
    assignTo: [
        {
            required: true,
            message: "please select assign To"
        }
    ],
    organization: [
        {
            required: true,
            message: "please select organization"
        }
    ],
    status: [
        {
            required: true,
            message: "please select status"
        }
    ],
    skype: [
        {
            required: true,
            message: "field cannot be empty"
        }
    ],
    source: [
        {
            required: true,
            message: "please select source"
        }
    ],
    tag: [
        {
            required: true,
            message: "field cannot be empty"
        }
    ],
    industry: [
        {
            required: true,
            message: "please select industry"
        }
    ]
}


const LeadInformation = (props) => {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState([])
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const selectAfter = (
        <Select defaultValue="INR   ">

        </Select>
    );

    function handleUpload(){
        const formData = new FormData()
        file.forEach(file=>{
            formData.append('files[]',file)
        })
      
    }
    return (

        <Collapse className="w-100 shadow-sm p-2 mb-5 bg-white" defaultActiveKey={['0']} expandIconPosition={"right"}>
            <Panel style={{ borderBottom: "none", fontWeight: "600", fontSize: 20 }} showArrow={true} header="Lead Details">
                <div className='mt-4 w-100 d-flex justify-content-center'>

                    <div className="w-100">
                        <Form {...layout} form={form} name="control-hooks">
                            <Row >
                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="lead"
                                        label="Lead Name"
                                        rules={rules.leadName}
                                    >
                                        <Input

                                            onChange={(e) => props.leadName(e.target.value)}
                                            style={{ borderRadius: "4px", marginLeft: "16px", borderLeftColor: "red" }}
                                            placeholder="lead name"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12} xs={18} xl={11}>

                                    <Form.Item
                                        name="amount"
                                        label="Amount"
                                        rules={rules.amount}
                                    >
                                        <Input
                                            addonAfter={selectAfter}
                                            onChange={(e) => props.amount(e.target.value)}
                                            style={{ borderRadius: "0px", marginLeft: "16px", borderLeftColor: "red" }}
                                            placeholder="amount"
                                        />
                                    </Form.Item>

                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="website"
                                        label="Website"
                                        rules={rules.website}
                                    >
                                        <Input
                                            onChange={(e) => props.website(e.target.value)}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Website" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} xs={18} xl={11}>
                                    <Form.Item
                                        name="contactName"
                                        label="Contact Name"
                                        rules={rules.contactName}
                                    >
                                        <Input
                                            onChange={(e) => props.contact(e.target.value)}
                                            addonAfter={<PlusOutlined />}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Contact Name" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="assignTo"
                                        label="AssignTo"
                                        rules={rules.assignTo}
                                    >
                                        <Input
                                            onChange={(e) => props.assignTo(e.target.value)}
                                            addonAfter={<DownOutlined />}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Assign to" />
                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="organization"
                                        label="Organization"
                                        rules={rules.organization}
                                    >
                                        <Input
                                            onChange={(e) => props.organization(e.target.value)}
                                            addonAfter={<PlusOutlined />}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="Organozation" />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="status"
                                        label="Status"
                                        rules={rules.status}
                                    >
                                        <Input
                                            onChange={(e) => props.status(e.target.value)}
                                            addonAfter={<DownOutlined />}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="status" />

                                    </Form.Item>
                                </Col>

                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="skypeID"
                                        label="SkypeID"
                                        rules={rules.skype}
                                    >
                                        <Input
                                            onChange={(e) => props.skypeID(e.target.value)}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="skypeID" />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="source"
                                        label="Source"
                                        rules={rules.source}
                                    >
                                        <Input
                                            onChange={(e) => props.source(e.target.value)}
                                            addonAfter={<DownOutlined />}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="source" />

                                    </Form.Item>
                                </Col>
                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="attachment"
                                        label="Attachment"
                                    >
                                        <Upload {...props} onChange={handleUpload}>
                                            <Button  icon={<UploadOutlined />}>Select File</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="tags"
                                        label="Tags"
                                        rules={rules.tag}
                                    >
                                        <Input
                                            onChange={(e) => props.tag(e.target.value)}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="tags" />

                                    </Form.Item>
                                </Col>
                                <Col span={10} xs={18} xl={11}>
                                    <Form.Item
                                        name="industry"
                                        label="Industry"
                                        rules={rules.industry}
                                    >
                                        <Input
                                            onChange={(e) => props.industry(e.target.value)}
                                            addonAfter={<DownOutlined />}
                                            style={{ borderRadius: "4px", marginLeft: "16px" }} placeholder="industry" />

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

const mapStateToProps = (state) => {
return {state}
}

export default connect(mapStateToProps,
    {
        leadName,
        amount,
        website,
        contact,
        assignTo,
        organization,
        status,
        skypeID,
        source,
        attachment,
        tag,
        industry

    })(LeadInformation)
