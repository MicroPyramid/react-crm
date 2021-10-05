import React, { useState, useRef } from 'react'
import { Card, Row, Col, Breadcrumb, Form, Button, Collapse } from 'antd'
import { CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { motion } from "framer-motion"
import JoditEditor from "jodit-react";
import '../createUser/editor.css'
//CK editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { Panel } = Collapse;
const Description = (props) => {
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [form] = Form.useForm();

  const editorHandle = (data) => {
    setContent(data)
  }

  return (

    <Collapse className="w-100 shadow-sm p-2 mb-5 bg-white" defaultActiveKey={['0']} expandIconPosition={"right"}>
      <Panel style={{ borderBottom: "none", fontWeight: "600", fontSize: 20 }} showArrow={true} header="Description"  >
        <div className='mt-4 w-100 d-flex justify-content-center'>
          <div className='w-100 '>
            <motion.div
              initial={{ opacity: 1, marginBottom: 0 }}
            >
              <Row className='justify-content-center'>
                <Col span={20}>
                  <Form.Item
                    name="description"
                    label="Description"
                  >
                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => { }}
                    />
                   
                    <div className="mt-5">
                      <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                          const data = editor.getData()
                          // editorHandle(Parse(data))
                        }}
                      />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
           
            </motion.div>
            <div className="d-flex flex-row justify-content-center flex-wrap">
                    <div className=" p-1">
                        <Button

                            style={{ backgroundColor: "#304B6D", color: "white", borderColor: "#1A3353" }}
                            icon={<CloseCircleOutlined />} htmlType="submit" block >
                            Cancel
                        </Button>
                    </div>
                    <div className=" p-1">
                        <Button
                            style={{ backgroundColor: "#3E79F7", borderColor: "#3E79F7", color: "white" }}
                            icon={<CheckOutlined />} htmlType="submit" block >
                            Save
                        </Button>
                    </div>

                </div>
          </div>
        
        </div>

      </Panel>
    </Collapse>
  )
}

export default Description
