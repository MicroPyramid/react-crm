// @flow
import * as React from 'react';
import { Row, Col } from 'antd';

export function InfoPanel() {
  return (
    <>
      <div className="d-flex flex-column justify-content-between h-100 px-4 bg-cornblue">
        <div className="text-right">
          <h1 className="pt-2 text-white">BottleCrm</h1>
        </div>
        <Row justify="center">
          <Col xs={0} sm={0} md={0} lg={20}>
            <h1 className="text-white">BottleCRM</h1>
            <p className="text-white">
              *Free CRM for startups and enterprises. Released as opensource
              under MIT Licence.
            </p>
          </Col>
        </Row>
        <div className="d-flex justify-content-end pb-4">
          <div>
            <a
              className="text-white"
              href="/#"
              onClick={(e) => e.preventDefault()}
            >
              Term & Conditions
            </a>
            <span className="mx-2 text-white"> | </span>
            <a
              className="text-white"
              href="/#"
              onClick={(e) => e.preventDefault()}
            >
              Privacy & Policy
            </a>
          </div>
          <div>*Free upto 5 users</div>
        </div>
      </div>
    </>
  );
}
