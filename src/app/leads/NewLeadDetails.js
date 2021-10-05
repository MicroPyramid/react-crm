import React from 'react'
import { Row, Col, Breadcrumb, Button } from 'antd'
import {
    FormOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import LeadInfoDetails from './LeadInfoDetails'
import Attachment from './Attachment'
import Notes from './Notes'

const NewLeadDetails = (props) => {

    return (
        <div className="toolbar">
            <div style={{ backgroundColor: "#1A3353" }} className="p-2 d-flex justify-content-between">
                <div>
                    <Breadcrumb style={{ color: "white" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href='!#'>Leads</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href='!#' style={{ color: "white" }}>Lead Title</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="mr-3">
                    <Row gutter={5}>
                        <Col span={25}>
                            <Button icon={<LeftOutlined />} className="btn btn-default" htmlType="submit" block >
                                Back To Leads
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={() => props.history.push('/home/leads/editLead')}
                                style={{ backgroundColor: "#3E79F7", borderColor: "#3E79F7", color: "white" }}
                                icon={<FormOutlined />} htmlType="submit" block >
                                Edit
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='p-2'>
                <LeadInfoDetails />
                <Attachment />
                <Notes />

            </div>

        </div>
    )
}

export default NewLeadDetails

