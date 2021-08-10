import React, { useEffect, useState } from 'react'
import { Table, Tabs, Avatar, Tooltip, Tag, Drawer, Card } from 'antd'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import '../../assets/css/temp.css'
import { connect } from 'react-redux'
import { deleteObject } from '../../redux/actions/Leads'
import { getData } from '../../redux/actions/Fetch'
import { momentTimeFormats } from '../../Utilities'

const { TabPane } = Tabs;
let colors = ["#f50", "#2db7f5", "#87d068", "#108ee9"]

export const Leads = (props) => {    
  
  useEffect(() => {            
    props.getData(`leads/?limit=50`, 'leads')
  }, [])

  let { leads, loading } = props
  let assignedTo = ["https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"]
   
  
  const deleteLead = (e) => {        
    props.deleteObject(`leads/${e}/`)
    setTimeout(() => {
      props.getData(`leads/?limit=50`, 'leads')
    }, 300)    
  }

  return (
    <div className="app-area">
      <div className="toolbar">        
        <Link className="toolbar-addlead-link" to="/home/leads/new">
            <p className="toolbar-add-lead">
              <PlusCircleOutlined className="toolbar-plus-icon" />              
              Add Lead
            </p>          
        </Link>        
      </div>
      <Tabs className="custom-tabs">
      <TabPane className="custom-tabpane" tab="Open" key="1">
      {
        
          leads.data?.open_leads.open_leads.map(lead => { 
                          
            return(
              <div className="custom-tab-leads">    
                <div className="custom-tab-leads-first">
                  <div className="custom-tab-info">
                    <p className="title mb-0">{lead.title?.charAt(0).toUpperCase() + lead.title?.slice(1)}</p>
                    <p className="mb-0">{lead?.country} 
                        &nbsp;- Source <span>{lead.source?.charAt(0).toUpperCase() + lead.source?.slice(1)}</span> 
                        &nbsp;- Status <span><span>{lead.status?.charAt(0).toUpperCase() + lead.status?.slice(1)}</span></span></p>
                  </div>
                  <div className="custom-tab-assignedto-tags">
                    <div className="custom-tab-tags">
                      <Avatar.Group  
                        maxCount={2}                    
                        maxStyle={{
                          color: '#fff',
                          backgroundColor: '#003366'                      
                        }}>
                        {                                           
                          lead.tags.map(tg => (                        
                            <Tag color={colors[Math.floor(Math.random()* 4)]}>{tg.name}</Tag>
                          ))
                        }                    
                      </Avatar.Group>
                    </div>
                    <div className="custom-tab-assignedto">
                      <Avatar.Group
                        maxCount={3}
                        maxStyle={{
                          color: '#f56a00',
                          backgroundColor: '#fde3cf',
                        }}                    
                        className="custom-avatar-group">                    
                        {                                           
                          assignedTo.map(assign => (
                            <Avatar className="custom-avatar" src={assign}/>
                          ))
                        }                    
                    </Avatar.Group>
                    </div>                    
                  </div>
                </div>
                <div className="custom-tab-leads-second">
                  <div className="custom-tab-createdby">
                    <div className="custom-table-delete">
                      <DeleteOutlined onClick={() => deleteLead(lead.id)}/>
                    </div>
                    <p className="m-0">created {momentTimeFormats(lead.created_on)[0]} by &nbsp;
                        <Avatar className="custom-tab-createdby-avatar" src={lead.created_by.profile_pic}/> &nbsp;                     
                        <span className="username">{lead.created_by.username}</span>
                    </p>
                  </div>                                    
                </div>
              </div>
            )
          })
        }
      </TabPane>
      <TabPane className="custom-tabpane" tab="Close" key="2">
      {
          leads.data?.close_leads.close_leads.map(lead => {                 
            return(
              <div className="custom-tab-leads">    
                <div className="custom-tab-leads-first">
                  <div className="custom-tab-info">
                    <p className="title mb-0">{lead.title?.charAt(0).toUpperCase() + lead.title?.slice(1)}</p>
                    <p className="mb-0">{lead?.country} 
                        &nbsp;- Source <span>{lead.source?.charAt(0).toUpperCase() + lead.source?.slice(1)}</span> 
                        &nbsp;- Status <span><span>{lead.status?.charAt(0).toUpperCase() + lead.status?.slice(1)}</span></span></p>
                  </div>
                  <div className="custom-tab-assignedto-tags">
                    <div className="custom-tab-tags">
                      <Avatar.Group  
                        maxCount={2}                    
                        maxStyle={{
                          color: '#fff',
                          backgroundColor: '#003366'                      
                        }}>
                        {                                           
                          lead.tags.map(tg => (                        
                            <Tag color={colors[Math.floor(Math.random()* 4)]}>{tg.name}</Tag>
                          ))
                        }                    
                      </Avatar.Group>
                    </div>
                    <div className="custom-tab-assignedto">
                      <Avatar.Group
                        maxCount={3}
                        maxStyle={{
                          color: '#f56a00',
                          backgroundColor: '#fde3cf',
                        }}                    
                        className="custom-avatar-group">                    
                        {                                           
                          assignedTo.map(assign => (
                            <Avatar className="custom-avatar" src={assign}/>                             
                          ))
                        }                    
                    </Avatar.Group>
                    </div>                    
                  </div>
                </div>
                <div className="custom-tab-leads-second">
                  <div className="custom-tab-createdby">
                    <div className="custom-table-delete">
                      <DeleteOutlined onClick={() => deleteLead(lead.id)}/>
                    </div>
                    <p className="m-0">created {momentTimeFormats(lead.created_on)[0]} by &nbsp;
                        <Avatar className="custom-tab-createdby-avatar" src={lead.created_by.profile_pic}/> &nbsp;                     
                        <span className="username">{lead.created_by.username}</span>
                    </p>
                  </div>                                    
                </div>
              </div>
            )
          })
        }
      </TabPane>
      </Tabs>
    </div>
  )
}
const mapStateToProps = (state) => {
 
  const { leads, loading } = state.leads
  return { leads, loading }
}

const mapDispatchToProps = {  
  deleteObject,
  getData
}

export default connect(mapStateToProps, mapDispatchToProps)(Leads)
