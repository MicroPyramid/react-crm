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
import TagsInput from '../UIComponents/Inputs/TagsInput';
import { countries } from '../optionsData';
import { statuses } from '../optionsData';
import { sources } from '../optionsData';
import { Validations } from './Validations';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { getApiResults, convertArrayToString} from '../Utilities';

export default function EditLead(props) {

  const [leadObject, setLeadObject] = useState({})
  const [tags, setTags] = useState([]);
  const [isValidations, setIsValidations] = useState('true');
  const [errors, setErrors] = useState({});
  const [tagErrorStyle, setTagErrorStyle] = useState(''); 
  const [invalidTag, setIsInvalidTag] = useState([]);

  let config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `jwt ${localStorage.getItem('Token')}`,
      company: `${localStorage.getItem('SubDomain')}`
    }
  }

  useEffect(() => {
    getLeadAndTags();    
  }, []);

  const getLeadAndTags = () => {
    let userId = window.location.pathname.split('/')[2];        
    let leadsResults = getApiResults(`${LEADS}${userId}/`);
    leadsResults.then(result => {            
      setLeadObject(result.data.lead_obj);
      let tagsArr = [];
      result.data.lead_obj.tags.map(tag => {
        tagsArr.push(tag.name);
      })
      setTags(tagsArr);
    })
  }
  
  const handleChange = (e) => {       
    setLeadObject({...leadObject, [e.target.name]: e.target.value});
  }

    const addTags = event => {        
    event.preventDefault();
    if (event.key === 'Enter' && event.target.value !== "") {       
      let val = event.target.value;             
      if(!tags.includes(val)) {        
        setTags([...tags, event.target.value]);         
        setIsInvalidTag('');                
      }
      event.target.value="";
    }    
  }

  const handleTag = (e) => {    
    e.preventDefault();
    if(tags.includes(e.target.value)) {
      setTagErrorStyle('invalid_tag');      
    }else{
      setTagErrorStyle('');      
    }    
    setIsInvalidTag(e.target.value);    
  }

  const removeTags = index => {        
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  }

  const updateLead = (e) => {

    e.preventDefault();
    let userId = window.location.pathname.split('/')[2];
    let targetName = e.target.name;    

    let data = {
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
        country: leadObject.country,
        tags: convertArrayToString(tags)
    }
    
    axios.put(`${LEADS}${userId}/`, data, config).then(res => res);    
  }
  
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
                  <ReactSelect elementSize="col-md-12" labelName="Teams"/>
                  <ReactSelect elementSize="col-md-12" labelName="Users" isDisabled={true}/>
                  <ReactSelect elementSize="col-md-12" labelName="Assigned Users"/>
                </div>
                <div className="col-md-4">
                  <SelectComponent  elementSize="col-md-12" labelName="Status" attrName="status" attrPlaceholder="Status" attrId="id_status"
                                    selectedValue={leadObject.status} getInputValue={handleChange} options={statuses}/>
                  <SelectComponent  elementSize="col-md-12" labelName="Source" attrName="source" attrPlaceholder="Source" attrId="id_source" 
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
                  <TagsInput tags={tags}
                        removeTags={(index) => removeTags(index)}
                        addTags={(event) => addTags(event)}
                        value={invalidTag}
                        handleTag={(e) => handleTag(e)}
                        tagErrorStyle={tagErrorStyle}/>
                </div>
                <br></br>

                <div class="col-md-12">
                  <div class="row marl buttons_row text-center form_btn_row">
                    <button class="btn btn-default save mr-1" type="button" id="submit_btn"
                      onClick={updateLead}>Save</button>                                                        
                    <Link to="/leads" className="btn btn-default clear">Cancel</Link>
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
