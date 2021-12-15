import React, { useState, useEffect } from "react";
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { HomeOutlined, AccountBookOutlined, ContactsOutlined,
          UsergroupAddOutlined, RedEnvelopeOutlined  } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './SideNav.css'

const { Sider } = Layout;

export const SideNav = (props) => {    

  const { navCollapsed } = props

  const [key, setKey] = useState()
  const path = window.location.pathname   
  const history = useHistory()
  const updateRoute = (e, route) => {    
    history.push(route)
    setKey(e.key)
  }
  
  useEffect(() => {     
    if(path.match(/\/home\/leads/ig)) {
      setKey(2)
    } else if(path.match(/\/home\/contacts/ig)) {
      setKey(3)
    } else if(path.match(/\/home\/accounts/ig)) {
      setKey(4)
    } else if(path.match(/\/home\/users/ig)) {
      setKey(5)
    } else if (path.match(/\/home/ig)) {
      setKey(1)
    }
  })  

  return (   
    <div className='sidenav-sider'>
      <Sider trigger={null} collapsible collapsed={navCollapsed}>
        <Menu
          mode='inline'
        >
          <Menu.Item 
            key='1' 
            icon={<HomeOutlined />} 
            onClick={(e) => updateRoute(e, '/home')}                        
            className={(key == 1) ? `ant-menu-item-selected` : ''}            
            >
              Dashboard
          </Menu.Item>
          <Menu.Item 
            key='2' 
            icon={<RedEnvelopeOutlined />} 
            onClick={(e) => updateRoute(e, '/home/leads')}            
            className={(key == 2) ? `ant-menu-item-selected` : ''}            
            >
              Leads
          </Menu.Item>
          <Menu.Item 
            key='3' 
            icon={<ContactsOutlined />}
            onClick={(e) => updateRoute(e, '/home/contacts')}
            className={(key == 3) ? `ant-menu-item-selected` : ''}
            >
              Contacts
          </Menu.Item>
          <Menu.Item 
            key='4' 
            icon={<AccountBookOutlined />}
            onClick={(e) => updateRoute(e, '/home/accounts')}
            className={(key == 4) ? `ant-menu-item-selected` : ''}
            >
              Accounts
          </Menu.Item>
          <Menu.Item 
            key='5' 
            icon={<UsergroupAddOutlined />}            
            onClick={(e) => updateRoute(e, '/home/users')}
            className={(key == 5) ? `ant-menu-item-selected` : ''}
            >
              Users
          </Menu.Item>
        </Menu>
      </Sider>
    </div>     
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed } =  theme;
  return { navCollapsed }
};


export default connect(mapStateToProps)(SideNav);
