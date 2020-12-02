import React, {useEffect, useState} from 'react';
import { ACCOUNTS } from '../../common/apiUrls';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import TextInput from '../UIComponents/Inputs/TextInput';
import PhoneInput from '../UIComponents/Inputs/PhoneInput';
import FileInput from '../UIComponents/Inputs/FileInput';
import EmailInput from '../UIComponents/Inputs/EmailInput';
import TextArea from '../UIComponents/Inputs/TextArea';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import { Validations } from './Validations';
import { countries, twoStatus } from '../optionsData';

export default function EditAccount(props) {


  // const [accountObject, setAccountObject] = useState({});
  const [accountObject, setAccountObject] = useState({
    name: '', website: '', phone: '', email: '', lead:[], 
      billing_address_line: '', billing_street: '', billing_postcode: '',
      billing_city: '', billing_state: '', billing_country: '',
      status: 'open', contacts: []
  });
  const [leads, setLeads] = useState([]);
  const [availableLeads, setAvailableLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [availableContacts, setAvailableContacts] = useState([]);
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [isValidations, setIsValidations] = useState('true');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAccount();
    let leadsArray = [];
    let contactsArray = [];
    props.leads.open_leads && props.leads.open_leads.map( lead => {      
      leadsArray.push({label: lead.title, value: lead.title, lead: lead});
    })
    setLeads(leadsArray);    
    props.contacts.contact_obj_list && props.contacts.contact_obj_list.map ( contact => {      
      contactsArray.push({label: contact.first_name, value: contact.first_name, id: contact.id, contact: contact});
    })
    setContacts(contactsArray);
  }, []);

  const getAccount = () => {
    let userId = window.location.pathname.split('/')[2];
    fetch(`${ACCOUNTS}${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`,
      }
    })
    .then(res => res.json())
    .then(res => {
      setAccountObject(res.account_obj);
      let availableContactsArr = [];      
      res.account_obj.contacts.map( contact => {
        availableContactsArr.push({value: contact.first_name, label: contact.first_name, id: contact.id});        
      })      
      setAvailableContacts(availableContactsArr);      
    })
  }  
  
  const handleChange = (e) => {    
    setAccountObject({...accountObject, [e.target.name]: e.target.value})    
  }  

  const updateContacts = (e) => {       
    let contactsArray = [];    
    e && e.map(contact => {
      contactsArray.push({value: contact.value, label: contact.value, id: contact.id});
    })
    setAvailableContacts(contactsArray);
  }

  const updateLeads = (e) => {    
    console.log(e);
    setAvailableLeads({value: e.lead.title , label: e.lead.title , id: e.lead.id});    
  }

  const addTags = event => {    
    if (event.key === 'Enter' && event.target.value !== "") {
      // setTags([...tags, {name: event.target.value, slug: event.target.value}]);
      setTags([...tags, event.target.value]);
      event.target.value="";
    }
  }

  const removeTags = index => {        
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  }
  
  const fileUpload = (e) => {    
    setFile(e.target.files[0]);
  }

  const updateAccount = (e) => {
    e.preventDefault();
    
    console.log(accountObject);
    console.log(availableContacts);
    console.log(availableLeads);

    let contactsArr = [];
    availableContacts.map(contact => {
      contactsArr.push(contact.id);
    })

    // let leadsArr = [];
    // availableLeads.map(lead => {
    //   leadsArr.push(lead.id);
    // })

    let userId = window.location.pathname.split('/')[2];
    fetch(`${ACCOUNTS}${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`,
      },
      body: JSON.stringify({
          name: accountObject.name,
          website: accountObject.website,
          phone: accountObject.phone,
          email: accountObject.email,
          lead: availableLeads.id,
          billing_address_line: accountObject.billing_address_line,
          billing_street: accountObject.billing_street,
          billing_postcode: accountObject.billing_postcode, 
          billing_city: accountObject.billing_city,
          billing_state: accountObject.billing_state,
          billing_country: accountObject.billing_country,          
          status: accountObject.status,
          contacts: contactsArr,          
      })
    }).then(res => res.json())
    .then (res => console.log(res));
  }  

  console.log(accountObject);

  return (
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>        
        <BreadCrumb target="accounts" action="create" />
        <form id="formid" action="" method="POST" novalidate="" enctype="multipart/form-data">        
          <div class="overview_form_block row marl justify-content-center">
            <div class="col-md-9">
              {/* card */}
              <div class="card">
                <div class="card-body">
                  <div class="card-title text-center">EDIT ACCOUNT</div>
                    <div className="row marl">
                      <div class="col-md-4">
                        <TextInput  elementSize="col-md-12" labelName="Name" attrName="name" attrPlaceholder="Name" inputId="id_name" 
                                    value={accountObject.name} getInputValue={handleChange} 
                                    isRequired={true} error={errors.name}/>
                        <TextInput  elementSize="col-md-12" labelName="Website" attrName="website" attrPlaceholder="Website" inputId="id_website" 
                                    value={accountObject.website} getInputValue={handleChange}/>
                        <PhoneInput elementSize="col-md-12" labelName="Phone" attrName="phone" attrPlaceholder="+911234567890" inputId="id_phone" 
                                    value={accountObject.phone} getInputValue={handleChange}/>                                                     
                        <EmailInput elementSize="col-md-12"  labelName="Email"  attrName="email"  attrPlaceholder="Email"  inputId="id_email"  
                                    value={accountObject.email} getInputValue={handleChange} 
                                    isRequired={true} error={errors.email}/>
                        <ReactSelect labelName="Leads" options={leads} value={availableLeads} getChangedValue={updateLeads}/>
                      </div>                      
                      <div class="col-md-4">
                        <div class="filter_col billing_block col-md-12" style={{padding: "0px"}}>                                                    
                          <div class="row" style={{marginTop: "10px"}}>
                          <TextInput  elementSize="col-md-12" labelName="Billing Address" attrName="billing_address_line" attrPlaceholder="Address Line" inputId="id_billing_address_line" 
                                    value={accountObject.billing_address_line} getInputValue={handleChange} isRequired={true}/>                                    
                            <TextInput  elementSize="col-md-6" labelName="Street" attrName="billing_street" attrPlaceholder="Street" inputId="id_billing_street" 
                                    value={accountObject.billing_street} getInputValue={handleChange} isRequired={true}/>
                            <TextInput  elementSize="col-md-6" labelName="Postcode" attrName="billing_postcode" attrPlaceholder="Postcode" inputId="id_billing_postcode" 
                                    value={accountObject.billing_postcode} getInputValue={handleChange} isRequired={true}/>
                            <TextInput  elementSize="col-md-6" labelName="City" attrName="billing_city" attrPlaceholder="City" inputId="id_billing_city" 
                                    value={accountObject.billing_city} getInputValue={handleChange} isRequired={true}/>
                            <TextInput  elementSize="col-md-6" labelName="State" attrName="billing_state" attrPlaceholder="State" inputId="id_billing_state" 
                                    value={accountObject.billing_state} getInputValue={handleChange} isRequired={true}/>
                            <SelectComponent  elementSize="col-md-12" labelName="Country" attrName="billing_country" attrPlaceholder="Country" attrId="id_billing_country" 
                                              selectedValue={accountObject.billing_country} getInputValue={handleChange} options={countries} isrequired={true}/>                                                                
                            <ReactSelect  elementSize="col-md-12" labelName="Contacts" isMulti={true} options={contacts} 
                                          value={availableContacts} getChangedValue={updateContacts}/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <ReactSelect labelName="Teams"/>
                        <ReactSelect labelName="Users" isDisabled={true}/>
                        <ReactSelect labelName="Assigned To"/>
                        <SelectComponent  labelName="Status" attrName="status" attrPlaceholder="Status" attrId="id_status" 
                                          value={{value: accountObject.status, label: accountObject.status}} getInputValue={handleChange} options={twoStatus}/>
                        <div class="filter_col col-12">
                          <div class="form-group">
                            <label>Tags</label>

                            <div className="tags-input">
                              <ul>
                                  {tags.map((tag, index) => (
                                    <li
                                      key={index}>
                                      <span>{tag}</span>
                                      <b onClick={() => removeTags(index)}>x</b>
                                    </li>
                                  ))}
                              </ul>
                              <input
                                className="tags-input__input"
                                type="text"
                                onKeyUp={event => addTags(event)}
                                placeholder="add a tag"
                              />                              
                            </div>

                          </div>
                        </div>                        
                        <FileInput  elementSize="col-md-12" labelName="Attachment" attrName="account_attachment" inputId="id_file"  
                                    getFile={fileUpload}/>
                        {/* <div class="filter_col col-md-12">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Attachment</label>
                            <input type="file" name="account_attachment" onChange={fileUpload}></input>                  
                            <span class="error"></span>
                          </div>
                        </div> */}
                      </div>
                      <div class="col-md-12">
                        <div class="row marl buttons_row form_btn_row text-center">
                          <button class="btn btn-default save mr-1" name="save" type="button" id="call_save" onClick={updateAccount}>Save</button>
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
