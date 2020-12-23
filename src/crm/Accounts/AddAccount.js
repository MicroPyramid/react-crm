import React, { Component } from 'react';
import {useEffect, useState} from 'react';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import TextInput from '../UIComponents/Inputs/TextInput';
import PhoneInput from '../UIComponents/Inputs/PhoneInput';
import FileInput from '../UIComponents/Inputs/FileInput';
import EmailInput from '../UIComponents/Inputs/EmailInput';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import TagsInput from '../UIComponents/Inputs/TagsInput';
import { ACCOUNTS, CONTACTS, LEADS } from '../../common/apiUrls';
import { Validations } from './Validations';
import { countries, twoStatus } from '../optionsData';
import { getApiResults, convertArrayToString } from '../Utilities';
import axios from 'axios';
import { getContactsForReactSelect, getLeadsForReactSelect } from '../network';

const AddAccount = (props) => {
  
  console.log(props);

  const [accountObject, setAccountObject] = useState({
      name: '', website: '', phone: '', email: '',
      billing_address_line: '', billing_street: '', billing_postcode: '',
      billing_city: '', billing_state: '', billing_country: '',
      status: 'open', lead:[], contacts: [], tags: []      
    });
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState('');
  const [isValidations, setIsValidations] = useState('true');
  const [errors, setErrors] = useState({});   
  const [tagErrorStyle, setTagErrorStyle] = useState(''); 
  const [invalidTag, setIsInvalidTag] = useState([]);    


  useEffect(() => {
    getContacts();
    getLeads();    
  }, []);

  const getContacts = () => {    
    let contactsResults = getApiResults(CONTACTS);
    let contactsArray = [];
    contactsResults.then( result => {
      result.data.contact_obj_list.map( contact => {
        contactsArray.push({label: contact.first_name, value: contact.first_name, id: contact.id});
      })
      setContacts(contactsArray);
    })}

  const getLeads = () => {
    let leadsResults = getApiResults(LEADS);    
    let mergedLeads, leadsArray = [];
    leadsResults.then( result => {
      mergedLeads = result.data.open_leads.concat(result.data.close_leads);
      mergedLeads.map(lead => leadsArray.push({label: lead.title, value: lead.title, id: lead.id}));
    })
    setLeads(leadsArray);
  }

  const handleChange = (e) => {    
    setAccountObject({...accountObject, [e.target.name]: e.target.value})
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
  
  const fileUpload = (e) => {       
    setFile(e.target.files[0]);
  }

  const saveAccount = (e) => { 
    e.preventDefault();    
    let targetName = e.target.name;
    
    // Validation
    let validationResults = Validations(accountObject);       

    setErrors(validationResults);
    for (let i in validationResults) {      
      if (validationResults[i].length > 0) {
          setIsValidations(false);
          break;
      }
    }      
    
    let config = {
      headers: {
        'Content-Type': 'application/json',          
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      }
    }                    

    const formData = new FormData();
    formData.append("name", accountObject.name);
    formData.append("website", accountObject.website);
    formData.append("phone", '+'+accountObject.phone);
    formData.append("email", accountObject.email);
    formData.append("lead", (accountObject.lead.id !== undefined) ? accountObject.lead.id : "");
    formData.append("billing_address_line", accountObject.billing_address_line);
    formData.append("billing_street", accountObject.billing_street);
    formData.append("billing_postcode", accountObject.billing_postcode);
    formData.append("billing_city", accountObject.billing_city);
    formData.append("billing_state", accountObject.billing_state);
    formData.append("billing_country", accountObject.billing_country);
    formData.append("status", accountObject.status);
    formData.append("tags", convertArrayToString(tags));    
    formData.append("contacts", convertArrayToString(
          accountObject.contacts ? accountObject.contacts.map(contact => contact.id) : []
          ));
    formData.append("account_attachment", file);
   

    if (isValidations) {            
      axios.post(`${ACCOUNTS}`, formData, config)
        .then(res => {
              console.log(res);
              if(!res.data.error) {
                setTimeout(() => { 
                  props.history.push({
                    pathname: '/accounts/',          
                    state: "accounts"
                  }, 500)
                })
              }
            })
      }        

  }  

    return (
      <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>        
        <BreadCrumb target="accounts" action="create" />
        <form id="formid" action="" method="POST" novalidate="" enctype="multipart/form-data">        
          <div className="overview_form_block row marl justify-content-center">
            <div className="col-md-9">
              {/* card */}
              <div className="card">
                <div className="card-body">
                  <div className="card-title text-center">CREATE ACCOUNT</div>
                    <div className="row marl">
                      <div className="col-md-4">
                        <TextInput  elementSize="col-md-12" labelName="Name" attrName="name" attrPlaceholder="Name" inputId="id_name" 
                                    value={accountObject.name} getInputValue={handleChange} 
                                    isRequired={true} error={errors.name}/>
                        <TextInput  elementSize="col-md-12" labelName="Website" attrName="website" attrPlaceholder="Website" inputId="id_website" 
                                    value={accountObject.website} getInputValue={handleChange} error={errors.website}/>
                        <PhoneInput elementSize="col-md-12" labelName="Phone" attrName="phone" attrPlaceholder="+911234567890" inputId="id_phone" 
                                    value={accountObject.phone} getInputValue={handleChange} isRequired={true} error={errors.phone}/>                                                     
                        <EmailInput elementSize="col-md-12"  labelName="Email"  attrName="email"  attrPlaceholder="Email"  inputId="id_email"  
                                    value={accountObject.email} getInputValue={handleChange} error={errors.email} isRequired={true}/>
                        <ReactSelect elementSize="col-md-12" labelName="Leads" options={leads} value={accountObject.lead} isClearable={true} getChangedValue={(e) => setAccountObject({...accountObject, lead: e})}/>
                      </div>
                      <div className="col-md-4">
                        <div className="filter_col billing_block col-md-12" style={{padding: "0px"}}>
                          <div className="row">
                          <TextInput elementSize="col-md-12" labelName="Billing Address" attrName="billing_address_line" attrPlaceholder="Address Line" inputId="id_billing_address_line" 
                                    value={accountObject.billing_address_line} getInputValue={handleChange} isRequired={true} error={errors.billing_address_line}/>                                    
                            <TextInput elementSize="col-md-6" labelName="Street" attrName="billing_street" attrPlaceholder="Street" inputId="id_billing_street" 
                                    value={accountObject.billing_street} getInputValue={handleChange} isRequired={true} error={errors.billing_street}/>
                            <TextInput elementSize="col-md-6" labelName="Postcode" attrName="billing_postcode" attrPlaceholder="Postcode" inputId="id_billing_postcode" 
                                    value={accountObject.billing_postcode} getInputValue={handleChange} isRequired={true} error={errors.billing_postcode}/>
                            <TextInput elementSize="col-md-6" labelName="City" attrName="billing_city" attrPlaceholder="City" inputId="id_billing_city" 
                                    value={accountObject.billing_city} getInputValue={handleChange} isRequired={true} error={errors.billing_city}/>
                            <TextInput elementSize="col-md-6" labelName="State" attrName="billing_state" attrPlaceholder="State" inputId="id_billing_state" 
                                    value={accountObject.billing_state} getInputValue={handleChange} isRequired={true} error={errors.billing_state}/>
                            <SelectComponent  elementSize="col-md-12" labelName="Country" attrName="billing_country" attrPlaceholder="Country" attrId="id_billing_country" 
                                        value={accountObject.country} getInputValue={handleChange} options={countries} isRequired={true} error={errors.billing_country}/>                            
                            <ReactSelect  elementSize="col-md-12" labelName="Contacts" isMulti={true} options={contacts}
                                          value={accountObject.contacts} getChangedValue={(e) => setAccountObject({...accountObject, contacts: e})} isRequired={true} error={errors.contacts}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <ReactSelect elementSize="col-md-12" labelName="Teams"/>
                        <ReactSelect elementSize="col-md-12" labelName="Users" isDisabled={true}/>
                        <ReactSelect elementSize="col-md-12" labelName="Assigned To"/>
                        <SelectComponent elementSize="col-md-12" labelName="Status" attrName="status" attrPlaceholder="Status" attrId="id_status" 
                                          value={accountObject.status} getInputValue={handleChange} options={twoStatus}/>                        
                        <TagsInput tags={tags}
                              removeTags={(index) => removeTags(index)}
                              addTags={(event) => addTags(event)}
                              value={invalidTag}
                              handleTag={(e) => handleTag(e)}
                              tagErrorStyle={tagErrorStyle}/>
                        <FileInput  elementSize="col-md-12" labelName="Attachment" attrName="account_attachment" inputId="id_file"  
                                    getFile={fileUpload}/>
                      </div>
                      <div className="col-md-12">
                        <div className="row marl buttons_row form_btn_row text-center">
                          <button className="btn btn-default save mr-1" name="save" type="button" id="call_save" onClick={saveAccount}>Save</button>                                                    
                          <a href="/accounts" className="btn btn-default clear" id="create_user_cancel">Cancel</a>                          
                        </div>
                      </div>
                    </div>
                  </div>
                {/* end of card body */}
              </div>
              {/* end of card */}
            </div>
          </div>
        </form>
      </div>
    )
  }

  export default AddAccount;