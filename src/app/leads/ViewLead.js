import React from 'react'
import {Row, Col, Form, Input, Card, Select, Tag, Divider, Button  } from 'antd'
import { memberIds } from '../../components/ui-components/scrumboard/ScrumboardData';
import { AssigneeAvatar } from '../../components/ui-components/scrumboard/utils'
import { UserOutlined,  
	MobileOutlined, 
	MailOutlined, 
	GlobalOutlined,
	TagsOutlined,
	UsergroupAddOutlined,
	IdcardOutlined,
	TeamOutlined,
	StockOutlined,	
	ForkOutlined,
  FileTextOutlined,
  PaperClipOutlined } from '@ant-design/icons'
import { Timeline } from 'antd';


let { Option } = Select;

const memberTagRender = (props) => <AssigneeAvatar id={props.value} size={25} />

const teams = [];
						for (let i = 10; i < 36; i++) {
							teams.push(
                  <Option key={ 'team' + i}>{'team' + i}</Option>                                
                );
						}						
const renderTags = [];
let colors = ["red", "green", "lime"];
let tags = ['tag1', 'tag2', 'tag3', 'tag4'];
          for (let i = 0; i < 4; i++) {
renderTags.push(<Option key={ 'team' + i} className="custom-option-tag"><Tag color={colors[i]}>{tags[i]}</Tag></Option>);
                      }

let attachments = [
  {
    'id': 'jubuK7XGp3',
    'name': 'mail.jpg',
    'src': '/img/others/img-13.jpg',
    'size': '36.1kb'
  },
  {
    'id': 'xsb3HCejCM',
    'name': 'mail.jpg',
    'src': '/img/others/img-14.jpg',
    'size': '55.9kb'
  }
]

const ViewLead = (props) => {
  return (
    <>
      <Row>
        <Col xs={23} sm={23} md={23} lg={14}>        
          <Card>
          <h2 className="mb-4">Lead Detail</h2>
          <Form>

            <Form.Item>
              <Input className="board-card-modal input" value="Arun kumar"></Input>
              <Input className="board-card-modal lead-title input" value="Software developer"></Input>
            </Form.Item>                        

            <Row>
              <Col sm={20} md={20} lg={7} className="mr-4">
                <Form.Item label="Assigned To" name="assigned to" className="label-block">                  
                  <Select 
                    filterOption={false}
                    tagRender={memberTagRender}
                    mode="tags" 
                    removeIcon={null}
                    placeholder="None"
                    className="board-card-modal select"
                  >
                    {
                      memberIds.map(elm => (
                        <Option key={elm} value={elm}>
                          <AssigneeAvatar id={elm} name/>
                        </Option>
                      ))
                    }
                  </Select>
                </Form.Item>                
              </Col>
              <Col sm={20} md={20} lg={7} className="mr-4">
                <Form.Item label="Teams" name="teams" className="label-block">
                  <Select 						
                      mode="multiple" 
                      removeIcon={null}
                      placeholder="None"
                      defaultValue={["SDE", "Operations"]}
                      className="board-card-modal select"
                    >
                      { teams }
                  </Select>
                </Form.Item>                
              </Col>
              <Col sm={20} md={20} lg={7} className="mr-4">
                <Form.Item label="Tags" name="tags" className="label-block custom-tag-for-select">
                  <Select
                      mode="multiple"
                      removeIcon={null}
                      placeholder="None"
                      defaultValue={[<span class="ant-tag ant-tag-volcano">tag1</span>,
                        <span class="ant-tag ant-tag-lime">tag2</span>]}
                      className="board-card-modal select"
                    >
                      { renderTags }
                  </Select>
			          </Form.Item>
              </Col>
            </Row>

            <Divider className="mt-0"/>
            <Row>
              <Col lg={12}>
                <div className="">
                  <h6 className="text-muted text-uppercase mb-3">Personal Details</h6>
                  <p>
                    <UserOutlined />
                    <span className="ml-3 text-dark">Pranav</span>								
                    <span className="ml-3 text-dark">Krishna</span>
                  </p>
                  <p>
                    <IdcardOutlined/>
                    <span className="ml-3 text-dark">Account Name</span>
                  </p>
                  <p>
                    <span className="ml-3 text-dark">Account Title</span>
                  </p>
                  <p>
                    <MobileOutlined/>
                    <span className="ml-3 text-dark">+919898023241</span>
                  </p>
                  <p>
                    <MailOutlined/>
                    <span className="ml-3 text-dark">pranavkrishna@gmail.com</span>
                  </p>
                </div>
              </Col>
              <Col lg={12}>
                <div className="">
                  <h6 className="text-muted text-uppercase mb-3">Lead Details</h6>
                  <p>
                    <GlobalOutlined/>
                    <span className="ml-3 text-dark">www.pranavkrishna.com</span>
                  </p>
                  <p>
                    <TeamOutlined/>
                    <span className="ml-3 text-dark">Teams</span>
                  </p>
                  <p>
                    <UsergroupAddOutlined/>
                    <span className="ml-3 text-dark">Assigned Users</span>
                  </p>
                  <p>
                    <StockOutlined />
                    <span className="ml-3 text-dark">Status</span>
                  </p>
                  <p>
                    <ForkOutlined/>
                    <span className="ml-3 text-dark">Source</span>
                  </p>
                  <p>
                    <TagsOutlined/>
                    <span className="ml-3 text-dark">Tags</span>
                  </p>
                </div>
              </Col>
				    </Row>
            
            <Divider className="mt-0"/>

            <div className="d-flex">
              <div className="mr-3 font-size-md">
                <FileTextOutlined />	
              </div>
              <div className="w-100">
                <h4>Description</h4>
                <Form.Item name="description">
                  <Input.TextArea className="board-card-modal text-area"
                    defaultValue="Scenester hashtag sustainable art party 3 wolf moon live-edge portland offal master cleanse disrupt viral palo santo tacos. Offal sriracha you probably havent heard of them vaporware glossier."/>
                </Form.Item>
              </div>
            </div>

            <div className="d-flex">
              <div className="mr-3 font-size-md">
                <PaperClipOutlined />
              </div>
              <div className="w-100">
                <h4>Attachments</h4>
                <Row className="d-flex flex-row">
                {
                  attachments.map(elm => (                    
                      <Col sm={24} md={8} lg={4} className="mr-4">
                        <Card
                          bodyStyle={{padding: 0}}
                          cover={
                            <div className="p-2">
                              <img className="img-fluid" alt="example" src={elm.src} />
                            </div>
                          }
                        >     
                          <div className="px-2 pb-2 d-flex align-items-center justify-content-between">
                            <div>
                              <h5 className="mb-0">{elm.name}</h5>
                              <span className="text-muted font-size-sm">{elm.size}</span>
                            </div>
                          </div>                   
                        </Card>
                      </Col>                    
                  ))
                }
                </Row>
              </div>
            </div>
            <Form.Item className="text-right mb-0">
				      <Button type="primary" htmlType="submit">Change</Button>
			      </Form.Item>
          </Form>
          
        </Card>
        </Col>
        <Col xs={23} sm={23} md={23} lg={9} className="ml-3">
          <Card>
            <h2 className="mb-4">Lead Activity</h2>
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
          </Card>          
        </Col>
      </Row>      
    </>
  )
}

export default ViewLead;