import React, { useState, useEffect } from 'react';
import {LEADS} from '../../common/apiUrls';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import TextInput from '../UIComponents/Inputs/TextInput';
import PhoneInput from '../UIComponents/Inputs/PhoneInput';
import FileInput from '../UIComponents/Inputs/FileInput';
import EmailInput from '../UIComponents/Inputs/EmailInput';
import TextArea from '../UIComponents/Inputs/TextArea';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import { countries } from '../optionsData';
import { statuses } from '../optionsData';
import { sources } from '../optionsData';
import { Validations } from './Validations';

export default function EditLead(props) {

  const [leadObject, setLeadObject] = useState({})
  const [tags, setTags] = useState([]);
  const [isValidations, setIsValidations] = useState('true');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let userId = window.location.pathname.split('/')[2];
    
    fetch(`${LEADS}${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`,
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setLeadObject(res.lead_obj);
    })
  }, []);

  const handleChange = (e) => {   
    console.log(e.target.value);
    setLeadObject({...leadObject, [e.target.name]: e.target.value});
  }

  const updateLead = (e) => {
    e.preventDefault();
    let userId = window.location.pathname.split('/')[2];
    let targetName = e.target.name;
    fetch(`${LEADS}${userId}/`, {
      method: 'PUT',
      headers: {        
        'Content-type': 'application/json',        
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      },
      body: JSON.stringify({
        first_name: leadObject.first_name,
        last_name: leadObject.last_name,
        account_name: leadObject.account_name,
        title: leadObject.title,
        email: leadObject.email,
        phone: leadObject.phone,
        website: leadObject.website,
        description: leadObject.description,
        status: leadObject.status,        
        source: leadObject.source,
        address_line: leadObject.address_line,
        street: leadObject.street,
        city: leadObject.city,
        state: leadObject.state,
        postcode: leadObject.postcode,
        country: leadObject.country
      })
    })
    .then (res => res.json())
    .then (res => {
      console.log(res);
      if (!res.errors && !errors) {
        if (targetName === 'save') props.history.push('/accounts');
        if(targetName === 'saveAndNew') window.location.reload();
      }      
    });
  }
  
  console.log(leadObject);
  return (
      
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      <BreadCrumb target="leads" action="edit" />
      <form className="d-flex justify-content-center mt-2" id="add_form" method="POST" action="" novalidate="" enctype="multipart/form-data">
        <div className="col-md-9">
          <div className="card">
            <div className="card-body p-0">
              
              <div className="card-title text-center p-2 card-title-bg">
                EDIT LEAD
              </div>
              <div className="row marl no-gutters justify-content-center mt-3">

                <div className="col-md-4">
                  <div className="filter_col col-md-12">
                    <div className="form-group m-0">
                      <div className="row">
                          <TextInput  elementSize="col-md-6" labelName="First Name" attrName="first_name"
                                      attrPlaceholder="First Name" inputId="id_first_name"                                       
                                      value={leadObject.first_name} getInputValue={handleChange} isRequired={true} error={errors.first_name}/>
                          <TextInput  elementSize="col-md-6"  labelName="Last Name"  attrName="last_name"  
                                      attrPlaceholder="Last Name"  inputId="id_last_name"  
                                      value={leadObject.last_name} getInputValue={handleChange} isRequired={true} error={errors.last_name}/>
                      </div>
                    </div>
                  </div>
                  <TextInput  elementSize="col-md-12"  labelName="Account Name"  attrName="account_name"  attrPlaceholder="Account Name"  inputId="id_account_name"  
                              value={leadObject.account_name} getInputValue={handleChange}/>
                  <TextInput  elementSize="col-md-12"  labelName="Title"  attrName="title"  attrPlaceholder="Title"  inputId="id_title"  
                              value={leadObject.title} getInputValue={handleChange} isRequired={true} error={errors.title}/>
                  <PhoneInput elementSize="col-md-12"  labelName="Phone"  attrName="phone"  attrPlaceholder="+911234567890"  inputId="id_phone"  
                              value={leadObject.phone} getInputValue={handleChange} isRequired={true} error={errors.phone}/>
                  <EmailInput elementSize="col-md-12"  labelName="Email"  attrName="email"  attrPlaceholder="Email"  inputId="id_email"  
                              value={leadObject.email} getInputValue={handleChange} isRequired={true} error={errors.email}/>                  
                  <FileInput  elementSize="col-md-12"  labelName="Attachment"  attrName="attachment"  attrPlaceholder=""  inputId="lead_attachment"  
                              getInputValue={handleChange}/>
                </div>
                <div className="col-md-4">
                  <TextInput  elementSize="col-md-12"  labelName="Website"  attrName="website"  attrPlaceholder="Website"  inputId="id_website"  
                              value={leadObject.website} getInputValue={handleChange}/>
                  <TextArea elementSize="col-md-12"  labelName="Description"  attrName="description"  attrPlaceholder="Description"  inputId="id_description"  rows="6" 
                              value={leadObject.description} getInputValue={handleChange}/>
                  <ReactSelect labelName="Teams"/>
                  <ReactSelect labelName="Users" isDisabled={true}/>
                  <ReactSelect labelName="Assigned Users"/>
                </div>
                <div className="col-md-4">
                  <SelectComponent  labelName="Status" attrName="status" attrPlaceholder="Status" attrId="id_status"
                                    selectedValue={leadObject.status} getInputValue={handleChange} options={statuses}/>
                  <SelectComponent  labelName="Source" attrName="source" attrPlaceholder="Source" attrId="id_source" 
                                    selectedValue={leadObject.source} getInputValue={handleChange} options={sources} isRequired={true}/>
                  <div className="address_group">
                    <TextInput  elementSize="col-md-12"  labelName="Address"  attrName="address_line"  attrPlaceholder="Address Line"  inputId="id_address_line"  
                                value={leadObject.address_line} getInputValue={handleChange}/>  
                    <TextInput  elementSize="col-md-12"  labelName=""  attrName="street"  attrPlaceholder="Street"  inputId="id_street"  
                                value={leadObject.street} getInputValue={handleChange}/>
                    <div className="filter_col col-md-12">
                      <div className="row">
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="city"  attrPlaceholder="City"  inputId="id_city"  
                                    value={leadObject.city} getInputValue={handleChange}/>
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="state"  attrPlaceholder="State"  inputId="id_state"  
                                    value={leadObject.state} getInputValue={handleChange}/>
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="postcode"  attrPlaceholder="Postcode"  inputId="id_postcode"  
                                    value={leadObject.postcode} getInputValue={handleChange}/>
                      </div>
                      <SelectComponent  labelName="" attrName="country" attrPlaceholder="Billing country" attrId="id_billing_country" 
                                        selectedValue={leadObject.country} getInputValue={handleChange} options={countries}/>                                          
                  </div>
                  </div>
                  <div class="filter_col col-12">
                    <div class="form-group">
                      <label>Tags</label>
                      <div className="tags-input">                              
                        <ul></ul>
                        <input
                          className="tags-input__input"
                          type="text"                              
                          placeholder="add a tag"
                        />                              
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>

                <div class="col-md-12">
                  <div class="row marl buttons_row text-center form_btn_row">
                    <button class="btn btn-default save mr-1" type="button" id="submit_btn"
                      onClick={updateLead}>Save</button>                                                        
                    <a href="/leads/" class="btn btn-default clear" id="create_lead_cancel">Cancel</a>
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
