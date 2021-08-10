import React from 'react'
import { Form, Input, Row, Col, Select } from "antd"
import { motion } from "framer-motion"
import {    
  MailOutlined
} from '@ant-design/icons';

const { Option } = Select;

const Address = () => {

  return (
    <>
      <motion.div>
        <h2>Address</h2>
        <Form
          layout="vartical"
          name="addressform">
            <Form.Item
              name="address_line"
              label="Address Line"
              className="label-block mb-10"
              >
              <Input placeholder="address line"></Input>
            </Form.Item>
            <Form.Item
              name="street"
              label="Street"
              className="label-block mb-10"
              >
              <Input placeholder="street"></Input>
            </Form.Item>
            <Row gutter={6}>
              <Col xs={24} sm={24} md={8} lg={8}>
                <Form.Item
                  name="city"
                  label="City"
                  className="label-block mb-10"
                  >
                  <Input placeholder="city"></Input>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <Form.Item
                  name="state"
                  label="State"
                  className="label-block mb-10"
                  >
                  <Input placeholder="state"></Input>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <Form.Item
                  name="pincode"
                  label="Pincode"
                  className="label-block mb-10"
                  >
                  <Input placeholder="pincode"></Input>
                </Form.Item>
              </Col>
            </Row>                    
            <Form.Item
                name="country"
                label="Country"
                className="label-block"
                >                  
                  <Select>
                    <Option value="Afghanistan">Afghanistan</Option>
                    <Option value="Albania">Albania</Option>
                    <Option value="Algeria">Algeria</Option>
                    <Option value="Andorra">Andorra</Option>
                    <Option value="Angola">Angola</Option>
                    <Option value="Anguilla">Anguilla</Option>
                    <Option value="Antigua & Barduba">Antigua & Barbuda</Option>
                  </Select>
              </Form.Item>    
        </Form>
      </motion.div>
    </>
  )
}

export default Address
