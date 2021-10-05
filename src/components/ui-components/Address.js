import React from 'react'
import { Row, Col, Form, Input } from 'antd';

const Address = (props) => {  
  let { errors } = props 
  return(
    <Row className="address-component">
      <Col span={12}>
        <Form.Item label="Address Lane" name="address_line" className="addresslane">
          <Input className="req"/>
        </Form.Item>
        <Form.Item label="Street" name="street" className="street">
          <Input className=""/>
        </Form.Item>
        <Form.Item label="Pin Code" name="pincode" className="pincode">
          <Input className=""/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="City" name="city" className="city">
          <Input className=""/>
        </Form.Item>
        <Form.Item label="State" name="state" className="state">
          <Input className=""/>
        </Form.Item>
        <Form.Item label="Country" name="country" className="country">
          <Input className=""/>
        </Form.Item>
      </Col>
    </Row> 
  )
}

export default Address