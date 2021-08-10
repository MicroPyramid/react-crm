import React, { useState, useEffect } from "react";
import { Layout, Button, Row, Col } from "antd";
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from '../../constants/ThemeConstant'
import { connect } from 'react-redux'
import { toggleCollapsedNav } from '../../redux/actions/Theme'
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import '../../assets/css/temp.css'
import ModuleHead from '../ui-components/ModuleHead'
import Profile from '../ui-components/Profile'
const { Header } = Layout;

export const HeaderNav = props => {    

  const { navCollapsed } = props

  const updateTopNavItems = () => {
    let brandNameCol = 4, toggleBtnCol = 1, moduleHeadCol = 16;
    if (navCollapsed) {
        toggleBtnCol = 1;
        brandNameCol = 2;        
        moduleHeadCol = 18;
    } 
    
    return [toggleBtnCol, brandNameCol, moduleHeadCol]
  }

  const onToggle = () => {
    props.toggleCollapsedNav(!navCollapsed)
  }
  
  return (
    <Header className="app-header bg-navColor">
      <div className="topnav-items-new">
        <div className="topnav-toggle-btn">
          <Button onClick={onToggle}>
            {navCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </Button>
          <span className="brand-name">BottleCRM</span>
        </div>
        <div style={{width:"5%",marginTop:"10px"}}>
         <Profile/>
        </div>        
      </div>      
    </Header>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed } =  theme;
  return { navCollapsed }
};

const mapStateToDispatch = {
  toggleCollapsedNav
}

export default connect(mapStateToProps, mapStateToDispatch)(HeaderNav)