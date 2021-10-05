import React from 'react'
import { Row, Col, Card } from 'antd'
import {
    PlusOutlined,    
    DeleteOutlined,
} from '@ant-design/icons';

const image = [
    {
        url: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2NyZWVuc2hvdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        imgName: "mail.jpg",
        size: "30kb"
    },
   
    
]

const Attachment = () => {

    return (
        <div>
            <Card bodyStyle={{ padding: "0" }}>
                <div className="p-3 d-flex justify-content-between  border-bottom">
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Attachment
                    </div>
                    <div>
                        <Row gutter={35}>
                            <Col>
                                <span><PlusOutlined /></span>
                                Add Attachment
                            </Col>

                        </Row>
                    </div>

                </div>
                <div className='p-3'>
                    <Row gutter={21}>
                    {image.map((item) => (
                            <div className='p-1 border' style={{padding:"4px",borderRadius:"10px"}}>
                                <Col span={10}>
                                    <img style={{padding:"2px",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}} src={item.url} height={120} width={160} />
                                </Col>
                                <Row justify={"space-between"} className='p-2'>
                                    <Col style={{ marginLeft: "10px" }}>
                                        <div>{item.imgName}</div>
                                        <div>{item.size}</div>
                                    </Col>
                                    <Col style={{ marginTop: "5px" }}>
                                        <DeleteOutlined style={{ fontSize: "15px" }} />
                                    </Col>
                                </Row>
                            </div>
                        ))}


                    </Row>
                </div>

            </Card>
        </div>
    )
}

export default Attachment