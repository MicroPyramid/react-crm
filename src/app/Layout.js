import React, { useEffect } from "react";
import { Layout } from "antd"
import HeaderNav from '../components/layout-components/HeaderNav/HeaderNav'
import SideNav from '../components/layout-components/SideNav/SideNav';
import FooterNav from '../components/layout-components/FooterNav/FooterNav'
import AppRoutes from './routes'
import { connect } from 'react-redux'
import './Layout.css'

const { Content } = Layout;

const AppIndex = (props) => {
    
  const { navCollapsed } = props;
  
  useEffect(()=> {
    const token = localStorage.getItem('Token')
    if(!token) {         
        props.history.push('/login')
      }
  })

  return (      
    <Layout>
      <HeaderNav />
        <Layout>
          <SideNav />
          <Content>
            <AppRoutes />            
          </Content>
        </Layout>      
    </Layout>
  );
};

const mapStateToProps = ({theme}) => {
  const { navCollapsed } = theme
  return { navCollapsed }
}

export default connect(mapStateToProps)(AppIndex);
