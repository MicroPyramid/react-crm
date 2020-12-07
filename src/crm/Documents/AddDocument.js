import React, {useState } from 'react';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import TextInput from '../UIComponents/Inputs/TextInput';
import FileInput from '../UIComponents/Inputs/FileInput';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';

export default function AddDocument() {

  const [documentObject, setDocumentObject] = useState({
    title: '', attachment: '', teams: [], users: [], shareTo: []
  });

  const handleChange = (e) => {
    setDocumentObject({...documentObject, [e.target.name]: e.target.value});
  }

  const setFile = (e) => {
    setDocumentObject({...documentObject, attachment: e.target.files[0]});
  }

  const saveDocument = (e) => {
    e.preventDefault();
  }
  
  return (
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>

      <BreadCrumb target="documents" action="create" />

      <form id="add_form" method="POST" enctype="multipart/form-data" action="" novalidate="">
        <div class="overview_form_block row marl justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="card-title text-center">
                  CREATE DOCUMENT
                </div>
                <div class="row marl">
                  <div class="col-md-12">
                    <TextInput  elementSize="col-md-12" labelName="Title" attrName="title" attrPlaceholder="Document Title" inputId="id_document_title" isRequired={true}
                                value={documentObject.title} getInputValue = {handleChange}/>
                    <FileInput  elementSize="col-md-12" labelName="Upload Document"  attrName="attachment"  attrPlaceholder=""  inputId="id_document_attachment"  
                                value={documentObject.attachment} getFile = {setFile}/>
                    <ReactSelect elementSize="col-md-12" labelName="Teams"/>                                        
                    <ReactSelect elementSize="col-md-12" labelName="Users" isDisabled={true}/>                                        
                    <ReactSelect elementSize="col-md-12" labelName="Share To"/>
                    <p></p>                    
                  </div>
                </div>
                <div class="row marl buttons_row form_btn_row text-center">
                  <button class="btn btn-default save mr-1" type="submit" id="submit_btn" onClick={saveDocument}>Save</button>
                  <a href="/documents/" class="btn btn-default clear" id="create_doc_cancel">Cancel</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}
