import React from 'react'
import { List, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

export const CompaniesList = (props) => {

  const companies = [
    {
      title: 'MicroPyramid Informatics Pvt Ltd'
    },
    {
      title: 'AWS and Salesforce Cloud Sevices'
    },
    {
      title: 'Web Development Services'
    },
    {
      title: 'MicroPyramid Informatics Pvt Ltd'
    },
    {
      title: 'AWS and Salesforce Cloud Sevices'
    },
    {
      title: 'Web Development Services'
    },
    {
      title: 'MicroPyramid Informatics Pvt Ltd'
    },
    {
      title: 'AWS and Salesforce Cloud Sevices'
    },
    {
      title: 'Web Development Services'
    }
  ]

  return(
    <div className="companies">  
      <Row>
        <Col span={18} offset={3}>
        <List
          header={<h1 className="ml-1">Companies</h1>}
          itemLayout="horizantal"
          dataSource={companies}      
          renderItem={item => (
            <List.Item>
              <List.Item.Meta                                 
                title={<Link to="/home">{item.title}</Link>}
              />          
            </List.Item>
          )}
        >      
        </List>
        </Col>
      </Row>    
    </div>
  )
}

export default CompaniesList
