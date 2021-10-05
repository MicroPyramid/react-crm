import React from 'react'
import { Row, Col, Card, Avatar, Image, Tag } from 'antd'


const Tags1 = [
    {
        name: " Rs.25,000,00.00",
        color: "#87d068",
    },
    {
        name: "Assignesd",
        color: "#2db7f5"
    }
]
const Tags2 = [
    {
        name: "Lead",
        color: "magenta"
    },
    {
        name: "Deadline",
        color: "lime"
    },
    {
        name: "Design",
        color: "gold"
    },
    {
        name: "Performance",
        color: "cyan"
    }
]

let users = [{
    uri: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
},
{
    uri: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
},
{
    uri: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

}]

const email = [
    "abc@gmail.com",
    "xyz@yahoo.com",
    "123@gmail.com"
]
const mobile = [
    {
        phone: "+91-1234567907",
        imp: true
    },
    {
        phone: "+91-1234567907",
        imp: false
    },

]
const LeadInfoDetails = () => {

    return (

        <div>
            <Card bodyStyle={{ padding: "0" }}>
                <div className="p-3 d-flex justify-content-between  border-bottom">
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Lead Information
                    </div>
                    <div>
                        <Row gutter={35}>
                            <Col>
                                created 7 month ago by <span>
                                    <Avatar
                                        size={28}
                                        src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    />
                                </span>
                            </Col>
                            <Col style={{ marginTop: "4px" }}>
                                Last Update: 20 day(s) ago
                            </Col>
                        </Row>
                    </div>
               
                </div>
                <div className="p-3">
                    <Row gutter={10}>
                        <Col>
                            A free online Library of 54 method descriptions
                        </Col>
                        <Col >
                            {Tags1.map((item) => (
                                <Tag
                                    style={{ fontSize: "16px", fontWeight: "bold" }}
                                    color={item.color}>{item.name}</Tag>
                            ))}
                        </Col>
                        <Col xs={18} xl={10}>
                            {Tags2.map((item) => (
                                <Tag
                                    style={{ fontSize: "14px" }}
                                    color={item.color}>{item.name}</Tag>
                            ))}
                        </Col>
                    </Row>
                </div>
                <div className="p-3">
                    <Row>
                        <Avatar
                            size={30}
                            src={<Image src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                        />
                        <Avatar
                            size={30}
                            src={<Image src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                        />
                        <Avatar
                            size={30}
                            src={<Image src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                        />
                    </Row>

                </div>
                <div className="p-3">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" }}>expected closed date</div>
                            <div className="mt-2">20-05-2021</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" }}>Contact Name</div>
                            <div className="mt-2">John</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" }}>Organization Name</div>
                            <div className="mt-2">Micropyramid</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" }}>industry</div>
                            <div className="mt-2">industry</div>
                        </Col>
                    </Row>

                    <div className='mt-4'>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>Pipeline</div>
                                <div className="mt-2">----</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>Probability</div>
                                <div className="mt-2">----</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>Website</div>
                                <div className="mt-2"><a href="!#">https://bottlecrm.com</a></div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>industry</div>
                                <div className="mt-2">industry</div>
                            </Col>
                        </Row>

                    </div>

                </div>

                <div className='p-3 border-bottom' style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Contact Details
                </div>
                <div className='p-3'>
                    <div className='mt-3'>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>First Name</div>
                                <div className="mt-2">RamGopan</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>Last Name</div>
                                <div className="mt-2">venketswara</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>Job Title</div>
                                <div className="mt-2"><a href="!#">developer</a></div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>Skype ID</div>
                                <div className="mt-2"><a href='!#'>Skype@id</a></div>
                            </Col>
                        </Row>

                    </div>
                    <div className='mt-3'>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>Email</div>
                                <div className='mt-2'>
                                    {email.map((item) => (
                                        <div>
                                            <a href='!#'>{item}</a>
                                        </div>
                                    ))}
                                </div>

                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={{ fontWeight: "bold" }}>Mobile Number</div>
                                <div className="mt-2">

                                    <div className='mt-2'>
                                        {mobile.map((item) => (
                                            <div>
                                                {(item.imp) ? <div>
                                                    <a href='!#'>{item.phone}<span>
                                                        {/* <StarFilled twoToneColor="#eb2f96"/> */}
                                                    </span></a>
                                                </div> :
                                                    <div>
                                                        <a href='!#'>{item.phone}</a>
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>


                        </Row>

                    </div>
                </div>
                <div className='p-3 border-bottom' style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Address Details
                </div>
                <div className='p-3 mt-3'>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" }}>Address Lane</div>
                            <div className="mt-2">105/205 D-block</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" }}>Street</div>
                            <div className="mt-2">papikondala street</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" }}>State</div>
                            <div className="mt-2">Telangana</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" }}>City</div>
                            <div className="mt-2">Hydrabad</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={{ fontWeight: "bold" ,marginTop:"5px"}}>Pin Code</div>
                            <div className="mt-2">225624</div>
                        </Col>
                    </Row>

                </div>
                <div className='p-3 border-bottom' style={{ fontWeight: "bold", fontSize: "16px" }}>
                    Description
                </div>
                <div className='p-3 mt-3'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={18} >
                            <div >What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took
                            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='p-3 border-bottom' style={{ fontWeight: "bold", fontSize: "16px",color:"red" }}>
                    Lost Reason
                </div>
                <div className='p-3 mt-3'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={18} >
                            <div >What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took
                            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took
                            </div>
                        </Col>
                    </Row>
                </div>
                
            </Card>

        </div>
    )
}

export default LeadInfoDetails