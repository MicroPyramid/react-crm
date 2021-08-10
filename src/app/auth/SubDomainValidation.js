import React from 'react';
import SubDomainValidationForm from './components/SubDomainValidationForm';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { InfoPanel } from './infoPanel';

const SubDomainValidation = (props) => {  
  return (    
    <div className="bg-white height-100">    
      <Row justify="center" className="align-items-stretch h-100">
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className="container d-flex flex-column justify-content-center h-100">
            <Row justify="center">
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>Domain Validation</h1>
                <div className="mt-4">
                  <SubDomainValidationForm {...props} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8}>
          <InfoPanel />
        </Col>
      </Row>
    </div>    
  );
};

export default SubDomainValidation;
