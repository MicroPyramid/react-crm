import React from 'react'
// import { Collapse } from 'antd';
// import { Row, Col, DatePicker, Button, Form, Input, Select } from 'antd';
// import { PlusOutlined, CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { addContact } from '../../redux/actions/Contacts'
// import AddToolbar from '../../components/ui-components/AddToolbar'
// import Address from '../../components/ui-components/Address'
// import Description from '../../components/ui-components/Description'
import { getLeads } from '../../redux/actions/Leads'


// const { Panel } = Collapse;
// const { Option } = Select;

export const AddContact = (props) => {  

  // const [errors, setErrors] = useState((props.errors !== "") ? props.errors.error.data.errors.contactErrors: '')

  console.log('The value of props from add contact :', props)
  const rules = {
    saluation: [{required: true, message: 'Saluation is required'}],
    firstName: [{required: true, message: 'First Name is required'}],
    lastName: [{required: true, message: 'Last Name is required'}],
    title: [{required: true,message: 'Title is required'}],
    addressLane: [{required: true,message: 'Address lane is required'}]
  }

  const addContact = (e) => {       
    
    const data = {
      salutation: e.salutation,
      first_name: e.first_name,
      last_name: e.last_name,
      date_of_birth: e.dob,
      organization: e.organization,
      title: e.title,
      primary_email: e.primaryemail,
      secondary_email: e.secondaryemail,
      mobile_number: e.mobilenumber,
      secondary_number: e.secondarynumber,
      department: e.department,
      do_not_call: true,
      address_line: e.addresslane,
      street: e.street,
      city: e.city,
      state: e.state,
      pincode: e.pincode,
      countr: e.country,
      description: e.description,
      linked_in_url: e.linkedinurl,
      facebook_url: e.facebookurl,
      twitter_username: e.twitterhandle,      
    }
    props.addContact('/api/contacts/', data)
  }

  const toggle = () => {

  }

  return (
    <div>Add contact</div>
    // <div className="app-area">
    //   <AddToolbar module="contacts" />
      
    //   <div className="basic-information">
    //     <Form onFinish={addContact}>
    //     <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
    //       <Panel header="Basic Information" key="1">
    //           <Row>
    //             <Col span={12}>
    //               <Form.Item label="Saluation" name="saluation" className="saluation"
    //                 rules={rules.saluation}>
    //                 <Input className="req" />
    //               </Form.Item>
    //               <Form.Item label="Last Name" name="last_name" className="lastname">
    //                 <Input className="req"/>
    //               </Form.Item>
    //               <Form.Item label="Organization" name="organization" className="organization">
    //                 <Input className="" suffix={<PlusOutlined />}/>
    //               </Form.Item>
    //               <Form.Item label="Primary Email" name="primaryemail" className="primaryemail">
    //                 <Input/>
    //               </Form.Item>
    //               <Form.Item label="Secondary Number" name="secondarynumber" className="secondarynumber">
    //                 <Input/>
    //               </Form.Item>
    //               <Form.Item label="Department" name="department" className="department">
    //                 <Select>
    //                   <Option value="deptone">Department One</Option>
    //                   <Option value="depttwo">Department Two</Option>
    //                   <Option value="deptthree">Department Three</Option>
    //                 </Select>
    //               </Form.Item>
    //               <div className="toggle-button d-flex align-items-center">
    //                 <span className="toggle-button-background"></span>
    //                 <span className="toggle-button-circle" onClick={toggle}></span>
    //                 <span className="toggle-button-text">Do not call</span>
    //               </div>
    //             </Col>
    //             <Col span={12}>
    //               <Form.Item label="First Name" name="first_name" className="firstname" 
    //                 rules={rules.firstName}
    //               >
    //                 <Input className="req"/>
    //               </Form.Item>
    //               <Form.Item label="Date of Birth" name="dob" className="dob">                    
    //                 <DatePicker />
    //               </Form.Item>
    //               <Form.Item label="Title" name="title" className="title"
    //                 rules={rules.title}
    //               >
    //                 <Input className="req"/>
    //               </Form.Item>
    //               <Form.Item label="Secondary Email" name="secondaryemail" className="secondaryemail">
    //                 <Input className=""/>
    //               </Form.Item>
    //               <Form.Item label="Mobile Number" name="mobilephone" className="mobilenumber">
    //                 <Input className=""/>
    //               </Form.Item>
    //               <Form.Item label="Language" name="language" className="language">
    //                 <Input className=""/>
    //               </Form.Item>
    //             </Col>                
    //           </Row>                                   
    //       </Panel>
    //     </Collapse>

        
    //     <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
    //       <Panel header="Address Details" key="1">
    //         <Address               
    //           errors={rules.addressLane}/>
    //       </Panel>
    //     </Collapse>        

        
    //     <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
    //       <Panel header="Description" key="1">
    //         <Description />
    //       </Panel>
    //     </Collapse>

        
    //     <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
    //       <Panel header="Socials" key="1">            
    //           <Row>
    //             <Col span={12}>
    //               <Form.Item label="Linkedin URL" name="linkedinurl" className="linkedinurl">
    //                 <Input/>
    //               </Form.Item>
    //               <Form.Item label="Twitter Handle" name="twitterhandle" className="twitterhandle">
    //                 <Input/>
    //               </Form.Item>
    //             </Col>
    //             <Col span={12}>
    //               <Form.Item label="facebook URL" name="facebookurl" className="facebookurl">
    //                 <Input/>
    //               </Form.Item>
    //             </Col>
    //           </Row>            
    //       </Panel>
    //     </Collapse>

    //     <div className="action-btns mt-4 mb-4 d-flex justify-content-center">
    //       <Button className="btn-cancel mr-2"><CloseCircleOutlined />Cancel</Button>
          
    //         <Button className="btn-save" htmlType="submit"><CheckOutlined />Save</Button>
          
    //     </div>        
    //     </Form>

    //   </div>     

    // </div>
  )
}

const mapStateToProps = (state) => {
  const { errors } = state.contacts
  return { errors }
}

const mapDispatchToProps = {
  addContact,
  getLeads  
}
export default connect(mapStateToProps, mapDispatchToProps)(AddContact)