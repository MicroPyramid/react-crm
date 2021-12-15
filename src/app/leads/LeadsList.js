import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Tabs, List, Row, Col, 
         Tag, Avatar, Button, 
         Spin} from 'antd'
import { DeleteOutlined, 
         UnorderedListOutlined, 
         FilterOutlined, 
         AppstoreOutlined,                  
         PlusOutlined,
         RightOutlined, 
         LeftOutlined } from '@ant-design/icons'          
import { getLeads,
         loading,
         deleteLead,
        //  refresh,
         responseMessage } from '../../redux/actions/Leads'
import { momentTimeFormats } from '../../Utilities'
import './leads.css'

const { TabPane } = Tabs

export const LeadsList = (props) => {    
  
  const { leadsData, refresh } = props
      
  const [key, setKey] = useState(1)  
  const [isList, setIsList] = useState(true)
  const [openPage, setOpenPage] = useState(1)
  const [closePage, setClosePage] = useState(1)  

  const colors = ['#1e90ff', '#ff3377', '#ff8000', '#00b300']    
  
  useEffect(() => {    
      props.getLeads('/api/leads/', (key == 1) ? (openPage-1) * 10 : (closePage-1) * 10)    
  }, [refresh])

  useEffect(() => {              
    props.getLeads('/api/leads/', 0)      
  }, [])
  
  const next = async() => {    
    if(key == 1 && openPage < Math.ceil((leadsData?.open_leads?.leads_count)/leadsData?.per_page)) {
      setOpenPage(openPage + 1)
      props.getLeads('/api/leads/', openPage * 10)

    } else if (key == 2 && closePage < Math.ceil((leadsData?.close_leads?.leads_count)/leadsData?.per_page)) {
      setClosePage(closePage + 1)
      props.getLeads('/api/leads/', closePage * 10)
    }    
  }

  const previous = async() => {    
    if(key == 1 && openPage > 1 ) {
      setOpenPage(openPage - 1)      
      props.getLeads('/api/leads/', (openPage-2) * 10)

    } else if (key == 2 && closePage > 1) {
      setClosePage(closePage - 1)
      props.getLeads('/api/leads/', (closePage-2) * 10)
    }    
  }
  
  const updateKey = (e) => {       
    setKey(e)   
    if(e == 1) {
      if(openPage === 1) {                
        props.getLeads('/api/leads/', 0)
      } else {        
        props.getLeads('/api/leads/', (openPage-1) * 10)
      }
    } else if (e == 2) {            
      if(closePage === 1) {
        props.getLeads('/api/leads/', 0)
      } else {        
        props.getLeads('/api/leads/', (closePage-1) * 10)
      }
    }
  }          

  const leadDelete = (id) => {        
    props.deleteLead(id, !refresh)
  }

  return (    
    <div className='leadslist'>
    <div className='leads-toolbar'>
      <div className='leads-toolbar-functions-wrapper'>
        <span className='leads-toolbar-list-todo'>
          <AppstoreOutlined className={(!isList) ? `icon-select` : 'icon-unselect'} onClick={() => setIsList(false)}/>
          <UnorderedListOutlined className={(isList) ? `icon-select` : `icon-unselect`} onClick={() => setIsList(true)}/>
        </span>
        <FilterOutlined />
        <span className='leads-toolbar-pagination'>
          <LeftOutlined onClick={previous}/>
          <span className='leads-toolbar-pagination-numbers'>
            {
              (key == 1)
              ? `${openPage} of ${Math.ceil((leadsData?.open_leads?.leads_count)/leadsData?.per_page)}`
              : `${closePage} of ${Math.ceil((leadsData?.close_leads?.leads_count)/leadsData?.per_page)}`
            }
          </span>
          <RightOutlined onClick={next} />
        </span>            
        <Button
          type='primary'
          className='btn text-white fw-12 fw-6'
        >
          <PlusOutlined />
          <span onClick={() =>  props.history.push('/home/leads/new')}>Add Lead</span>
        </Button>        
      </div>
    </div>   
    <>
      { (!isList) 
        ? <div className='scrumboard'>
            <h1>Comming soon</h1>
          </div> 
        :         
                  
        <div className='list-table'>
          { (!props.isLoading) ?
            <Tabs onChange={updateKey} type='card'>
          <TabPane tab='Open' key='1'>  
          <div className='list-table-scroller'>
            <List
                dataSource={leadsData?.open_leads?.open_leads}
                renderItem={
                  item => (
                    <List.Item>
                      <Row gutter={16} justify='space-between' align='bottom' style={{width: '100vw'}}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>                    
                          <p className='leadslist-listitem-title'>{item.title}</p>
                          <p className='leadslist-listitem-info'>
                            {item.country ? item.country : 'N/A'}
                            - Source <b className='leadslist-listitem-info-source text-capitalize'>{item.source ? item.source: 'N/A' } </b>
                            - Status <b className='leadslist-listitem-info-status text-capitalize'>{item.status ? item.status: 'N/A' } </b>
                            <span className='leadlist-tags-wrapper'>
                            {
                              item.tags.map((tag,i) => {                          
                                return (
                                <Tag
                              color={colors[Math.floor(Math.random()*4)]} 
                              className='leadlist-tag'
                                >
                              {tag.name}
                                </Tag>
                              )})
                            }
                          </span>
                          <span>                            
                            {
                              item.assigned_to.map((user, index) => {                              
                                return (
                                  (user.user_details.profile_pic !== null)
                                    ? <Avatar src={user.user_details.profile_pic}></Avatar>
                                    : <Avatar 
                                        style={{color: '#fff', backgroundColor: `${colors[Math.floor(Math.random()*4)]}`}}
                                      >
                                        <span className='text-capitalize' title={user.user_details.first_name}>{user.user_details.first_name.toString()[0]}</span>
                                      </Avatar>
                                    )
                                })
                              }
                          </span>
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>                          
                          <div className='leadslist-listitem-info-two'>
                            <p className='leadslist-listitem-delete'><DeleteOutlined onClick={() => leadDelete(item.id)}/></p>
                            <p className='leadslist-listitem-createdby'>                        
                              <span>Created {momentTimeFormats(item.created_on)[0]} by </span>
                              <span><Avatar src={item.created_by.user_details.profile_pic}></Avatar></span>
                              <span className='text-capitalize'>{item.created_by.user_details.first_name}</span>                              
                            </p>
                            </div>
                        </Col>              
                    </Row>                
                </List.Item>
                  )
                }>
            </List>  
          </div>                                   
          </TabPane>
          <TabPane tab='Close' key='2'>
          <List
                dataSource={leadsData?.close_leads?.close_leads}
                renderItem={
                  item => (
                    <List.Item>
                      <Row gutter={16} justify='space-between' align='bottom' style={{width: '100vw'}}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>                    
                          <p className='leadslist-listitem-title'>{item.title}</p>
                          <p className='leadslist-listitem-info'>
                            {item.country ? item.country : 'N/A '} 
                            - Source <b className='leadslist-listitem-info-source text-capitalize'>{item.source ? item.source: 'N/A' } </b>
                            - Status <b className='leadslist-listitem-info-status text-capitalize'>{item.status ? item.status: 'N/A' } </b>
                            <span className='leadlist-tags-wrapper'>
                            {
                              item.tags.map((tag,i) => {                          
                                return (
                                <Tag
                              color={colors[Math.floor(Math.random()*4)]} 
                              className='leadlist-tag'
                                >
                              {tag.name}
                                </Tag>
                              )})
                            }
                          </span>
                          <span>                            
                            {
                              item.assigned_to.map((user, index) => {                              
                                return (
                                  (user.user_details.profile_pic !== null)
                                    ? <Avatar src={user.user_details.profile_pic}></Avatar>
                                    : <Avatar 
                                        style={{color: '#fff', backgroundColor: `${colors[Math.floor(Math.random()*4)]}`}}
                                      >
                                        <span className='text-capitalize' title={user.user_details.first_name}>{user.user_details.first_name.toString()[0]}</span>
                                      </Avatar>
                                    )
                                })
                              }
                          </span>
                          </p>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                          <Row justify="start" align="bottom">
                            <Col>
                              <p className='leadslist-listitem-delete'><DeleteOutlined /></p>
                              <p className='leadslist-listitem-createdby'>                        
                                <span>Created {momentTimeFormats(item.created_on)[0]} by </span>
                                <span><Avatar src={item.created_by.user_details.profile_pic}></Avatar></span>
                                <span className='text-capitalize'>{item.created_by.user_details.first_name}</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>              
                    </Row>                
                </List.Item>
                  )
                }>
            </List>                                            
          </TabPane>
            </Tabs> 
            : <Spin size='large' className='spin' />
          }
        </div>        
      }
    </>    
  </div>     
  )
}

const mapStateToProps = (state) => {
  const { isLoading, leadsData, openOffset, closeOffset, refresh } = state.leads
  return { isLoading, leadsData, openOffset, closeOffset, refresh }
}

const mapDispatchToProps = {
  getLeads,
  loading,
  deleteLead,
  // refresh,
  responseMessage  
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList)
