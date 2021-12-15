import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Collapse, Row, Col, 
         Input, Menu, Select, 
         Breadcrumb, Button, Upload } from 'antd'
import { PlusOutlined, 
         VerticalAlignTopOutlined, 
         LeftOutlined,
         CheckOutlined,
         CloseCircleOutlined } from '@ant-design/icons'
import { addLead } from '../../redux/actions/Leads'
import { getProfiles } from '../../redux/actions/Profiles'
import ReactQuill from 'react-quill';
import { rules } from '../common/rules'
import { modules, formats } from '../common/quillConfig'
import { layout } from '../common/layout'
import { ContactDrawer } from './components/ContactDrawer'
import './leads.css'

const { Panel } = Collapse
const { Option } = Select

export const AddLead = (props) => {  
  
  useEffect(() => {
    props.getProfiles()
  }, [])

  const { responseMessage, errors, profiles } = props

  
  const currencyList = (
    <Select defaultValue='INR'>
      <Option value='CAD'>CAD</Option>
      <Option value='USD'>USD</Option>
    </Select>
  )  

  const [contactDrawer, setContactDrawer] = useState(false)

  const displayContactDrawer = () => {
    setContactDrawer(true)
  }

  const addLead = (e) => {    
    props.addLead(e)    
  }
    
  useEffect(() => {        
    if(responseMessage === true) {
      props.history.push('/home/leads')
    }
  }, [responseMessage])

  return (
    <div className='add-lead'>
      <Row className="leads-toolbar">
        <Breadcrumb className='leads-toolbar-breadcrumb'>
          <Breadcrumb.Item>
            <Link to='/home'>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/home/leads'>Leads</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/home/leads/new'>Add Lead</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className='leads-toolbar-buttons'>
        <Button 
          type='primary'
          className='btn fw-12 fw-6'
        >
          <LeftOutlined />
          <span onClick={() =>  props.history.push('/home/leads')}>Back To Leads</span>
        </Button>
        <Button      
          type='primary'
          className='btn text-white bg-darkblue fw-12 fw-6'          
        >
          <CloseCircleOutlined />
          <span onClick={() =>  props.history.push('/home/leads')}>Cancel</span>
        </Button>
        <Button 
          type='primary'
          className='btn text-white fw-12 fw-6'          
        >
          <CheckOutlined />
          <span onClick={() =>  props.history.push('/home/leads')}>Save</span>
        </Button>                  
        </Row>
      </Row>
        <div className='add-lead-form'>
          <Form
            {...layout}
            onFinish={addLead}
            style={{background: '#fff', padding: '20px'}}
          >
            <Collapse expandIconPosition='right' defaultActiveKey={[1]}>
              <Panel header='Leads Details' key='1'>
                <Row justify='start'>
                  <Col xs={24} sm={24} md={24} lg={12} xl={11}>
                    <Form.Item
                      label='Lead Name'
                      name='title'  
                      rules={rules.title}
                      // validateStatus="error"
                      // help={(errors?.title) ? errors.title : false}
                    >
                      <Input className='required' />
                    </Form.Item>
                    <Form.Item
                      label='Website'
                      name='website'
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Assigned To'
                      name='assigned_to'
                    >
                      <Select
                        mode='multiple'                      
                      >                        
                        <Option key={profiles.id}>{profiles?.user_details?.first_name}</Option>
                        <Option key='a-2'>Assignee two</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label='Status'
                      name='status'
                      className='ant-dropdown-bg'
                    >
                      <Select>                        
                        <Option key='assigned'>Assigned</Option>
                        <Option key='in process'>In Process</Option>
                        <Option key='converted'>Converted</Option>
                        <Option key='recycled'>Recycled</Option>
                        <Option key='closed'>Closed</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label='Source'
                      name='source'
                      className='ant-dropdown-bg'
                    >
                      <Select>
                        <Option key='call'>Call</Option>
                        <Option key='email'>Email</Option>
                        <Option key='existing'>Existing Customer</Option>
                        <Option key='partner'>Partner</Option>
                        <Option key='public relations'>Public relations</Option>
                        <Option key='campaign'>Campaign</Option>
                        <Option key='other'>Other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label='Tags'
                      name='tags'
                    >
                      <Input.TextArea rows={2} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={11} offset={0} >
                    <Form.Item
                      label='Amount'
                      name='amount'
                      // rules={rules.amount}
                    >
                      <Input addonAfter={currencyList} className='required' />
                    </Form.Item>
                    <Form.Item
                      label='Contact Name'
                      name='contactname'
                    >                    
                      <Input                         
                        addonAfter={<PlusOutlined  onClick={displayContactDrawer} />}
                        className='contact-plus-outlined'
                      />
                    </Form.Item>
                    <Form.Item
                      label='Organization'
                      name='organization'
                    >
                      <Input addonAfter={<PlusOutlined />} />
                    </Form.Item>
                    <Form.Item
                      label='Skype ID'
                      name='skype_id'
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Attachment'
                      name='attachment'
                    >
                      <Input addonAfter={<VerticalAlignTopOutlined />} />                      
                    </Form.Item>
                    <Form.Item
                      label='Industry'
                      name='industry'
                      className='ant-dropdown-bg'
                    >
                      <Select>
                        <Option key='i-1'>Industry one</Option>
                        <Option key='i-2'>Industry two</Option>
                      </Select>
                    </Form.Item>
                  </Col>                
                </Row>
              </Panel>
              <Panel header='Address Details' key='2' style={{marginTop: '10px'}}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={12} xl={11}>
                    <Form.Item
                      label='Address Lane'
                      name='address_lane'
                      // rules={rules.addressLane}
                    >
                      <Input className='required' />
                    </Form.Item>
                    <Form.Item
                      label='Street'
                      name='street'
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Pincode'
                      name='pincode'
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={11}>
                    <Form.Item
                      label='City'
                      name='city'
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='State'
                      name='state'
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
              <Panel header='Description' key='3' style={{marginTop: '10px'}}>
                  <Form.Item
                      label='Description'
                      name='description'
                      style={{width: '100%'}}
                  >
                    <ReactQuill                    
                      modules={modules}
                      formats={formats}
                    />
                  </Form.Item>
              </Panel>
            </Collapse>

            <Row justify='center' style={{marginTop: '20px', marginBottom: '50px'}}>              

            <Button 
              type='primary'
              className='btn bg-darkblue text-white fw-12 fw-6'                        
            >
              <CloseCircleOutlined />
              <span>Cancel</span>
            </Button>                  
            <Button 
              type='primary'
              className='btn text-white fw-12 fw-6'   
              htmlType='submit'              
            >
              <CheckOutlined />
              <span>Save</span>
            </Button>                  
            </Row>

          </Form>
          <ContactDrawer open={contactDrawer} setContactDrawer={setContactDrawer}/>
        </div>
      </div>    
  )
}

const mapStateToProps = (state) => {
  const { responseMessage, errors } = state.leads
  const { profiles } = state.profiles
  return { responseMessage, errors, profiles }
}

const mapDispatchToProps = {
  addLead,
  getProfiles
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLead)