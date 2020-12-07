import React from 'react';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import TextDisplay from '../UIComponents/Display/TextDisplay';

export default function ViewDocument(props) {

  return (
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      <BreadCrumb target="documents" action="View" />

      <form id="add_form" method="POST" enctype="multipart/form-data" action="" novalidate="">
        <div className="overview_form_block row marl justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="card-title text-center">
                  DOCUMENT
                  <a href="/documents/35/edit/" className="btn edit doc-btn-edit rounded-0">Edit</a>
                </div>
                <div className="row marl no-gutters">
                  <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <TextDisplay  elementSize="col-md-12" labelName="Title" attrName="title" attrPlaceholder="Document Title" inputId="id_document_title" isRequired={true}
                                value="Document One" />
                    <TextDisplay  elementSize="col-md-12" labelName="Title" attrName="Status" attrPlaceholder="Document Title" inputId="id_document_title" isRequired={true}
                                value="active" />
                    <TextDisplay  elementSize="col-md-12" labelName="Title" attrName="Created By" attrPlaceholder="Document Title" inputId="id_document_title" isRequired={true}
                                value="domain4@gmail.com" />
                    <TextDisplay  elementSize="col-md-12" labelName="Title" attrName="Created On" attrPlaceholder="Document Title" inputId="id_document_title" isRequired={true}
                                value="17 min ago" />
                    <div class="filter_col col-md-12">
                      <div class="form-group">
                        <label class="contact_field_label" for="id_created_on" data-name="created_on">Shared To</label>
                        <br/>                                    
                        <span className="mr-1">
                          <a href="/users/1177/view/">
                            <img src="https://bottlecrm.s3.amazonaws.com/images/user.png" title="domain6@gmail.ocm" width="40" height="40"/>
                          </a>
                        </span>
                        <span className="mr-1">
                          <a href="/users/1177/view/">
                            <img src="https://bottlecrm.s3.amazonaws.com/images/user.png" title="domain6@gmail.ocm" width="40" height="40"/>
                          </a>
                        </span>
                        <span>
                          <a href="/users/1177/view/">
                            <img src="https://bottlecrm.s3.amazonaws.com/images/user.png" title="domain6@gmail.ocm" width="40" height="40"/>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div className="profile_pic">                
                      <svg className="svg-inline--fa fa-file-alt fa-w-12 fa-file-alt-doc" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="file-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg><i className="fa fa-file-alt" aria-hidden="true"></i>
                      <a style={{display:"block"}} href="/documents/35/download/">Download</a>                
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}
