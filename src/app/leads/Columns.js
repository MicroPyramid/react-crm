import { UserOutlined, AntDesignOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Avatar, Tooltip, Tag } from 'antd'
import { momentTimeFormats } from '../../Utilities'
import { useState } from 'react'

let colors = ["red", "green", "lime", "volcano", "cyan"]

export const columns = [
  {
    title: 'Lead Title',
    dataIndex: 'title',
    render: (title) => (
      <span className="lead-title">{title}</span>
    )
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    render:  (a) => (              
      <div className="d-flex align-items-center">
        {(a[0] === null) ? <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> : <Avatar src={a[0]}></Avatar>}
        {<p className="avatar-text">{a[1]}</p>}
      </div>      
    )
  },
  {
    title: 'Source',
    dataIndex: 'source',
    render: (source) => <span>{source.charAt(0).toUpperCase() + source.slice(1)}</span>      
  },
  {
    title: 'Status',
    dataIndex: 'status', 
    render: (status) => <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>           
  },
  {
    title: 'Assigned To',
    dataIndex: 'assignedTo',
    render: (assignto) => {      
      return (
        <Avatar.Group
        maxCount={3}        
        maxStyle={{
          color: '#f56a00',
          backgroundColor: '#fde3cf',
        }}        
        >        
        {
          assignto.map(src => (
            <>
            <Tooltip title="name" placement="top">              
              <Avatar src={src} alt="user"/>
            </Tooltip>
            </>
          ))
        }
        </Avatar.Group>
      )
    }                 
  },
  {
    title: 'Tags',
    dataIndex: 'tags', 
    render: (tag) => {                                
      let newTag = ['+3 Tags']          
      let resTag = [];
      let shiftTag = [];
      let remainingTags = [];
      let hover = false      
      const handleHover = (e) => {
        hover = e        
      }            
      if(tag.length === 0) {
        resTag = null
      }
      if(tag.length <= 3) {
        resTag = tag.map(tg => <Tag color={colors[Math.floor(Math.random() * (5))]}>{tg}</Tag> )
      }
      if(tag.length > 3) {
        for(let i = 0; i < 2; i++) {
          shiftTag[i] = <Tag color={colors[Math.floor(Math.random() * (5))]}>{tag[i]}</Tag>
        }
        shiftTag.push(
              <Tag 
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}>
                +3 Tags
              </Tag>)
        resTag = shiftTag

        for(let i = 2; i < tag.length; i++) {
          remainingTags[i] = <Tag color={colors[Math.floor(Math.random() * (5))]}>{tag[i]}</Tag>
        }

      }
        return (          
          <>
            {resTag}
            {
              (hover) ?
              remainingTags : ''
            }
          </>
          )
    }
  },
  {
    title: 'Country',
    dataIndex: 'country',        
  },
  {
    title: 'Created On',
    dataIndex: 'createdOn',
    render: (createdOn) => (momentTimeFormats(createdOn)[0])      
  },
  {
    title: 'Actions',      
    render: () => {
      return (
        // <div className="d-flex align-items-center justify-content-center">
        <div className="">
          <EditOutlined />
          <DeleteOutlined className="custom-delete"/>
        </div>
      )        
    }      
  }
]