import React, { Component } from "react"
import ReactQuill from 'react-quill'
import { Collapse } from 'antd';
import { Row, Col, Button, Form, Input, Select } from 'antd';
import { PlusOutlined, CloseCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import AddToolbar from '../../components/ui-components/AddToolbar'
import { connect } from 'react-redux'
import { putData } from '../../redux/actions/Fetch'
import { getUserDetails, updateUserDetails, isLoading, updateUserFormData } from '../../redux/actions/Users'

const { Panel } = Collapse;
const { Option } = Select;

export class EditUser extends Component {
  constructor(props) {    
    super(props)        
    this.state = { 
      localLoading: true, 
      openAltEmail: false,
      openAltPhone: false,
      role: ''      
    }
  }

  componentDidMount() {        
    this.props.getUserDetails(`/api/users/${this.props.match.params.id}/`)
  }
  
  componentDidUpdate() {    
    if(this.state.localLoading) {       
      this.setState({ 
        first_name: this.props.userDetails.first_name,
        last_name: this.props.userDetails.last_name,
        role: this.props.userDetails.role,
        email: this.props.userDetails.email,
        alternate_email: this.props.userDetails.alternate_email,
        phone: this.props.userDetails.phone,
        alternate_phone: this.props.userDetails.alternate_phone,
        skype_ID: this.props.userDetails.skype_ID,
        address_line: this.props.userDetails.address.address_line,
        street: this.props.userDetails.address.street,
        pincode: this.props.userDetails.address.pincode,
        city: this.props.userDetails.address.city,
        state: this.props.userDetails.address.state,
        country: this.props.userDetails.address.country,
        description: this.props.userDetails.description,
        is_active: this.props.userDetails.is_active,
        openAltEmail: (this.props.userDetails.alternate_email) ? true : false,
        openAltPhone: (this.props.userDetails.alternate_phone) ? true : false
      })
      this.setState({ localLoading: false })
    }      
  }  
  toggleUserStatus = () => {
    this.setState({ is_active: !this.state.is_active })
  }
  handleChange = (e) => {             
    this.setState({ [e.target.id]: e.target.value })  
  }    
  handleChangeRole = (e) => {
    this.setState({ role: e })
  }
  handleChangeDescription = (e) => {
    this.setState({ description: e })
  }
  displayAltEmail = () => {
    this.setState({ openAltEmail: true })  
  }
  HideAltEmail = () => {
    this.setState({ openAltEmail:  false })
  }
  displayAltPhone = () => {
    this.setState({ openAltPhone: true })  
  }
  HideAltPhone = () => {
    this.setState({ openAltPhone:  false })
  }
  updateUser = (e) => {    
    let userObj = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      role: this.state.role,
      email: this.state.email,
      alternate_email: this.state.alternate_email,
      phone: this.state.phone,
      alternate_phone: this.state.alternate_phone,
      skype_ID: this.state.skype_ID,
      address_line: this.state.address_line,
      street: this.state.street,
      pincode: this.state.pincode,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      description: this.state.description,
      is_active: this.state.is_active,
      id: this.props.match.params.id
    }
    console.log('The value from userObj from edituser :', userObj)
    this.props.putData(`users/${this.props.match.params.id}/`, 'users', userObj, this.props.match.params.id)
  }  

  render() {       
    if(this.props.loading) {
      return (
        <div></div>
      )
    } else {            
      return (        
        <div className="app-area">
        <AddToolbar module="users"/>
        <div className="users-information">
          <div className="toggle-button d-flex align-items-center">
            <span className="toggle-button-background"></span>
            <span className="toggle-button-circle"
                  style={{marginLeft: (this.state.is_active) ? '17px' : '1px'}} 
                  onClick={() => this.toggleUserStatus()}
            >
            </span>
            <span className="toggle-button-text">{(this.state.is_active ? 'Enable User' : 'Disable User')}</span>
          </div>
          <Form            
            onFinish={this.updateUser}
            className='edit-user'
            >
            
            <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
              <Panel header="User Details" key="1">
                <Row>
                  <Col span={12}>
                    <Form.Item label="First Name" name="first_name" className="user-name">                                          
                      <span>
                        <input type="text"  id='first_name' className="req"
                          value={this.state.first_name}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </span>                      
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name" className="user-name">
                    <span>
                        <input type="text"  id='last_name' className="req"
                          value={this.state.last_name}
                          onChange={(e) => this.handleChange(e)}                          
                        />                        
                      </span>
                    </Form.Item>
                    <Form.Item label="User Role" name="role" className="user-userrole">                                            
                      <Select key={this.state.role} defaultValue={this.state.role} onChange={this.handleChangeRole}>
                        <Option value="ADMIN" >ADMIN</Option>
                        <Option value="USER">USER</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email Address" name="email" className="user-emailaddress">
                      <span>
                        <input type="text"  id='email' className="req"
                          value={this.state.email}
                          onChange={(e) => this.handleChange(e)}
                        />
                        <PlusOutlined 
                          className='add-email-btn'
                          onClick={() => this.displayAltEmail()}
                        />
                      </span>
                    </Form.Item>
                    <Form.Item name="alternate_email">
                      <span 
                        style={this.state.openAltEmail ? {'display':'block', 'marginBottom': '20px'} : {'display':'none'}}>
                          <input 
                            type="text"  
                            id='alternate_email'                             
                            value={this.state.alternate_email}
                            onChange={(e) => this.handleChange(e)}
                          />
                          <CloseOutlined 
                            className='close-alternateemail-btn'
                            onClick={() => this.HideAltEmail()}
                          />
                      </span>
                    </Form.Item>
                    <Form.Item label="Mobile Number" name="phone" className="user-mobilenumber"
                      style={this.state.openAltEmail ? {'marginTop': '-20px'} : {'marginTop': '-70px'}}
                    >
                      <span>
                        <input type="text"  id='phone' className="req"
                          value={this.state.phone}
                          onChange={(e) => this.handleChange(e)}
                        />
                        <PlusOutlined 
                          className='add-phone-btn'
                          onClick={() => this.displayAltPhone()}
                        />
                      </span>
                    </Form.Item>
                    <Form.Item name="alternate_phone"
                      >
                      <span
                        style={this.state.openAltPhone ? {'display':'block', 'marginBottom': '20px'} : {'display':'none'}}
                        >
                        <input type="text"  id='alternate_phone' 
                          value={this.state.alternate_phone}
                          onChange={(e) => this.handleChange(e)}
                        />
                        <CloseOutlined 
                            className='close-alternateemail-btn'
                            onClick={() => this.HideAltPhone()}
                          />
                      </span>
                    </Form.Item>
                    <Form.Item label="Skype ID" name="skype_ID" className="user-skype"
                      style={this.state.openAltPhone ? {'marginTop': '-20px'} : {'marginTop': '-70px'}}
                    >
                      <span>
                        <input type="text"  id='skype_ID' className="req"
                          value={this.state.skype_ID}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </span>
                    </Form.Item>
                  </Col>
                </Row>              
              </Panel>
            </Collapse>
            
            <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
              <Panel header="Address Details" key="1">              
                <Row className="address-component">
                  <Col span={12}>
                    <Form.Item label="Address Lane" name="address_line" className="addresslane">
                      <span>
                        <input type="text"  id='address_line' className="req"
                          value={this.state.address_line}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </span>
                    </Form.Item>
                    <Form.Item label="Street" name="street" className="street">
                      <span>
                        <input type="text"  id='street' className="req"
                          value={this.state.street}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </span>
                    </Form.Item>
                    <Form.Item label="Pin Code" name="pincode" className="pincode">
                      <span>
                        <input type="text"  id='pincode' className="req"
                          value={this.state.pincode}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </span>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="City" name="city" className="city">
                      <span>
                        <input type="text"  id='city' className="req"
                          value={this.state.city}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </span>
                    </Form.Item>
                    <Form.Item label="State" name="state" className="state">
                      <span>
                        <input type="text"  id='state' className="req"
                          value={this.state.state}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </span>
                    </Form.Item>
                    <Form.Item label="Country" name="country" className="country">
                      <span>
                        <input type="text"  id='country' className="req"
                          value={this.state.country}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </span>
                    </Form.Item>
                  </Col>
                </Row> 
              </Panel>
            </Collapse>
            
          <Collapse defaultActiveKey={["1"]} expandIconPosition="right" className="mt-4">
            <Panel header="Description" key="1">            
              <Form.Item label="" name="description">
                <ReactQuill id="descripiton" value={this.state.description} onChange={e => this.handleChangeDescription(e)}/>
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
 
}
}
const mapStateToProps = (state) => {    
  const { loading, userDetails, userUpdated } = state.users  
  return { loading, userDetails, userUpdated }
}

const mapDispatchToProps = {
  getUserDetails,
  updateUserDetails,
  isLoading,
  updateUserFormData,
  putData
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)

