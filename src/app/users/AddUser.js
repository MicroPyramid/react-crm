import React, { useEffect, useState} from "react"
import ReactQuill from 'react-quill'
import { Collapse } from 'antd';
import { Row, Col, Button, Form, Input, Select } from 'antd';
import { PlusOutlined, CloseCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import AddToolbar from '../../components/ui-components/AddToolbar'
import Address from '../../components/ui-components/Address'
import { connect } from 'react-redux'
import { postData } from '../../redux/actions/Fetch'

const { Panel } = Collapse;
const { Option } = Select;

export const AddUser = (props) => {

  const [userStatus, setUserStatus] = useState(true)
  const [showAlterEmail, setShowAlterEmail] = useState(false)
  const [showAlterMobile, setShowAlterMobile] = useState(false) 

  let { errors } = props
  console.log('Values of errors in add user page :', errors)
  // console.log('Values of errors in add user page :', errors.email[0])
  let errorVal = errors && errors.email[0]

  const rules = {
    firstName: [
      {
        required: true,
        message: `${(errors.first_name) ? errors.first_name : 'Please select the role'}`
      }
    ],
    email: [
      { 
        required: true,
        message: `${(errors.email) ? errors.email[0] : 'Please input your email'}`
      },
      { 
        type: 'email',
        message: 'Please enter a validate email!'
      }
    ],
    role: [
      { 
        required: true,
        message: `${(errors.role) ? errors.role : 'Please select the role'}`
      }
    ],
  }
    
  const addUser = (e) => { 
    if(userStatus) {
      e.status = 'Active'
    } else {
      e.status = 'Inactive'
    }    
    props.postData('/api/users/', "users", e)
  }  

  useEffect(() => {    
    if(props.userAdded === true) {      
      props.history.push('/home/users')
    }  
}, [props.userAdded])
  const { getFieldDecorator } = props.form;

  return (
    <div className="app-area">
      <AddToolbar module="users"/>
      <div className="users-information">
        <div className="toggle-button d-flex align-items-center">
          <span className="toggle-button-background"></span>
          <span className="toggle-button-circle"
                style={{marginLeft: (userStatus) ? '17px' : '1px'}} 
                onClick={() => setUserStatus(!userStatus)}></span>
          <span className="toggle-button-text">{(userStatus ? 'Enable User' : 'Disable User')}</span>
        </div>
        <Form onFinish={addUser}>
          {/* User Details */}
          <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
            <Panel header="User Details" key="1">
              <Row>
                <Col span={12}>
                  <Form.Item label="First Name" name="first_name" className="user-name"
                    >
                    <Input className="req" />
                  </Form.Item>
                  <Form.Item label="Last Name" name="last_name" className="user-name">
                    <Input className="req"/>
                  </Form.Item>
                  <Form.Item label="User Role" name="role" className="user-userrole">
                    <Select>
                      <Option value="ADMIN">ADMIN</Option>
                      <Option value="USER">USER</Option>
                    </Select>
                  </Form.Item>                  
                </Col>
                <Col span={12}>
                  <Form.Item label="Email Address" name="email" className="user-emailaddress"
                    {...props.errors && {
                      help: errorVal,
                      validateStatus: 'error'
                    }}> 
                    {
                      getFieldDecorator('email', {
                        rules: [
                          { required: true, message: 'iput emila'}
                        ]
                      })(
                        <Input suffix={<PlusOutlined  onClick={() => setShowAlterEmail(true)} />} />                    
                      )
                    }                                     
                  </Form.Item>
                  <Form.Item name="alternate_email">
                    <Input className={`close-email ${showAlterEmail ? 'mb-3' : 'd-none'}`} 
                            suffix={<CloseOutlined className="" onClick={() => setShowAlterEmail(false)}/>} 
                            placeholder="Alternate Email"
                            />
                  </Form.Item>
                  <Form.Item label="Mobile Number" name="phone" className="user-mobilenumber"
                    style={showAlterEmail ? {'marginTop':'-20px'} : {'marginTop': '-70px'}} >
                    <Input suffix={<PlusOutlined onClick={() => setShowAlterMobile(true)} />} />                    
                  </Form.Item>
                  <Form.Item name="alternate_phone">
                    <Input className={`close-mobilenumber ${showAlterMobile ? 'mb-3' : 'd-none'}`}
                            suffix={<CloseOutlined className="" onClick={() => setShowAlterMobile(false)} />}
                            placeholder="Alternate Mobile Number"/>
                  </Form.Item>
                  <Form.Item label="Skype ID" name="skype_ID" className="user-skype"
                    style={showAlterMobile ? {'marginTop':'-20px'} : {'marginTop': '-70px'}}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>              
            </Panel>
          </Collapse>

          {/* Address Details */}
          <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
            <Panel header="Address Details" key="1">
              <Address />
            </Panel>
          </Collapse>

          {/* Description */}
        <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
          <Panel header="Description" key="1">            
            <Form.Item label="" name="description">
              <ReactQuill />
            </Form.Item>            
          </Panel>
        </Collapse>
        
        <div className="action-btns mt-4 mb-4 d-flex justify-content-center">
          <Button className="btn-cancel mr-2"><CloseCircleOutlined />Cancel</Button>                    
          <Button className="btn-save" htmlType="submit"><CheckOutlined />Save</Button>          
        </div>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {  
  const { userAdded, errors } = state.users
  return { userAdded, errors }
}
const mapDispatchToProps = {
  postData  
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUser)