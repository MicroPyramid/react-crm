import React, { useState } from 'react'
import { Card, Row, Col, Breadcrumb, Button, Switch } from 'antd'
import { DownOutlined, LeftOutlined, CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';
import UserInformation from './UserInformation'
import AddressInformation from './AddressInformation'
import Description from './Description'
const users = (props) => {

    return (
        <div className="toolbar">
            <div style={{ backgroundColor: "#1A3353", alignItems: "center" }} className="p-2 d-flex justify-content-between">
                <div >
                    <Breadcrumb style={{ color: "white" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">Users</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a style={{ color: "white" }}> Add user</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="mr-3">
                    <Row gutter={5}>
                        <Col span={25}>
                            <Button icon={<LeftOutlined />} className="btn btn-default" htmlType="submit" block >
                                Back to Users
                            </Button>
                        </Col>
                        <Col>
                            <Button

                                style={{ backgroundColor: "#304B6D", color: "white", borderColor: "#1A3353" }}
                                icon={<CloseCircleOutlined />} htmlType="submit" block >
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                style={{ backgroundColor: "#3E79F7", borderColor: "#3E79F7", color: "white" }}
                                icon={<CheckOutlined />} htmlType="submit" block >
                                Save
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>

            <Card>
                <div className='d-flex justify-content-end mb-4 mr-4'>
                    <div className='mr-2'>
                        <Switch defaultChecked />
                    </div>
                    <span>Enable User</span>
                </div>
                <Row className="align-items-stretch  h-100">

                    <Col>
                        <div className="container d-flex flex-column justify-content-center h-100">
                            <Row>
                                <UserInformation />
                                <AddressInformation />
                                <Description />
                            </Row>
                        </div>
                    </Col>
                </Row>
               

            </Card>
        </div>
    )
}

export default users