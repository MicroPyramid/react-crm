import React from 'react'
import { Row, Col, Card, Select, Form, Button, Avatar, Image, Input } from 'antd'
import {
    PlusOutlined,
    DownOutlined,
    FormOutlined,
    DeleteOutlined,
    PaperClipOutlined,
    MoreOutlined
} from '@ant-design/icons';
// const { Option } = Select;
const { TextArea } = Input;

const image = [
    {
        url: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2NyZWVuc2hvdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        imgName: "mail.jpg",
        size: "30kb"
    },

]

const Notes = () => {

    return (
        <div>
            <Card bodyStyle={{ padding: "0" }}>
                <div className="p-3 d-flex justify-content-between  border-bottom">
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Notes
                    </div>
                    <div style={{ marginLeft: "50px" }}>
                        <Row className='d-flex align-items-center'>
                            <Col >
                                <span>
                                    <PlusOutlined />
                                </span>
                                Add Notes

                            </Col>
                            <Col >
                                <Form.Item>
                                    <Input
                                        addonAfter={<DownOutlined />}
                                        defaultValue={"Recent List"}
                                        style={{ borderRadius: "4px", marginLeft: "16px", height: "10px", width: "150px" }} placeholder="Email Address" />

                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                </div>
                <div className="p-3">
                    <Row gutter={28}>
                        <Col span={1}>
                            <Avatar
                                src={<Image src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                            />
                        </Col>
                        <Col span={12}>
                            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took
                        </Col>
                        <Col span={5}>
                            <Row gutter={10}>
                                <Col>
                                    <FormOutlined style={{ fontSize: "15px" }} />
                                </Col>
                                <Col>
                                    <DeleteOutlined style={{ fontSize: "15px" }} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className='p-3'>
                    <Row gutter={20}>
                        {image.map((item) => (
                            <div>
                                <Col>
                                    <img src={item.url} height={100} width={160} />
                                </Col>
                                <Row justify={"space-between"}>
                                    <Col style={{ marginLeft: "10px" }}>
                                        <div>{item.imgName}</div>
                                        <div>{item.size}</div>
                                    </Col>
                                    <Col style={{ marginTop: "5px" }}>
                                        <MoreOutlined style={{ fontSize: "18px" }} />
                                    </Col>
                                </Row>
                            </div>
                        ))}

                    </Row>
                </div>

                <div className='p-3'>
                    <Row>
                        <Col span={12}>
                            <Row justify={"space-between"}>
                                <Col>Lead-<a href='!#'>Ashwin kumar-</a><ins>Add Note</ins></Col>
                                <Col span={9}>
                                    -22 hrs. by kapil asthana
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className="p-3">
                    <Row>
                        <Col span={12}>
                            <Input placeholder="Add Note" />
                        </Col>
                    </Row>
                </div>
                <div className="p-3">
                    <Row>
                        <Col span={12}>
                            <div className="border rounded">
                                <TextArea
                                    placeholder="Add Note"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                    style={{ border: "none" }}
                                />
                                <div className='p-2 border-top'>
                                    <Row justify={"space-between"}>
                                        <Col>
                                            <PaperClipOutlined style={{ fontSize: "20px" }} />
                                        </Col>

                                        <Col>
                                            <Row gutter={5}>
                                                <Col span={25}>
                                                    <Button
                                                        style={{ backgroundColor: "#6c757d", borderColor: "#6c757d", color: "white" }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        style={{ backgroundColor: "#3E79F7", borderColor: "#3E79F7", color: "white" }}
                                                        htmlType="submit" block >
                                                        Save
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>


                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    )
}

export default Notes