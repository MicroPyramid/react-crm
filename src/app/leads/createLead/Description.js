import React, { useState, useRef } from 'react'
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
import JoditEditor from "jodit-react";



const { Panel } = Collapse;
const Description = (props) => {
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const [form] = Form.useForm();

    const config = {
        readonly: false,
        styleMedia:{marginLeft:"16px"}
        // all options from https://xdsoft.net/jodit/doc/
    }

    return (

        <Collapse className="w-100 shadow-sm p-2 mb-5 bg-white" defaultActiveKey={['0']} expandIconPosition={"right"}>
            <Panel style={{ borderBottom: "none", fontWeight: "600", fontSize: 20 }} showArrow={true} header="Description"  >
                <div className='mt-4 w-100 d-flex justify-content-center'>
                    <div className='w-10'>
                       

                        <div>
                            <motion.div
                                initial={{ opacity: 1, marginBottom: 0 }}
                            // animate={{
                            //     opacity: showMessage ? 1 : 1,
                            //     marginBottom: showMessage ? 20 : 0
                            // }}
                            >
                                <Row gutter={100}>
                                    
                                    <Col span={50}>
                                        <Form.Item
                                            name="description"
                                           label="Description"
                                        >
                                            <JoditEditor

                                                ref={editor}
                                                value={content}
                                                config={config}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                onChange={newContent => { }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </motion.div>
                        </div>
                    </div>
                </div>

            </Panel>
        </Collapse>
    )
}

export default Description
