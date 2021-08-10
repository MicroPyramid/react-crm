import React, { useState } from 'react'
import { Card, Row, Col, Breadcrumb, Button } from 'antd'
import { DownOutlined, LeftOutlined, CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';
import OrganizationDetails from './OrganizationDetails'
import AddressInformation from './AddressInformation'
import Description from './Description'

const users = (props) => {

    return (
        <div className="toolbar">
            <div style={{ backgroundColor: "#1A3353" }} className="p-2 d-flex justify-content-between">
                <div>
                    <Breadcrumb style={{ color: "white" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">Organizations</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a style={{ color: "white" }}> Add Organiation</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="mr-3">
                    <Row gutter={5}>
                        <Col span={25}>
                            <Button icon={<LeftOutlined />} className="btn btn-default" htmlType="submit" block >
                                Back to Organization
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
                <Row className="align-items-stretch  h-100">
                    <Col>
                        <div className="container d-flex flex-column justify-content-center h-100">
                            <Row>
                                <OrganizationDetails />
                                <AddressInformation/>
                                <Description/>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    <div className=" p-1">
                        <Button type="primary" htmlType="submit" block >
                            Save
					</Button>
                    </div>
                    <div className=" p-1">
                        <Button htmlType="submit" block >
                            Cancel
					</Button>
                    </div>

                </div>

            </Card>
        </div>
    )
}

export default users