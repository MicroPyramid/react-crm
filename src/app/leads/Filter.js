import React, {useState, useEffect} from 'react';
import { Button, Form, Input, Select, Drawer } from 'antd';
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export const Filter = (props) => {
  const { data, visible, close } = props  
  const tagOptions = (props.data) 
    ? props.data.tags.map(tag => <Option key={tag.id}>{tag.name}</Option>) : []
  const sourceOptions = [ <Option key="Call">Call</Option>,
                          <Option key="Email">Email</Option>,
                          <Option key="Existing Customer">Existing Customer</Option>,
                          <Option key="Partner">Partner</Option>,
                          <Option key="Public Relations">Public Relations</Option>,
                          <Option key="Campaign">Campaign</Option>,
                          <Option key="Other">Other</Option>
                        ]  
                              
  const onSubmit = (e) => {    
    props.isFilter(true)    
    props.getFilterData(e)       
  }

  const clearFilteredLeads = () => {  
    props.isFilter(false)     
    props.getFilterData({
      title: '',
      tags: '',
      source: ''
    })
  }
  
  return(    
    <Drawer
      width={300}
      placement="right"
      onClose={close}
      closable={false}
      visible={visible}
    >        
      <Form
				layout="vertical"
				name="login-form"	
        onFinish={onSubmit}			
			>
				<Form.Item
					name="title"
					label="Title">
					<Input              
          />
				</Form.Item> 
        <Form.Item
          name="tags"
          label="Tags"
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"                            
            >
              {tagOptions}
            </Select>
        </Form.Item>  
        <Form.Item
          name="source"
          label="Source">
            <Select              
              style={{ width: '100%' }}
              placeholder="Please select"                                
            >
          {sourceOptions}           
        </Select>
        </Form.Item>  
        
        <Form.Item>
					<Button type="primary" htmlType="submit" block>
						Submit
					</Button>
				</Form.Item>
        <Form.Item>
					<Button type="primary" block className="clear-btn" onClick={clearFilteredLeads}>
						clear
					</Button> 
				</Form.Item>        
      </Form>      
    </Drawer>
  )
}

export default Filter
