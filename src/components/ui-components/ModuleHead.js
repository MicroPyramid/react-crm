import React, { useEffect, useState } from 'react'
import { Breadcrumb, Radio, Button  } from 'antd'
import { AppstoreOutlined, BarsOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import '../../assets/css/temp.css'
import { connect } from 'react-redux';
import { toggleTableScrumBoard } from '../../redux/actions/Theme'

export const ModuleHead = (props) => {  

  const { toggleTableScrumBoard } = props;  
  
  let to = window.location.pathname+'new';  

  return (
    <div className="head-wrapper">
      <div className="head-list">
        <div className="head-heading-breadcrumb">
          {/* <h3 className="mb-0 mr-3 font-weight-semibold">Leads</h3>
          <Breadcrumb separator=">" >
            <Breadcrumb.Item><Link to="/home">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item>leads</Breadcrumb.Item>
          </Breadcrumb> */}
        </div>
        <div className="head-btns">
          <Radio.Group defaultValue="value" size="medium">
            <Radio.Button value="scrumboard" onClick={() => toggleTableScrumBoard(false)}><AppstoreOutlined/></Radio.Button>
            <Radio.Button value="list" onClick={() => toggleTableScrumBoard(true)}><BarsOutlined/></Radio.Button>
          </Radio.Group>
          {/* <Button type="primary">Upload csv</Button>           */}
          <Link to="/home/leads/new" className="text-white" style={{marginLeft: '7px'}}>
          <Button type="primary"><PlusOutlined />New</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ theme }) => {
  const { toggleTable } = theme
  return { toggleTable }
}

const mapDispatchToProps = {
  toggleTableScrumBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleHead)

