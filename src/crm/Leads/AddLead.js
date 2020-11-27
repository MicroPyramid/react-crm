import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {LEADS} from '../../common/apiUrls';

export default function AddLead() {
  
  const [leadObject, setLeadObject] = useState({
    first_name: '', last_name: '', account_name: '', title: '',
    phone: '', email: '', attachment: '',
    website: '', description: '', teams: [], users: [], assigned_users: [],
    status: '', source: '',
    address_line: '', street: '', postcode: '',
    city: '', state: '', country: '',    
  })
  const [tags, setTags] = useState([]);

  const handleChange = (e) => {    
    setLeadObject({...leadObject, [e.target.name]: e.target.value});
  }

  const saveLead = (e) => {
    e.preventDefault();
    const data = new FormData();    
    data.append('attachement', leadObject.attachment);

    fetch(`${LEADS}`, {
      method: 'POST',
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
    .then (res => console.log(res));
  }

  return (
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/leads/">Leads</a></li>
          <li className="breadcrumb-item active">Create</li>
        </ol>
      </nav>

      <form className="d-flex justify-content-center mt-2" id="add_form" method="POST" action="" novalidate="" enctype="multipart/form-data">
        <div className="col-md-9">
          <div className="card">
            <div className="card-body p-0">
              
              <div className="card-title text-center p-2 card-title-bg">
                CREATE LEAD
              </div>

              <div className="row marl no-gutters justify-content-center mt-3">

                <div className="col-md-4">
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <div className="row">
                      <div className="filter_col col-md-6">
                        <label for="exampleInputEmail1" className="name">First
                          Name</label>
                        <input type="text" name="first_name" className="form-control" placeholder="First Name" id="id_first_name"
                        onChange={handleChange}/>
                        <span className="error error_message" id="error_id_first_name"></span>
                      </div>
                      <div className="filter_col col-md-6">
                        <label for="exampleInputEmail1" className="name">Last
                          Name</label>
                        <input type="text" name="last_name" className="form-control" placeholder="Last Name" id="id_last_name"
                        onChange={handleChange}/>
                        <span className="error error_message" id="error_id_last_name"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Account Name</label>
                    <input type="text" name="account_name" className="form-control" placeholder="Account Name" id="id_account_name"
                    onChange={handleChange}/>
                    <span className="error error_message" id="error_id_account_name"></span>
                    
                  </div>
                </div>
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Title<span className="error">*</span></label>
                    <input type="text" name="title" className="form-control" placeholder="Title" required="" id="id_title"
                    onChange={handleChange}/>
                    <span className="error error_message" id="error_id_title"></span>
                  </div>
                </div>
                <div className="filter_col col-md-12">
                  <div className="form-group ">
                    <label for="exampleInputEmail1">Phone</label>
                    <input type="tel" name="phone" className="form-control" placeholder="+911234567890" id="id_phone"
                    onChange={handleChange}/>
                    <span className="error error_message" id="error_id_phone"></span>
                  </div>
                </div>
                <div className="filter_col col-md-12">
                  <div className="form-group ">
                    <label for="exampleInputEmail1" className="required">Email
                      Address</label>
                    <input type="email" name="email" className="form-control" placeholder="Email" id="id_email"
                    onChange={handleChange}/>
                    <span className="error error_message" id="error_id_email"></span>                    
                  </div>
                </div>
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Attachment</label>
                    <input type="file" name="attachment" id="lead_attachment"
                      onChange={handleChange}/>                    
                    <span className="error"></span>
                  </div>
                </div>
              </div>

                <div className="col-md-4">
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Website</label>
                    <input type="text" name="website" className="form-control" placeholder="Website" id="id_website"
                    onChange={handleChange}/>
                    <span className="error error_message" id="error_id_website"></span>
                  </div>
                </div>
                <div className="filter_col col-md-12">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <textarea name="description" className="form-control rounded-0" placeholder="Description" rows="6" id="id_description"
                    onChange={handleChange}></textarea>
                    <span className="error error_message" id="error_id_description"></span>
                  </div>
                </div>
                <div className="filter_col col-12">
                  <div className="form-group">
                    <label for="id_status">Teams</label>
                      <Select
                        className="react_select"/>
                      <span className="error" id="id__teams"></span>
                  </div>
                </div>
                <div className="filter_col col-12">
                  <div className="form-group">
                    <label for="id_status">Users</label>
                      <Select
                        className="react_select"
                        isDisabled="true"/>
                      <span className="error" id="id__teams"></span>
                  </div>
                </div>                            
                <div className="filter_col col-12">
                  <div className="form-group">
                    <label for="id_status">Assigned Users</label>
                      <Select
                        className="react_select"/>
                      <span className="error" id="id__teams"></span>
                  </div>
                </div>
              </div>

                <div className="col-md-4">
                <div class="filter_col col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Status</label>
                    <select name="status" class="form-control" placeholder="Status" id="id_status"
                              onChange={handleChange}>
                      <option value selected>----------</option>
                      <option value="assigned">Assigned</option>
                      <option value="in process">In Process</option>
                      <option value="converted">Converted</option>
                      <option value="recycled">Recycled</option>
                      <option value="closed">Closed</option>
                    </select>
                    <span class="error error_message" id="error_id_status"></span>
                  </div>
                </div>
                <div class="filter_col col-md-12">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Source</label>
                    <select name="source" class="form-control" placeholder="Status" id="id_status"
                              onChange={handleChange}>
                      <option value="open">Call</option>
                      <option value="close">Email</option>
                      <option value="close">Existing Customer</option>
                      <option value="close">Partner</option>
                      <option value="close">Public Relations</option>
                      <option value="close">Campaign</option>
                      <option value="close">Other</option>
                    </select>
                    <span class="error error_message" id="error_id_status"></span>
                  </div>
                </div>
                <div className="filter_col col-md-12">                    
                    <div className="form-group">
                      <label for="exampleInputEmail1">Address</label>
                      <input type="text" name="address_line" className="form-control" placeholder="Address Line" 
                             id="id_address_line"
                             onChange={handleChange}
                             />
                      <span className="error"></span>
                    </div>                    
                    <input type="text" name="street" className="form-control" placeholder="Street" 
                           id="id_street"
                           onChange={handleChange}
                           />
                    <span className="error"></span>
                    <div className="row mt-3">                      
                      <div className="col-md-4">                        
                        <input type="text" name="city" className="form-control" placeholder="City" 
                               id="id_city"
                               onChange={handleChange}
                               />                    
                        <span className="error"></span>
                      </div>                      
                      <div className="col-md-4">
                        <input type="text" name="state" className="form-control" placeholder="State" 
                               id="id_state"
                               onChange={handleChange}
                               />
                        <span className="error"></span>
                      </div>                      
                      <div className="col-md-4">
                        <input type="text" name="postcode" className="form-control" placeholder="Postcode" 
                               id="id_postcode"
                               onChange={handleChange}
                               />
                        <span className="error"></span>
                      </div>                      
                    </div>                    
                    <div className="col-md-12 p-0" style={{marginTop: '10px'}}>
                      <div className="form-group ">
                          <label for="exampleInputEmail1">Country <span className="error_marker" style={{color: "red"}}></span></label>
                          <select name="country" className="form-control rounded-0" placeholder="Billing country" required="" id="id_billing_country"
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
                    <button class="btn btn-default save mr-1" type="submit" id="submit_btn"
                      onClick={saveLead}>Save</button>                    
                    <button class="btn btn-success save savenew mr-1" type="submit">Save &amp; New</button>                    
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
