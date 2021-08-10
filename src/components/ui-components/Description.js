import React from 'react'
import JoditEditor from "jodit-react"
import { Form } from 'antd';

const Address = () => {
  return(
    <div className="description-form">
      <div className="d-flex ml-5">                
        <p className="desc-label mr-4">Description</p>
        <Form.Item label="" name="description">
          <JoditEditor 
            className="joeditor"
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default Address