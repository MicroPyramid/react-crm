import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import TextInput from '../UIComponents/Inputs/TextInput';
import EmailInput from '../UIComponents/Inputs/EmailInput';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import TextArea from '../UIComponents/Inputs/TextArea';
import FileInput from '../UIComponents/Inputs/FileInput';
import 'react-phone-input-2/lib/style.css';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import { CONTACTS } from '../../common/apiUrls';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Validations } from './Validations';
import { countries } from '../optionsData';

function AddContact(props) {
  
  const [contactObject, setContactObject] = useState({
    first_name: '', last_name: '', phone: '', email: '',      
    address_line: '', street: '', city: '', state: '', postcode: '', country: '', 
    description: '', contact_attachment: '',
    errors: {}
  });
  const [file, setFile] = useState([]);  

  const handleChange = (e) => {    
    setContactObject({...contactObject, [e.target.name]: e.target.value})    
  }  

  const handlePhoneInput = (e) => {    
    setContactObject({...contactObject, phone: e});
  }

  const fileUpload = (e) => {       
    setFile(e.target.files[0]);
  }

  const saveContact = (e) => {
    e.preventDefault();
    let targetName = e.target.name;        

    let config = {
      headers: {
        'Content-Type': 'application/json',        
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      }
    }    

    const formData = new FormData();
    formData.append("first_name", contactObject.first_name);
    formData.append("last_name", contactObject.last_name);
    formData.append("phone", '+'+contactObject.phone);
    formData.append("email", contactObject.email);
    formData.append("address_line", contactObject.address_line);
    formData.append("street", contactObject.street);
    formData.append("postcode", contactObject.postcode);
    formData.append("city", contactObject.city);
    formData.append("state", contactObject.state);
    formData.append("country", contactObject.country);
    formData.append("description", contactObject.description);
    formData.append("account_attachment", file);    
    
    let validationResults = Validations(contactObject);
    setContactObject({...contactObject, errors: validationResults});

    let isValidationsPassed = true;
    for (let i in validationResults) {      
      if (validationResults[i].length > 0) {        
          isValidationsPassed = false;
          break;
      }
    }
    
    if (isValidationsPassed){
      axios.post(`${CONTACTS}`, formData, config)
          .then ( res =>  {            
            if(res.status === 200) {
              if(targetName === 'save') {
                props.history.push({
                  pathname: '/contacts/',
                  state: "contacts"
                })
              } else if (targetName === 'saveAndNew'){
                window.location.reload();
              }
            }
          })
          .catch(err => err);
    }    
  }    

  return(
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      <BreadCrumb target="contacts" action="create" />      
      <form className="d-flex justify-content-center mt-2" id="add_form" method="POST" action="" novalidate="" enctype="">        
        <div className="col-md-9">
          <div className="card">
            <div className="card-body p-0">
              <div className="card-title text-center p-2 card-title-bg">
                CREATE CONTACT
              </div>

              <div className="row marl no-gutters justify-content-center mt-3">    
                <div className="col-md-4">
                <div className="filter_col col-md-12">
                  <div className="form-group m-0">
                    <div className="row">                                            
                      <TextInput  elementSize="col-md-6" labelName="First Name" attrName="first_name" attrPlaceholder="First Name" inputId="id_first_name" 
                                    value={contactObject.first_name} getInputValue={handleChange}
                                    isRequired={true} error={contactObject.errors.first_name}/>
                      <TextInput  elementSize="col-md-6" labelName="Last Name" attrName="last_name" attrPlaceholder="Last Name" inputId="id_last_name" 
                                    value={contactObject.last_name} getInputValue={handleChange}
                                    isRequired={true} error={contactObject.errors.last_name}/>                                                                                
                    </div>
                  </div>
                </div>                
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1" className="required">Phone<span className="error">*</span></label>                       
                        <PhoneInput className=""
                          country={'in'}                          
                          onChange={handlePhoneInput}/>
                    <span className="error errro_ft_sz">{contactObject.errors.phone}</span>
                  </div>
                </div>                
                <EmailInput elementSize="col-md-12"  labelName="Email Address"  attrName="email"  attrPlaceholder="Email"  inputId="id_email"  
                                    value={contactObject.email} getInputValue={handleChange} error={contactObject.errors.email} isRequired={true}/>                                
                <ReactSelect elementSize="col-md-12" labelName="Teams"/>                
                <ReactSelect elementSize="col-md-12" labelName="Users" isDisabled={true}/>
              </div> 
                <div className="col-md-4">                  
                  <ReactSelect elementSize="col-md-12" labelName="Assigned Users"/>  
                  <div className="address_group">
                    <TextInput  elementSize="col-md-12"  labelName="Address"  attrName="address_line"  attrPlaceholder="Address Line"  inputId="id_address_line"  
                                value={contactObject.address_line} getInputValue={handleChange}/>  
                    <TextInput  elementSize="col-md-12"  labelName=""  attrName="street"  attrPlaceholder="Street"  inputId="id_street"  
                                value={contactObject.street} getInputValue={handleChange}/>
                    <div className="filter_col col-md-12">
                      <div className="row">
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="city"  attrPlaceholder="City"  inputId="id_city"  
                                    value={contactObject.city} getInputValue={handleChange}/>
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="state"  attrPlaceholder="State"  inputId="id_state"  
                                    value={contactObject.state} getInputValue={handleChange}/>
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="postcode"  attrPlaceholder="Postcode"  inputId="id_postcode"  
                                    value={contactObject.postcode} getInputValue={handleChange}/>                      
                      </div>
                      <SelectComponent  labelName="" attrName="country" attrPlaceholder="Billing country" attrId="id_billing_country" 
                                        value={contactObject.country} getInputValue={handleChange} options={countries}/>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <TextArea elementSize="col-md-12"  labelName="Description"  attrName="description"  attrPlaceholder="Description"  inputId="id_description"  rows="6" 
                            value={contactObject.description} getInputValue={handleChange}/>                                
                  <FileInput  elementSize="col-md-12" labelName="Attachment" attrName="contact_attachment" inputId="id_file" getFile={fileUpload}/>
              </div>
                <div className="col-md-12">
                  <div className="row marl buttons_row text-center form_btn_row">
                    <button className="btn btn-default save update_data mr-2" name="save" type="button" onClick={saveContact}>Save</button>                                            
                    <button className="btn btn-success save savenew mr-2" name="saveAndNew" type="button" onClick={saveContact}>Save &amp; New</button>                      
                    <Link to="/contacts" className="btn btn-default clear">Cancel</Link>
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

export default AddContact;