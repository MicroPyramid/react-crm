import React, { useState } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import FileInput from '../UIComponents/Inputs/FileInput';
import 'react-phone-input-2/lib/style.css';
import { CONTACTS } from '../../common/apiUrls';
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
            console.log(res);
            if(res.status === 200) {
              props.history.push({
                pathname: '/contacts/',
                state: "contacts"
              })
            }
          })
          .catch(err => err);
    }    
  }    

  return(
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/contacts/">Contacts</a></li>
          <li className="breadcrumb-item active">Create</li>
        </ol>
      </nav>

      <form className="d-flex justify-content-center mt-2" id="add_form" method="POST" action="" novalidate="" enctype=""
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
                           onChange={handleChange}></input>
                    <span className="error"></span>
                  </div>
                  {/* Street */}
                  <input type="text" name="street" className="form-control" placeholder="Street" 
                         id="id_street"
                         onChange={handleChange}></input>
                  <span className="error"></span>
                  <div className="row mt-3">
                    {/* City */}
                    <div className="col-md-4">                        
                      <input type="text" name="city" className="form-control" placeholder="City" 
                             id="id_city"
                             onChange={handleChange}></input>
                      <span className="error"></span>
                    </div>
                    {/* State */}
                    <div className="col-md-4">
                      <input type="text" name="state" className="form-control" placeholder="State" 
                             id="id_state"
                             onChange={handleChange}></input>
                      <span className="error"></span>
                    </div>
                    {/* Postal Code */}
                    <div className="col-md-4">
                      <input type="text" name="postcode" className="form-control" placeholder="Postcode" 
                             id="id_postcode"
                             onChange={handleChange}></input>
                      <span className="error"></span>
                    </div>
                  </div>
                  {/* Country */}
                
                  <SelectComponent  elementSize="col-md-12" labelName="Country" attrName="country" attrPlaceholder="Country" attrId="id_country" 
                                        value={contactObject.country} getInputValue={handleChange} options={countries} isRequired={true} error={contactObject.errors.country}/>
                </div>
              </div>
                <div className="col-md-4">
                  {/* Descritpion */}
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <textarea name="description" className="form-control rounded-0 descripton-text" rows="6" placeholder="Description" 
                              id="id_description"
                              onChange={handleChange}></textarea>
                    <span className="error"></span>
                  </div>
                </div>
                {/* Attachement */}
                <FileInput  elementSize="col-md-12" labelName="Attachment" attrName="contact_attachment" inputId="id_file"  
                                    getFile={fileUpload}/>
              </div>
                <div className="col-md-12">
                  <div className="row marl buttons_row text-center form_btn_row">
                    <button className="btn btn-default save update_data mr-2" name="save" type="button" onClick={saveContact}>Save</button>                                            
                    <button className="btn btn-success save savenew mr-2" name="saveAndNew" type="button" onClick={saveContact}>Save &amp; New</button>                      
                    <a href="/contacts" className="btn btn-default clear" id="create_contact_cancel">Cancel</a>
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