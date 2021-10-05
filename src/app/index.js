import React, { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd"
import HeaderNav from '../components/layout-components/HeaderNav'
import SideNav from '../components/layout-components/SideNav';
// import Footer from '../components/layout-components/Footer';
import AppRoutes from './routes'
import { connect } from 'react-redux'
import '../assets/css/temp.css'

const { Content } = Layout;

const AppIndex = (props) => {
  
  const { navCollapsed } = props;  
  const [path, setPath] = useState()

  const getSideNavCol = () => {    
    let ml = 'ml-250'
    if (navCollapsed) {
      ml = 'ml-135'
    } else {
      ml= 'ml-250'
    }
    return ml
  }
  
  useEffect(()=> {
    const token = localStorage.getItem('Token')    
    if(!token) {         
        props.history.push('/login')
      }          
  })

  return (      
    <Layout>
      <HeaderNav path={path}/>
      <Layout className="app-container">
        <Row className="row app-row-left-right">          
          <Col className={`app-left col-md-3 col-lg-3`}>          
            <SideNav/>
          </Col>          
          <Col className={`app-right col-md-9 col-lg-9 ${getSideNavCol()}`}>          
            <Content className="app-content-inner">
              <AppRoutes/>
            </Content>            
          </Col>
        </Row>          
      </Layout>
      {/* <Footer/> */}
    </Layout>
  );
};

const mapStateToProps = ({theme}) => {
  const { navCollapsed } = theme
  return { navCollapsed }
}

export default connect(mapStateToProps)(AppIndex);
