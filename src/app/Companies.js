import React, { useEffect } from 'react'
import { List, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getData } from '../redux/actions/Fetch'
import './companies.css'

export const CompaniesList = (props) => {

  useEffect(() => {        
    props.getData(`/api/auth/companies-list/`, 'companies')    
  }, [])

  let { companies } = props  
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
                title={<Link to="/home" onClick={() => localStorage.setItem('company', item.id)}>{item.name}</Link>}
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

const mapStateToProps = (state) => {  
  const { companies } = state.companies
  return { companies }
}

const mapDispatchToProps = {  
  getData
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList)
