import React, { useState } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CONTACTS } from '../../common/apiUrls';
import axios from 'axios';
import { Validations } from './Validations';

function AddContact(props) {
  
  const [contactObject, setContactObject] = useState({
    first_name: '', last_name: '', phone: '', email: '',      
    address_line: '', street: '', city: '', state: '', postcode: '', country: '', 
    description: '', contact_attachment: '',
    errors: {}
  });
  const [file, setFile] = useState([]);
  const [isValidationsPassed, setIsValidationsPassed] = useState(true);

  const handleChange = (e) => {    
    setContactObject({...contactObject, [e.target.name]: e.target.value})    
  }  

  const handlePhoneInput = (e) => {    
    setContactObject({...contactObject, phone: e});
  }

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  }

  const saveContact = (e) => {
    e.preventDefault();
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

    let validateData = {
        first_name: contactObject.first_name,
        last_name: contactObject.last_name,
        email: contactObject.email,
        phone: contactObject.phone
    }
    
    let validationResults = Validations(validateData);
    setContactObject({...contactObject, errors: validationResults});

    for (let i in validationResults) {      
      if (validationResults[i].length > 0) {
        setIsValidationsPassed(false);
          break;
      }
    }
    
    if (isValidationsPassed){
      axios.post(`${CONTACTS}`, data, config)
          .then ( res =>  res)
          .catch(err => err);
    }

    
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
                  <div className="col-md-12 p-0" style={{marginTop: '10px'}}>
                    <div className="form-group ">
                        <label for="exampleInputEmail1">Country <span className="error_marker" style={{color: "red"}}></span></label>                          
                        <select name="country" className="form-control rounded-0" placeholder="ountry" required="" id="id_country" 
                                        onChange={handleChange}>
                                                      <option value="" selected="">--Country--</option>
                                                      <option value="GB">United Kingdom</option>
                                                      <option value="AF">Afghanistan</option>
                                                      <option value="AX">Aland Islands</option>
                                                      <option value="AL">Albania</option>
                                                      <option value="DZ">Algeria</option>
                                                      <option value="AS">American Samoa</option>
                                                      <option value="AD">Andorra</option>
                                                      <option value="AO">Angola</option>
                                                      <option value="AI">Anguilla</option>
                                                      <option value="AQ">Antarctica</option>
                                                      <option value="AG">Antigua and Barbuda</option>
                                                      <option value="AR">Argentina</option>
                                                      <option value="AM">Armenia</option>
                                                      <option value="AW">Aruba</option>
                                                      <option value="AU">Australia</option>
                                                      <option value="AT">Austria</option>
                                                      <option value="AZ">Azerbaijan</option>
                                                      <option value="BS">Bahamas</option>
                                                      <option value="BH">Bahrain</option>
                                                      <option value="BD">Bangladesh</option>
                                                      <option value="BB">Barbados</option>
                                                      <option value="BY">Belarus</option>
                                                      <option value="BE">Belgium</option>
                                                      <option value="BZ">Belize</option>
                                                      <option value="BJ">Benin</option>
                                                      <option value="BM">Bermuda</option>
                                                      <option value="BT">Bhutan</option>
                                                      <option value="BO">Bolivia</option>
                                                      <option value="BA">Bosnia and Herzegovina</option>
                                                      <option value="BW">Botswana</option>
                                                      <option value="BV">Bouvet Island</option>
                                                      <option value="BR">Brazil</option>
                                                      <option value="IO">British Indian Ocean Territory</option>
                                                      <option value="BN">Brunei Darussalam</option>
                                                      <option value="BG">Bulgaria</option>
                                                      <option value="BF">Burkina Faso</option>
                                                      <option value="BI">Burundi</option>
                                                      <option value="KH">Cambodia</option>
                                                      <option value="CM">Cameroon</option>
                                                      <option value="CA">Canada</option>
                                                      <option value="CV">Cape Verde</option>
                                                      <option value="KY">Cayman Islands</option>
                                                      <option value="CF">Central African Republic</option>
                                                      <option value="TD">Chad</option>
                                                      <option value="CL">Chile</option>
                                                      <option value="CN">China</option>
                                                      <option value="CX">Christmas Island</option>
                                                      <option value="CC">Cocos (Keeling) Islands</option>
                                                      <option value="CO">Colombia</option>
                                                      <option value="KM">Comoros</option>
                                                      <option value="CG">Congo</option>
                                                      <option value="CD">Congo, The Democratic Republic of the</option>
                                                      <option value="CK">Cook Islands</option>
                                                      <option value="CR">Costa Rica</option>
                                                      <option value="CI">Cote d'Ivoire</option>
                                                      <option value="HR">Croatia</option>
                                                      <option value="CU">Cuba</option>
                                                      <option value="CY">Cyprus</option>
                                                      <option value="CZ">Czech Republic</option>
                                                      <option value="DK">Denmark</option>
                                                      <option value="DJ">Djibouti</option>
                                                      <option value="DM">Dominica</option>
                                                      <option value="DO">Dominican Republic</option>
                                                      <option value="EC">Ecuador</option>
                                                      <option value="EG">Egypt</option>
                                                      <option value="SV">El Salvador</option>
                                                      <option value="GQ">Equatorial Guinea</option>
                                                      <option value="ER">Eritrea</option>
                                                      <option value="EE">Estonia</option>
                                                      <option value="ET">Ethiopia</option>
                                                      <option value="FK">Falkland Islands (Malvinas)</option>
                                                      <option value="FO">Faroe Islands</option>
                                                      <option value="FJ">Fiji</option>
                                                      <option value="FI">Finland</option>
                                                      <option value="FR">France</option>
                                                      <option value="GF">French Guiana</option>
                                                      <option value="PF">French Polynesia</option>
                                                      <option value="TF">French Southern Territories</option>
                                                      <option value="GA">Gabon</option>
                                                      <option value="GM">Gambia</option>
                                                      <option value="GE">Georgia</option>
                                                      <option value="DE">Germany</option>
                                                      <option value="GH">Ghana</option>
                                                      <option value="GI">Gibraltar</option>
                                                      <option value="GR">Greece</option>
                                                      <option value="GL">Greenland</option>
                                                      <option value="GD">Grenada</option>
                                                      <option value="GP">Guadeloupe</option>
                                                      <option value="GU">Guam</option>
                                                      <option value="GT">Guatemala</option>
                                                      <option value="GG">Guernsey</option>
                                                      <option value="GN">Guinea</option>
                                                      <option value="GW">Guinea-Bissau</option>
                                                      <option value="GY">Guyana</option>
                                                      <option value="HT">Haiti</option>
                                                      <option value="HM">Heard Island and McDonald Islands</option>
                                                      <option value="VA">Holy See (Vatican City State)</option>
                                                      <option value="HN">Honduras</option>
                                                      <option value="HK">Hong Kong</option>
                                                      <option value="HU">Hungary</option>
                                                      <option value="IS">Iceland</option>
                                                      <option value="IN">India</option>
                                                      <option value="ID">Indonesia</option>
                                                      <option value="IR">Iran, Islamic Republic of</option>
                                                      <option value="IQ">Iraq</option>
                                                      <option value="IE">Ireland</option>
                                                      <option value="IM">Isle of Man</option>
                                                      <option value="IL">Israel</option>
                                                      <option value="IT">Italy</option>
                                                      <option value="JM">Jamaica</option>
                                                      <option value="JP">Japan</option>
                                                      <option value="JE">Jersey</option>
                                                      <option value="JO">Jordan</option>
                                                      <option value="KZ">Kazakhstan</option>
                                                      <option value="KE">Kenya</option>
                                                      <option value="KI">Kiribati</option>
                                                      <option value="KP">Korea, Democratic People's Republic of</option>
                                                      <option value="KR">Korea, Republic of</option>
                                                      <option value="KW">Kuwait</option>
                                                      <option value="KG">Kyrgyzstan</option>
                                                      <option value="LA">Lao People's Democratic Republic</option>
                                                      <option value="LV">Latvia</option>
                                                      <option value="LB">Lebanon</option>
                                                      <option value="LS">Lesotho</option>
                                                      <option value="LR">Liberia</option>
                                                      <option value="LY">Libyan Arab Jamahiriya</option>
                                                      <option value="LI">Liechtenstein</option>
                                                      <option value="LT">Lithuania</option>
                                                      <option value="LU">Luxembourg</option>
                                                      <option value="MO">Macao</option>
                                                      <option value="MK">Macedonia, The Former Yugoslav Republic of</option>
                                                      <option value="MG">Madagascar</option>
                                                      <option value="MW">Malawi</option>
                                                      <option value="MY">Malaysia</option>
                                                      <option value="MV">Maldives</option>
                                                      <option value="ML">Mali</option>
                                                      <option value="MT">Malta</option>
                                                      <option value="MH">Marshall Islands</option>
                                                      <option value="MQ">Martinique</option>
                                                      <option value="MR">Mauritania</option>
                                                      <option value="MU">Mauritius</option>
                                                      <option value="YT">Mayotte</option>
                                                      <option value="MX">Mexico</option>
                                                      <option value="FM">Micronesia, Federated States of</option>
                                                      <option value="MD">Moldova</option>
                                                      <option value="MC">Monaco</option>
                                                      <option value="MN">Mongolia</option>
                                                      <option value="ME">Montenegro</option>
                                                      <option value="MS">Montserrat</option>
                                                      <option value="MA">Morocco</option>
                                                      <option value="MZ">Mozambique</option>
                                                      <option value="MM">Myanmar</option>
                                                      <option value="NA">Namibia</option>
                                                      <option value="NR">Nauru</option>
                                                      <option value="NP">Nepal</option>
                                                      <option value="NL">Netherlands</option>
                                                      <option value="AN">Netherlands Antilles</option>
                                                      <option value="NC">New Caledonia</option>
                                                      <option value="NZ">New Zealand</option>
                                                      <option value="NI">Nicaragua</option>
                                                      <option value="NE">Niger</option>
                                                      <option value="NG">Nigeria</option>
                                                      <option value="NU">Niue</option>
                                                      <option value="NF">Norfolk Island</option>
                                                      <option value="MP">Northern Mariana Islands</option>
                                                      <option value="NO">Norway</option>
                                                      <option value="OM">Oman</option>
                                                      <option value="PK">Pakistan</option>
                                                      <option value="PW">Palau</option>
                                                      <option value="PS">Palestinian Territory, Occupied</option>
                                                      <option value="PA">Panama</option>
                                                      <option value="PG">Papua New Guinea</option>
                                                      <option value="PY">Paraguay</option>
                                                      <option value="PE">Peru</option>
                                                      <option value="PH">Philippines</option>
                                                      <option value="PN">Pitcairn</option>
                                                      <option value="PL">Poland</option>
                                                      <option value="PT">Portugal</option>
                                                      <option value="PR">Puerto Rico</option>
                                                      <option value="QA">Qatar</option>
                                                      <option value="RE">Reunion</option>
                                                      <option value="RO">Romania</option>
                                                      <option value="RU">Russian Federation</option>
                                                      <option value="RW">Rwanda</option>
                                                      <option value="BL">Saint Barthelemy</option>
                                                      <option value="SH">Saint Helena</option>
                                                      <option value="KN">Saint Kitts and Nevis</option>
                                                      <option value="LC">Saint Lucia</option>
                                                      <option value="MF">Saint Martin</option>
                                                      <option value="PM">Saint Pierre and Miquelon</option>
                                                      <option value="VC">Saint Vincent and the Grenadines</option>
                                                      <option value="WS">Samoa</option>
                                                      <option value="SM">San Marino</option>
                                                      <option value="ST">Sao Tome and Principe</option>
                                                      <option value="SA">Saudi Arabia</option>
                                                      <option value="SN">Senegal</option>
                                                      <option value="RS">Serbia</option>
                                                      <option value="SC">Seychelles</option>
                                                      <option value="SL">Sierra Leone</option>
                                                      <option value="SG">Singapore</option>
                                                      <option value="SK">Slovakia</option>
                                                      <option value="SI">Slovenia</option>
                                                      <option value="SB">Solomon Islands</option>
                                                      <option value="SO">Somalia</option>
                                                      <option value="ZA">South Africa</option>
                                                      <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                      <option value="ES">Spain</option>
                                                      <option value="LK">Sri Lanka</option>
                                                      <option value="SD">Sudan</option>
                                                      <option value="SR">Suriname</option>
                                                      <option value="SJ">Svalbard and Jan Mayen</option>
                                                      <option value="SZ">Swaziland</option>
                                                      <option value="SE">Sweden</option>
                                                      <option value="CH">Switzerland</option>
                                                      <option value="SY">Syrian Arab Republic</option>
                                                      <option value="TW">Taiwan, Province of China</option>
                                                      <option value="TJ">Tajikistan</option>
                                                      <option value="TZ">Tanzania, United Republic of</option>
                                                      <option value="TH">Thailand</option>
                                                      <option value="TL">Timor-Leste</option>
                                                      <option value="TG">Togo</option>
                                                      <option value="TK">Tokelau</option>
                                                      <option value="TO">Tonga</option>
                                                      <option value="TT">Trinidad and Tobago</option>
                                                      <option value="TN">Tunisia</option>
                                                      <option value="TR">Turkey</option>
                                                      <option value="TM">Turkmenistan</option>
                                                      <option value="TC">Turks and Caicos Islands</option>
                                                      <option value="TV">Tuvalu</option>
                                                      <option value="UG">Uganda</option>
                                                      <option value="UA">Ukraine</option>
                                                      <option value="AE">United Arab Emirates</option>
                                                      <option value="US">United States</option>
                                                      <option value="UM">United States Minor Outlying Islands</option>
                                                      <option value="UY">Uruguay</option>
                                                      <option value="UZ">Uzbekistan</option>
                                                      <option value="VU">Vanuatu</option>
                                                      <option value="VE">Venezuela</option>
                                                      <option value="VN">Viet Nam</option>
                                                      <option value="VG">Virgin Islands, British</option>
                                                      <option value="VI">Virgin Islands, U.S.</option>
                                                      <option value="WF">Wallis and Futuna</option>
                                                      <option value="EH">Western Sahara</option>
                                                      <option value="YE">Yemen</option>
                                                      <option value="ZM">Zambia</option>
                                                      <option value="ZW">Zimbabwe</option>
                                                  </select>                         
                        <span className="error" id="id__billing_country"></span>
                    </div>
                  </div>                    
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
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Attachment</label>
                    <input type="file" 
                           name="contact_attachment"
                           onChange={handleFileInput}></input>
                    <span className="error"></span>
                  </div>
                </div>
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