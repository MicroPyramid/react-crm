import React from 'react'
import { Row, Col, Form, Input, Collapse } from 'antd'

const { Panel } = Collapse;

const rules = {
    addressLine:[
        {
            required:true,
            message: 'address line required'
        }
    ],
    city:[
        {
            required:true,
            message:"city name required"
        }
    ],
    street:[
        {
            required:true,
            message:"street required"
        }
    ],
    state:[
        {
            required:true,
            message:"state name required"
        }
    ],
    pincode:[
        {
            required:true,
            message:"pin code required"
        }
    ]
}

const AddressInformation = (props) => {
    // const [open, setOpen] = useState(false)
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },

    };

    return (

        <Collapse className="w-100 shadow-sm p-2 mb-5 bg-white" defaultActiveKey={['0']} expandIconPosition={"right"}>
            <Panel style={{ borderBottom: "none", fontWeight: "600", fontSize: 20 }} showArrow={true} header="Address Details"  >
                <div className='mt-4 w-100 d-flex justify-content-center'>

                    <div className="w-100">
                        <Form {...layout} form={form} name="control-hooks">
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="addressLine"
                                        label="Address Line"
                                        rules={rules.addressLine}
                                    >
                                        <Input 
                                        style={{ borderRadius: "4px" ,borderLeftColor:"red",marginLeft:"16px"}} 
                                        placeholder="Address Line" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} xs={18} xl={10}>
                                    <Form.Item
                                        name="city"
                                        label="City"
                                        rules={rules.city}
                                    >
                                        <Input style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="City" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                    <Form.Item
                                        name="street"
                                        label="Street"
                                        rules={rules.street}
                                    >
                                        <Input style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="Job Title" />
                                    </Form.Item>
                                </Col>

                                <Col span={12} xs={18} xl={10}>
                                    <Form.Item
                                        name="state"
                                        label="State"
                                        rules={rules.state}
                                    >
                                        <Input style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="Phone Number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={10} xs={18} xl={10}>
                                <Form.Item
                                        name="pincode"
                                        label="Pin Code"
                                        rules={rules.pincode}
                                    >
                                        <Input style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="Email" />
                                    </Form.Item>
                                </Col>
                                <Col span={10} xs={18} xl={10}>
                                <Form.Item
                                        name="country"
                                        label="Country"
                                    >
                                        <Input style={{ borderRadius: "4px" ,marginLeft:"16px"}} placeholder="Email" />
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

export default AddressInformation
