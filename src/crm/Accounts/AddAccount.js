import React, { Component } from 'react';
import {useEffect, useState} from 'react';
import Select from 'react-select';
import { ACCOUNTS } from '../../common/apiUrls';

const AddAccount = (props) => {
  
  const [accountObject, setAccountObject] = useState({
      name: '', website: '', phone: '', email: '', lead:[], 
      billing_address_line: '', billing_street: '', billing_postcode: '',
      billing_city: '', billing_state: '', billing_country: '',
      description: '', status: 'open',
      contacts: [] 
    });    
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  

  /**
   * @method      useEffect
   * @description updates the leads and contacts
   */

  useEffect(() => {
    let leadsArray = [];
    let contactsArray = [];
    props.leads.open_leads && props.leads.open_leads.map( lead => {
      console.log(lead);
      leadsArray.push({label: lead.title, value: lead.title, lead: lead});
    })
    setLeads(leadsArray);    
    props.contacts.contact_obj_list && props.contacts.contact_obj_list.map ( contact => {
      console.log(contact);
      contactsArray.push({label: contact.first_name, value: contact.first_name, id: contact.id, contact: contact});
    })
    setContacts(contactsArray);
  }, []);
  

  /**
   * @method      handleChange
   * @description updates the state property based on the name attribute
   */

  const handleChange = (e) => {
    console.log(e);
    setAccountObject({...accountObject, [e.target.name]: e.target.value})    
  }  


  /**
   * @method      updateContacts
   * @description updates the selected contact ids to accountObject
   */

  const updateContacts = (e) => {    
    let contactArray = [];
    console.log(e);
    e.map(contact => {
      contactArray.push(contact.id);
    })
    setAccountObject({...accountObject, contacts: contactArray});    
  }


  /**
   * @method      saveAccount
   * @description saves the account 
   */

  const saveAccount = (e) => { 
    e.preventDefault();
    let targetName = e.target.name;
    fetch(`${ACCOUNTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',      
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      },
      body: JSON.stringify({
        name: accountObject.name,
        website: accountObject.website,
        phone: accountObject.phone,
        email: accountObject.email,
        lead: accountObject.lead,
        billing_address_line: accountObject.billing_address_line,
        billing_street: accountObject.billing_street,
        billing_postcode: accountObject.billing_postcode, 
        billing_city: accountObject.billing_city,
        billing_state: accountObject.billing_state,
        billing_country: accountObject.billing_country,
        status: accountObject.status,
        contacts: accountObject.contacts,
        description: accountObject.description
      })
    })
    .then (res => res.json())
    .then (res => {
      console.log(res);
      if (!res.error) {
        if (targetName === 'save') props.history.push('/accounts');
      }
    });
  }

    return (
      <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/accounts/">Accounts</a></li>
            <li class="breadcrumb-item active">Create</li>
          </ol>
        </nav>
        <form id="formid" action="" method="POST" novalidate="" enctype="multipart/form-data">
          <div class="overview_form_block row marl justify-content-center">
            <div class="col-md-9">
              {/* card */}
              <div class="card">
                <div class="card-body">
                  <div class="card-title text-center">CREATE ACCOUNT</div>
                    <div className="row marl">
                      <div class="col-md-4">
                  <div class="filter_col col-md-12">
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="required">Name<span class="error_marker" style={{color:"red"}}>*</span></label>
                      <input type="text" name="name" class="form-control" placeholder="Name" required="" id="id_name"
                        onChange={handleChange}></input>
                      <span class="error" id="id__name"></span>
                    </div>
                  </div>
                  <div class="filter_col col-md-12">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Website</label>
                      <input type="url" name="website" class="form-control" placeholder="Website" id="id_website"
                        onChange={handleChange}></input>
                      <span class="error" id="id__website"></span>
                    </div>
                  </div>
                  <div class="filter_col col-md-12">
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="required">Phone<span class="error_marker" style={{color:"red"}}>*</span></label>
                      <input type="tel" name="phone" class="form-control" placeholder="+911234567890" required="" id="id_phone"
                        onChange={handleChange}></input>
                      <span class="error" id="id__phone"></span>
                    </div>
                  </div>
                  <div class="filter_col col-md-12">
                    <div class="form-group ">
                      <label for="exampleInputEmail1" class="required">Email
                        Address<span class="error_marker" style={{color:"red"}}>*</span></label>
                      <input type="email" name="email" class="form-control" placeholder="Email" required="" id="id_email"
                        onChange={handleChange}></input>
                      <span class="error" id="id__email"></span>
                    </div>
                  </div>
                  <div class="filter_col col-md-12">
                    <div class="form-group ">
                      <label for="exampleInputEmail1" class="required">Leads</label>                  
                      <Select
                        className="react_select"
                        options={leads}
                        onChange={(e) => setAccountObject({...accountObject, lead: e.lead.id})}                        
                        />
                      <span class="error" id="id__lead"></span>
                    </div>
                  </div>
                </div>                      
                      <div class="col-md-4">
                        <div class="filter_col billing_block col-md-12" style={{padding: "0px"}}>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Billing Address
                              <span class="error_marker" style={{color:"red"}}>*</span></label>
                            <input type="text" name="billing_address_line" class="form-control" placeholder="Address Line" required="" id="id_billing_address_line"
                              onChange={handleChange}></input>
                            <span class="error" id="id__billing_address_line"></span>
                          </div>
                          <div class="row" style={{marginTop: "10px"}}>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Street <span class="error_marker" style={{color:"red"}}>*</span></label>
                                <input type="text" name="billing_street" class="form-control" placeholder="Street" required="" id="id_billing_street"
                                  onChange={handleChange}></input>
                                <span class="error" id="id__billing_street"></span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputEmail1">PostCode
                                  <span class="error_marker" style={{color:"red"}}>*</span></label>
                                <input type="text" name="billing_postcode" class="form-control" placeholder="Postcode" required="" id="id_billing_postcode"
                                  onChange={handleChange}></input>
                                <span class="error" id="id__billing_postcode"></span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputEmail1">City <span class="error_marker" style={{color:"red"}}>*</span></label>
                                <input type="text" name="billing_city" class="form-control" placeholder="City" required="" id="id_billing_city"
                                  onChange={handleChange}></input>
                                <span class="error" id="id__billing_city"></span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputEmail1">State <span class="error_marker" style={{color:"red"}}>*</span></label>
                                <input type="text" name="billing_state" class="form-control" placeholder="State" required="" id="id_billing_state"
                                  onChange={handleChange}></input>
                                <span class="error" id="id__billing_state"></span>
                              </div>
                            </div>
                            <div class="col-md-12" style={{marginTop: "10px"}}>
                              <div class="form-group">
                                <label for="exampleInputEmail1">Country <span class="error_marker" style={{color:"red"}}>*</span></label>
                                <select name="billing_country" class="form-control" placeholder="Billing country" required="" id="id_billing_country"
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
                                <span class="error" id="id__billing_country"></span>
                              </div>
                            </div>
                            <div class="filter_col col-md-12">
                              <div class="form-group ">
                                <label for="id_contacts" class="required">Contacts<span class="error_marker" style={{color:"red"}}>*</span></label>
                                <Select
                                  className="react_select"
                                  isMulti
                                  options={contacts}
                                  onChange={updateContacts}                                  
                                  />
                                <span class="error" id="id__contacts"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h6 style={{color:"white"}}>Copy Address</h6>
                        </div>
                      </div>
                      <div class="col-md-4">              
                        <div class="filter_col col-12" data-select2-id="10">
                          <div class="form-group">
                            <label for="id_sattus">Teams</label>
                            <Select
                                  className="react_select"/>                 
                            <span class="error" id="id__teams"></span>
                          </div>
                        </div>
                        <div class="filter_col col-12">
                          <div class="form-group">
                            <label for="id_sattus">Users</label>
                            <Select
                                  className="react_select"/>
                            <span className="error" id="id__teams"></span>
                          </div>
                        </div>              
                        <div class="filter_col col-12" data-select2-id="22">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Assign To</label>                                              
                            <Select
                                  className="react_select"/>
                            <span class="error" id="error_id_assigned_to"></span>                  
                          </div>
                        </div>
                        <div class="filter_col col-12">
                          <div class="form-group">
                            <label for="id_sattus">Status</label>
                            <select name="status" class="form-control" placeholder="Status" id="id_status"
                              onChange={handleChange}>
                              <option value="open">Open</option>
                              <option value="close">Close</option>
                            </select>
                            <span class="error"></span>
                          </div>
                        </div>
                        <div class="filter_col col-12">
                          <div class="form-group">
                            <label>Tags</label>
                            <div class="txt-box-div" id="tag-div">                              
                              <div id="tags_1_tagsinput" class="tagsinput" style={{width: "auto", minHeight: "100px", height: "100px"}}><div id="tags_1_addTag"><input id="tags_1_tag" value="" data-default="add a tag" style={{color: "rgb(102, 102, 102)", width: "68px"}}></input></div><div class="tags_clear"></div></div>
                            </div>
                          </div>
                        </div>
                        <div class="filter_col col-md-12">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Attachment</label>
                            <input type="file" name="account_attachment"></input>                  
                            <span class="error"></span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="row marl buttons_row form_btn_row text-center">
                          <button class="btn btn-default save mr-1" name="save" type="submit" id="call_save" onClick={saveAccount}>Save</button>
                          <a href="/accounts" class="btn btn-default clear" id="create_user_cancel">Cancel</a>
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