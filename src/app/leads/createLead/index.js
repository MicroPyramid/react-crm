import React, { useState } from 'react'
import { Card, Row, Col, Breadcrumb, Button, Form } from 'antd'
import {
    DownOutlined,
    LeftOutlined,
    CloseCircleOutlined,
    CheckOutlined
} from '@ant-design/icons';
import LeadInformation from './LeadInformation'
import ContactInformation from './ContactInformation'
import AddressInformation from './AddressInformation'
import Description from './Description'
import { connect } from 'react-redux';
import {newLead} from '../../../redux/actions/Leads'
const Leads = (props) => {

    

   function onSaveClick(){
    const { leads } = props
   
       const data = {
        title:leads.leadName,
        first_name:leads.firstName,
        last_name:leads.lastName,
        account_name:"",
        phone:leads.phone,
        email:leads.email,
        lead_attachment:"",
        website:leads.website,
        description:"",
        teams:"",
        assigned_to:leads.assignTO,
        status:leads.status,
        source:leads.source,
        address_line:leads.addressLine,
        street:leads.street,
        city:leads.city,
        state:leads.state,
        postcode:leads.pincode,
        country:"",
        tags:leads.tag
       }
       console.log("data",data);
       props.newLead('/api/leads/',data)
   }
    return (
        <div className="toolbar">
            <div style={{ backgroundColor: "#1A3353" }} className="p-2 d-flex justify-content-between">
                <div>
                    <Breadcrumb style={{ color: "white" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="!#">Leads</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a style={{ color: "white" }}> Add Leads</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="mr-3">
                    <Row gutter={5}>
                        <Col span={25}>
                            <Button icon={<LeftOutlined />} className="btn btn-default" htmlType="submit" block >
                                Back to Leads
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
                                <LeadInformation />
                                <ContactInformation />
                                <AddressInformation />
                                <Description />
                            </Row>
                        </div>
                    </Col>
                </Row>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    <div className=" p-1">
                        <Button type="primary" onClick={(props)=>onSaveClick(props)} >
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

const mapStateToProps = (state) => {
    const { leads } = state

    return { leads }

}
export default connect(mapStateToProps,{
    newLead
})(Leads)