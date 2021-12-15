import React from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { connect } from 'react-redux'
import { toggleCollapsedNav } from '../../../redux/actions/Theme'
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from "@ant-design/icons";
import './HeaderNav.css'

const { Header } = Layout;

export const HeaderNav = props => {    

  const { navCollapsed } = props    

  const onLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={onLogout}>
        <LogoutOutlined /> Sign out
      </Menu.Item>
    </Menu>
  )
  return (    
    <Header className='headernav'>
      <>
      <img className='headernav-logo' src={require('../../../assets/images/logo.png').default} alt="" /> 
      <span className='headernav-toggle-icon'>
      { (navCollapsed) 
          ? <MenuUnfoldOutlined onClick={() => props.toggleCollapsedNav(false)}/>
          : <MenuFoldOutlined onClick={() => props.toggleCollapsedNav(true)}/>
      }
      </span>      
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar style={{color: '#fff', backgroundColor: '#87d068'}}>U</Avatar>        
      </Dropdown>
      </>
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
