import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CONTACTS } from '../../common/apiUrls';
import {getApiResults} from '../Utilities';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import { countries, twoStatus } from '../optionsData';

function EditContact() {

  const [contactObject, setContactObject] = useState({
    first_name: '', last_name: '', phone: '', email: '',      
    address_line: '', street: '', city: '', state: '', postcode: '', country: '', 
    description: '', contact_attachment: '',
    errors: {}
  });

  useEffect(() => {
    getContact();
  },[]);

  const getContact = (e) => {
    let userId = window.location.pathname.split('/')[2];
    let contactsResults = getApiResults(`${CONTACTS}${userId}/`);
    console.log(contactsResults);
    contactsResults.then( result => {      
      setContactObject({...contactObject, 
        first_name: result.data.contact_obj.first_name,
        last_name: result.data.contact_obj.last_name,
        phone: result.data.contact_obj.phone,
        email: result.data.contact_obj.email,
        address_line: result.data.address_obj.address_line,
        street: result.data.address_obj.billing_street,
        postcode: result.data.address_obj.postcode,
        street: result.data.address_obj.street,
        city: result.data.address_obj.city,
        state: result.data.address_obj.state,
        country: result.data.address_obj.country,  
        description: result.data.contact_obj.description,

      }); 
    })
  }

  const [file, setFile] = useState([]);

  const handleChange = (e) => {    
    setContactObject({...contactObject, [e.target.name]: e.target.value})    
  }  

  const handlePhoneInput = (e) => {    
    setContactObject({...contactObject, phone: e});
  }

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  }

  const updateContact = (e) => {
    e.preventDefault();
    let userId = window.location.pathname.split('/')[2];
    let targetName = e.target.name;
    let phone = `+${contactObject.phone}`;

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      }
    }

    let data = {
        first_name: contactObject.first_name,
        last_name: contactObject.last_name,
        phone: phone,
        email: contactObject.email,
        address_line: contactObject.address_line,
        street: contactObject.street,
        city: contactObject.city,
        state: contactObject.state,
        postcode: contactObject.postcode,
        country: contactObject.country,
        description: contactObject.description,
    }
    
    axios.put(`${CONTACTS}${userId}/`, data, config).then ( res => {
      setContactObject({...contactObject, errors: res.data.contact_errors});
      console.log(res);
    })
  }

  console.log(contactObject);
  return(
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/contacts/">Contacts</a></li>
          <li className="breadcrumb-item active">Create</li>
        </ol>
      </nav>

      <form className="d-flex justify-content-center mt-2" id="add_form" method="POST" action="" novalidate="" enctype="multipart/form-data"
      >        
        <div className="col-md-9">
          <div className="card">
            <div className="card-body p-0">
              <div className="card-title text-center p-2 card-title-bg">
                CREATE CONTACT
              </div>

              <div className="row marl no-gutters justify-content-center mt-3">    
                <div className="col-md-4">
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <div className="row">
                      {/* First Name */}
                      <div className="filter_col col-md-6">
                        <div className="form-group mb-0">
                          <label for="exampleInputEmail" className="required">First Name<span className="error">*</span></label>
                          <input type="text" name="first_name" className="form-control" placeholder="First name" required="" 
                                id="id_first_name" 
                                value={contactObject.first_name}                               
                                onChange={handleChange}></input>
                          <span className="error errro_ft_sz">{contactObject.errors.first_name}</span>
                        </div>
                      </div>
                      {/* Last Name */}
                      <div className="filter_col col-md-6">
                        <div className="form-group mb-0">
                          <label for="exampleInputEmail1" className="required">Last Name<span className="error">*</span></label>
                          <input type="text" name="last_name" className="form-control" placeholder="Last name" required="" 
                                id="id_last_name"
                                value={contactObject.last_name}
                                onChange={handleChange}></input>
                          <span className="error errro_ft_sz">{contactObject.errors.last_name}</span>
                        </div>                     
                      </div>
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1" className="required">Phone<span className="error">*</span></label>                       
                        <PhoneInput className=""
                          country={'in'}                          
                          value={contactObject.phone}
                          onChange={handlePhoneInput}/>
                    <span className="error errro_ft_sz">{contactObject.errors.phone}</span>
                  </div>
                </div>
                {/* Email */}
                <div className="filter_col col-md-12">
                  <div className="form-group ">
                    <label for="exampleInputEmail1" className="required">Email
                      Address<span className="error">*</span></label>
                    <input type="email" name="email" className="form-control" placeholder="Email" required="" 
                           id="id_email"
                           value={contactObject.email}
                           onChange={handleChange}></input>
                    <span className="error errro_ft_sz">{contactObject.errors.email}</span>
                  </div>
                </div>
                {/* Teams */}
                <div className="filter_col col-12">
                  <div className="form-group">
                    <label for="id_status">Teams</label>
                    <Select
                      className="react_select"/>
                    <span className="error" id="id__teams"></span>
                  </div>
                </div>
                {/* Users */}
                <div className="filter_col col-12">
                  <div className="form-group">
                    <label for="id_status">Users</label>
                    <Select
                      className="react_select"
                      isDisabled="true"/>
                    <span className="error" id="id__teams"></span>
                  </div>
                </div>
              </div> 
                <div className="col-md-4">
                  {/* Assigned Users */}
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="id_status">Assigned Users</label>
                    <Select
                      className="react_select"
                      isMulti 
                      />
                    <span className="error"></span>
                  </div>
                </div>
                {/* Address */}
                <div className="filter_col col-md-12">
                  {/* Address Line */}
                  <div className="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input type="text" name="address_line" className="form-control" placeholder="Address Line" 
                           id="id_address_line"
                           value={contactObject.address_line}
                           onChange={handleChange}></input>
                    <span className="error"></span>
                  </div>
                  {/* Street */}
                  <input type="text" name="street" className="form-control" placeholder="Street" 
                         id="id_street"
                         value={contactObject.street}
                         onChange={handleChange}></input>
                  <span className="error"></span>
                  <div className="row mt-3">
                    {/* City */}
                    <div className="col-md-4">                        
                      <input type="text" name="city" className="form-control" placeholder="City" 
                             id="id_city"
                             value={contactObject.city}
                             onChange={handleChange}></input>
                      <span className="error"></span>
                    </div>
                    {/* State */}
                    <div className="col-md-4">
                      <input type="text" name="state" className="form-control" placeholder="State" 
                             id="id_state"
                             value={contactObject.state}
                             onChange={handleChange}></input>
                      <span className="error"></span>
                    </div>
                    {/* Postal Code */}
                    <div className="col-md-4">
                      <input type="text" name="postcode" className="form-control" placeholder="Postcode" 
                             id="id_postcode"
                             value={contactObject.postcode}
                             onChange={handleChange}></input>
                      <span className="error"></span>
                    </div>
                  </div>
                  {/* Country */}
                  <SelectComponent  elementSize="col-md-12" labelName="Country" attrName="country" attrPlaceholder="Country" attrId="id_billing_country"
                                              selectedValue={contactObject.country} getInputValue={handleChange} options={countries} isrequired={true}/>                                                      
                </div>
              </div>
                <div className="col-md-4">
                  {/* Descritpion */}
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <textarea name="description" class="form-control rounded-0" rows="6" placeholder="Description" 
                              id="id_description"
                              onChange={handleChange}></textarea>
                    <span class="error"></span>
                  </div>
                </div>
                {/* Attachement */}
                <div class="filter_col col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Attachment</label>
                    <input type="file" 
                           name="contact_attachment"
                           onChange={handleFileInput}></input>
                    <span class="error"></span>
                  </div>
                </div>
              </div>
                <div className="col-md-12">
                  <div className="row marl buttons_row text-center form_btn_row">
                    <button className="btn btn-default save update_data mr-2" name="save" type="button" onClick={updateContact}>Save</button>                                            
                    <button className="btn btn-success save savenew mr-2" name="saveAndNew" type="button" onClick={updateContact}>Save &amp; New</button>                      
                    <a href="/contacts" class="btn btn-default clear" id="create_contact_cancel">Cancel</a>
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

export default EditContact;