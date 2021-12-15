import { Drawer, Form, Row, Col, Input, Select, Button, DatePicker } from 'antd'
import { PlusOutlined, CloseCircleOutlined, CheckOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill';
import { Divider } from 'antd'
import { rules } from '../../common/rules'
import { modules, formats } from '../../common/quillConfig'
import { layout } from '../../common/layout'
import '../leads.css'

const { Option } = Select

export const ContactDrawer = (props) => {

  const { open } = props

  const onClose = () => {    
    props.setContactDrawer(false)
  }

  return (
    <Drawer 
      width={800}
      visible={open} 
      onClose={onClose}
    >      
      <h2 >Contact Details</h2>      
      <Form 
        {...layout}        
        className='add-lead-form'       
      >
        <Divider orientation='left' className='fw-300'>Basic Information</Divider>
        <Row style={{marginRight: '20px'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label='Saluation'
              name='saluation'
              rules={rules.saluation}
            >
              <Input className='required'/>
            </Form.Item>
            <Form.Item
              label='Last Name'
              name='last_name'
              rules={rules.lastName}
            >
              <Input className='required'/>
            </Form.Item>
            <Form.Item
              label='Primary Email'
              name='primary_email'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Secondary Number'
              name='secondary_number'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Department'
              name='department'
              className='ant-dropdown-bg'
            >
              <Select>
                <Option key='s-1'>Call</Option>
                <Option key='s-1'>Assigned</Option>
                <Option key='s-1'>Converted</Option>
                <Option key='s-1'>Recycled</Option>
                <Option key='s-1'>Closed</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
                label='First Name'
                name='first_name'
                rules={rules.firstName}
              >
                <Input className='required'/>
            </Form.Item>
            <Form.Item
                label='Data of Birth'
                name='dob'
              >
              <DatePicker  style={{width: '100%'}}/>              
            </Form.Item>
            <Form.Item
                label='Title'
                name='title'
                rules={rules.title}
              >
                <Input className='required'/>
            </Form.Item>
            <Form.Item
                label='Secondary Email'
                name='secondary_email'
              >
                <Input />
            </Form.Item>
            <Form.Item
                label='Mobile Number'
                name='mobile_number'
              >
                <Input />
            </Form.Item>
            <Form.Item
                label='Language'
                name='language'
              >
                <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation='left' className='fw-300'>Address Details</Divider>
        <Row style={{marginRight: '20px'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label='Address Lane'
              name='address_lane'
              rules={rules.addressLane}
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
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
        <Divider orientation='left' className='fw-300'>Description</Divider>
        <Row style={{marginRight: '20px'}}>
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
        </Row>
        <Divider orientation='left' className='fw-300'>Socials</Divider>
        <Row style={{marginRight: '20px'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label='Linkedin URL'
              name='linkedin_url'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label='Facebook URL'
              name='facebook_url'
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>        
        <Row justify='center' style={{marginTop: '20px'}}>          

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
    </Drawer>
  )
}

export default ContactDrawer
