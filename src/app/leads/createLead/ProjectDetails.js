import React from 'react'
import { motion } from "framer-motion"
import { Button, Form, Input, Upload, Select } from "antd";
import { MailOutlined,     
     GlobalOutlined,     
     UploadOutlined
    } from '@ant-design/icons';


const { TextArea } = Input;


const rules = {
    website:[
        {
            required: true,
            message: 'Please input your website name',
        }
    ],
    description:[
        {
            required: true,
            message: 'please give the description about your project',
        } 
    ],
    team:[
        {
            required: true,
            message: 'Please input your team',
        } 
    ],
    user:[
        {
            required: true,
            message: 'Please input your users',
        } 
    ],
    assignUser:[
        {
            required: true,
            message: 'Please input your assigned user',
        } 
    ],
    status:[
        {
            required: true,
            message: 'Please input your status',
        } 
    ],
    source:[
        {
            required: true,
            message: 'Please input your source',
        } 
    ],
    tag:[
        {
            required: true,
            message: 'Please add a tag',
        } 
    ]
}

const { Option } = Select;

const ProjectDetails = props => {

    // const {
        // otherSignIn,
        // showForgetPassword,
        // hideAuthMessage,
        // onForgetPasswordClick,
        // showLoading,
        // extra,
        // loading,
        // showMessage,
        // message,
        // authenticated,
        // showAuthMessage,
        // token,
        // redirect,
        // allowRedirect
    // } = props
    return (
        <>
            <motion.div
            >
                <Form
                    layout="vertical"
                    name="login-form"
                >
                    <Form.Item
                        name="website"
                        label="Website"
                        rules={rules.website}
                        >
                        <Input prefix={<GlobalOutlined className="text-primary" />} placeholder="website" />
                    </Form.Item>                                                            
                    <Form.Item
                        name="assignedTo"
                        label="Assigned To"
                       rules={rules.assignUser}
                       >
                        <Input prefix={<MailOutlined className="text-primary" />} placeholder="assigned to"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                       rules={rules.status}
                       >                        
                        <Select defaultValue="Assigned">
                            <Option value="Assigned">Assigned</Option>
                            <Option value="In process">In process</Option>
                            <Option value="Converted">Converted</Option>
                            <Option value="Recycled">Recycled</Option>
                            <Option value="Closed">Closed</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="surce"
                        label="Source"
                       rules={rules.source}
                       >
                        <Select defaultValue="Call">
                            <Option value="Call">Call</Option>
                            <Option value="Email">Email</Option>
                            <Option value="Existing Customer">Existing Customer</Option>
                            <Option value="Partner">Partner</Option>
                            <Option value="Public Relations">Public Relations</Option>
                            <Option value="Campaign">Campaign</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={rules.description}
                        >
                        <TextArea rows={5} placeholder="description"/>
                    </Form.Item>
                    <Form.Item
                        name="tags"
                        label="Tags"
                        rules={rules.tag}
                        >
                        <TextArea rows={2} placeholder="add a tag"/>
                    </Form.Item>
                    <Form.Item
                        name="attachment"
                        label="Attachment"
                    >

                        <Upload >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>
                </Form>


            </motion.div>
        </>
    )
}

export default ProjectDetails