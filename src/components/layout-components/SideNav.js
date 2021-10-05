import React from "react";
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { HomeOutlined, AntDesignOutlined, ContactsOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export const SideNav = (props) => {    

  const { navCollapsed } = props
  const history = useHistory()
  const updateRoute = (route) => {    
    history.push(route)
  }

  return (        
    <div className="sidenav">
        <Menu
          mode="inline"
          inlineCollapsed={navCollapsed}        
          style={{marginRight: '0'}}         
          >
          <Menu.Item 
            key="1" 
            icon={<HomeOutlined />}
            onClick={() => updateRoute('/home')}>
            Dashboard
          </Menu.Item>
          <Menu.Item 
              key="2" 
              icon={<AntDesignOutlined />}
              onClick={() => updateRoute('/home/leads')}>
            Leads
          </Menu.Item>
          <Menu.Item 
              key="3" 
              icon={<ContactsOutlined />}
              onClick={() => updateRoute('/home/contacts')}>
            Contacts
          </Menu.Item>
          <Menu.Item 
              key="4" 
              icon={<ContactsOutlined />}
              onClick={() => updateRoute('/home/opportunities')}>
            Opportunities
          </Menu.Item>
          <Menu.Item 
              key="5" 
              icon={<ContactsOutlined />}
              onClick={() => updateRoute('/home/accounts')}>
            Accounts
          </Menu.Item>
          <Menu.Item 
              key="6" 
              icon={<ContactsOutlined />}
              onClick={() => updateRoute('/home/companies')}>
            Companies
          </Menu.Item>
          <Menu.Item 
              key="7" 
              icon={<ContactsOutlined />}
              onClick={() => updateRoute('/home/analytics')}>
            Analytics
          </Menu.Item>
          <Menu.Item 
              key="8" 
              icon={<ContactsOutlined />}
              onClick={() => updateRoute('/home/users')}>
            Users
          </Menu.Item>
        </Menu>      
    </div>      
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed } =  theme;
  return { navCollapsed }
};


export default connect(mapStateToProps)(SideNav);
