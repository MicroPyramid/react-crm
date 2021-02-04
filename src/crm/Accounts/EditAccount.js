import React, {useEffect, useState} from 'react';
import { ACCOUNTS, CONTACTS, LEADS, TEAMS } from '../../common/apiUrls';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import TextInput from '../UIComponents/Inputs/TextInput';
import PhoneInput from '../UIComponents/Inputs/PhoneInput';
import FileInput from '../UIComponents/Inputs/FileInput';
import EmailInput from '../UIComponents/Inputs/EmailInput';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import TagsInput from '../UIComponents/Inputs/TagsInput';
import { Validations } from './Validations';
import { countries, twoStatus } from '../optionsData';
import { getApiResults, convertArrayToString } from '../Utilities';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EditAccount(props) {

  const [accountObject, setAccountObject] = useState({
    name: '', website: '', phone: '', email: '',
      billing_address_line: '', billing_street: '', billing_postcode: '',
      billing_city: '', billing_state: '', billing_country: '',
      status: 'open', lead:[], contacts: [], teams:[], assignedTo:[], files: []
  });
  const [leads, setLeads] = useState([]);  
  const [contacts, setContacts] = useState([]);  
  const [tags, setTags] = useState([]);  
  const [errors, setErrors] = useState({});  
  // Teams,Users,AssignedTo
  const [teams, setTeams] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState([]);
  const [isAssignedTo, setIsAssignedTo] = useState(true);



  useEffect(() => {
    getContacts();
    getLeads();
    getTeamsAndUsers();
    getAccount(); 
    // eslint-disable-next-line    
  }, []);


  const getContacts = () => {    
    let contactsResults = getApiResults(CONTACTS);
    let contactsArray = [];
    contactsResults.then( result => {
      result.data.contact_obj_list.map( contact => (
        contactsArray.push({label: contact.first_name +' - '+ contact.email, value: contact.first_name +' - '+ contact.email, id: contact.id})
    ))
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
  
  const getTeamsAndUsers = () => {
    let getTeams = getApiResults(`${TEAMS}`);
    let teamsArray = [];
    let usersArray = [];
    getTeams.then( res => {                
      res.data.teams.map(team => (
        teamsArray.push({value: team.name, label: team.name, users: team.users, id: team.id})
      ))
      res.data.users.map(user => (
        usersArray.push({value: user.email, label: user.email, id: user.id})
      ))
    })
    setTeams(teamsArray);
    setAssignedTo(usersArray);
  }

  const getAccount = () => {
    let userId = window.location.pathname.split('/')[3];
    console.log(userId);
    console.log(`${ACCOUNTS}${userId}/`);
    let account = getApiResults(`${ACCOUNTS}${userId}/`);       
    console.log(account);
    account.then( acc => {                            
      setAccountObject({...accountObject, name: acc.data.account_obj.name,
        website: acc.data.account_obj.website,
        phone: acc.data.account_obj.phone,
        email: acc.data.account_obj.email,
        billing_address_line: acc.data.account_obj.billing_address_line,
        billing_street: acc.data.account_obj.billing_street,
        billing_postcode: acc.data.account_obj.billing_postcode,        
        billing_city: acc.data.account_obj.billing_city,
        billing_state: acc.data.account_obj.billing_state,
        billing_country: acc.data.account_obj.billing_country,
        status: acc.data.account_obj.status,
        lead: (acc.data.account_obj.lead) ? {label: acc.data.account_obj.lead.title, value: acc.data.account_obj.lead.title, id: acc.data.account_obj.lead.id}: '',                
        contacts: acc.data.account_obj.contacts.map(contact =>  ({label: contact.first_name +' - '+ contact.email, value: contact.first_name +' - '+ contact.email, id: contact.id})),        
        teams: acc.data.account_obj.teams.map(team => ({label: team.name, value: team.name, users: team.users, id: team.id})),
        assignedTo: acc.data.account_obj.assigned_to.map(assign => ({label: assign.email, value: assign.email, id: assign.id})),
        files: acc.data.attachments,              
      });
      let usersArray = [];
      acc.data.account_obj.teams.map(team => (
        team.users.map(user => (
          usersArray.push({value: user.username, label: user.username, id: user.id})
        ))
      ))
      let selectedUsersArray = usersArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))=== i );
      setSelectedUsers(selectedUsersArray);

      setTags(acc.data.account_obj.tags.map( tag => tag.name));
    })    
  }

  const ReactSelectHandleChange = (e, value) => {
    setIsAssignedTo(false);    
    let duplicateAssignedTo = [...assignedTo];      
    let teams = e;
    let usersArray = [];

    setAccountObject({...accountObject, teams: e});
    if(value === 'teams') {
      teams && teams.map(team => (        
          team.users.map(user => (
            usersArray.push({value: user.username, label: user.username, id: user.id})
          ))        
      ))
      let selectedUsersArray = usersArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))=== i );
      setSelectedUsers(selectedUsersArray);
                  
      selectedUsersArray.map(selectedUser => (
        duplicateAssignedTo.map(assignedTo => (                    
          (selectedUser.id === assignedTo.id) ?                        
            duplicateAssignedTo.splice(duplicateAssignedTo.indexOf(assignedTo), 1): ''
        ))
      ))      
      setSelectedAssignedTo(duplicateAssignedTo);       
    }          
  }

  const handleChange = (e) => {    
    setAccountObject({...accountObject, [e.target.name]: e.target.value})    
  }  
  
  const fileUpload = (e) => {       
    let filesArray = [...accountObject.files];  
    let newFile = e.target.files[0];
    filesArray.push(newFile);       
    setAccountObject({...accountObject, files: filesArray});
  }
    
  const removeFile = (createdOn) => {
      let dupFiles = [...accountObject.files];
      let remainingFiles = dupFiles.filter(file => file.created_on !== createdOn);      
      setAccountObject({...accountObject, files: remainingFiles});
  }  

  const updateAccount = (e) => {    
    e.preventDefault();
    let userId = window.location.pathname.split('/')[2];

    // Validations    
    let validationResults = Validations(accountObject);        
    setErrors(validationResults);

    let isValidationspassed = true;

    for (let i in validationResults) {      
      if (validationResults[i].length > 0) {        
          isValidationspassed = false;
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
    formData.append("contacts", convertArrayToString(accountObject.contacts.map(account => account.id)));
    formData.append("status", accountObject.status);
    formData.append("tags", convertArrayToString(tags));        
    accountObject.files.forEach(file => {      
      formData.append("account_attachment", file);
    })
    formData.append("teams", convertArrayToString(
      accountObject.teams ? accountObject.teams.map(team => team.id) : []
    ));
    formData.append("assigned_to", convertArrayToString(
      accountObject.assignedTo ? accountObject.assignedTo.map(assign => assign.id) : []
    ));
        
    
    if (isValidationspassed) {
      axios.put(`${ACCOUNTS}${userId}/`, formData, config)
        .then(res => {                                
            if(res.status === 200) {        
              props.history.push({
                pathname: '/accounts/',          
                state: "accounts"
              });
            }
        })
        .catch(err => err);
    }
  }
    

  return (
    <div id="mainbody" className="main_container main_container_mt">        
        <BreadCrumb target="accounts" action="edit" />
        <form id="formid" action="" method="POST" noValidate="" enctype="multipart/form-data">        
          <div className="overview_form_block row marl justify-content-center">
            <div className="col-md-9">
              {/* card */}
              <div className="card">
                <div className="card-body">
                  <div className="card-title text-center">EDIT ACCOUNT</div>
                    <div className="row marl">
                      <div className="col-md-4">
                        <TextInput  elementSize="col-md-12" labelName="Name" attrName="name" attrPlaceholder="Name" inputId="id_name" 
                                    value={accountObject.name} getInputValue={handleChange} 
                                    isRequired={true} error={errors.name}/>
                        <TextInput  elementSize="col-md-12" labelName="Website" attrName="website" attrPlaceholder="Website" inputId="id_website" 
                                    value={accountObject.website} getInputValue={handleChange} error={errors.website}/>
                        <PhoneInput elementSize="col-md-12" labelName="Phone" attrName="phone" attrPlaceholder="+911234567890" inputId="id_phone" 
                                    value={accountObject.phone} getInputValue={handleChange} error={errors.phone}/>
                        <EmailInput elementSize="col-md-12"  labelName="Email"  attrName="email"  attrPlaceholder="Email"  inputId="id_email"  
                                    value={accountObject.email} getInputValue={handleChange} 
                                    isRequired={true} error={errors.email}/>
                        <ReactSelect elementSize="col-md-12" labelName="Leads" options={leads} value={accountObject.lead} getChangedValue={(e) => setAccountObject({...accountObject, lead: e})}/>
                      </div>
                      <div className="col-md-4">
                        <div className="filter_col billing_block col-md-12" style={{padding: "0px"}}>                                                    
                          <div className="row">
                          <TextInput  elementSize="col-md-12" labelName="Billing Address" attrName="billing_address_line" attrPlaceholder="Address Line" inputId="id_billing_address_line" 
                                    value={accountObject.billing_address_line} getInputValue={handleChange} isRequired={true} error={errors.billing_address_line}/>                                    
                            <TextInput  elementSize="col-md-6" labelName="Street" attrName="billing_street" attrPlaceholder="Street" inputId="id_billing_street" 
                                    value={accountObject.billing_street} getInputValue={handleChange} isRequired={true} error={errors.billing_street}/>
                            <TextInput  elementSize="col-md-6" labelName="Postcode" attrName="billing_postcode" attrPlaceholder="Postcode" inputId="id_billing_postcode" 
                                    value={accountObject.billing_postcode} getInputValue={handleChange} isRequired={true} error={errors.billing_postcode}/>
                            <TextInput  elementSize="col-md-6" labelName="City" attrName="billing_city" attrPlaceholder="City" inputId="id_billing_city" 
                                    value={accountObject.billing_city} getInputValue={handleChange} isRequired={true} error={errors.billing_city}/>
                            <TextInput  elementSize="col-md-6" labelName="State" attrName="billing_state" attrPlaceholder="State" inputId="id_billing_state" 
                                    value={accountObject.billing_state} getInputValue={handleChange} isRequired={true} error={errors.billing_state}/>
                            <SelectComponent  elementSize="col-md-12" labelName="Country" attrName="billing_country" attrPlaceholder="Country" attrId="id_billing_country" 
                                              selectedValue={accountObject.billing_country} getInputValue={handleChange} options={countries} isrequired={true} 
                                              error={errors.billing_country}/>                            
                            <ReactSelect  elementSize="col-md-12" labelName="Contacts" isMulti={true} options={contacts} 
                                          value={accountObject.contacts} getChangedValue={(e) => setAccountObject({...accountObject, contacts: e})}
                                          error={errors.contacts}/>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <ReactSelect  elementSize="col-md-12" labelName="Teams" isMulti={true} options={teams} 
                                      value={accountObject.teams}
                                      getChangedValue={(e) => ReactSelectHandleChange(e, 'teams')}
                                      // getChangedValue={(e) => setAccountObject({...accountObject, teams: e})}
                                      />
                        <ReactSelect  elementSize="col-md-12" labelName="Users" isDisabled={true}
                                      isMulti={true} value={selectedUsers}/>
                        <ReactSelect  elementSize="col-md-12" labelName="Assigned To" isMulti={true} 
                                      options={(isAssignedTo) ? assignedTo : selectedAssignedTo }
                                      value={accountObject.assignedTo}
                                      getChangedValue={(e) => setAccountObject({...accountObject, assignedTo: e})} />
                        <SelectComponent  elementSize="col-md-12" labelName="Status" attrName="status" attrPlaceholder="Status" attrId="id_status" 
                                          value={accountObject.status} getInputValue={handleChange} options={twoStatus}/>                                                   
                        <TagsInput type="edit" sendTags={tags} getTags={setTags}/>
                        <FileInput  elementSize="col-md-12" labelName="Attachment" attrName="account_attachment" inputId="id_file"  
                                    getFile={fileUpload}/>
                        <div>
                          {
                            (accountObject.files.map((file, index) => {
                              
                              return(
                                <div id={`attachment${index}`} className="mt-2 ml-3">
                                  <a target="_blank" rel="noopener noreferrer" href={file.file_path}>{(file.file_name) ? file.file_name : file.name }</a>                                  
                                  <a href="/#" className="action btn primary_btn ml-1" onClick={() => removeFile(file.created_on)}>X</a>
                                </div>
                              )
                            }))
                          }
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="row marl buttons_row form_btn_row text-center">
                          <button className="btn btn-default save mr-1" name="save" type="button" id="call_save" onClick={updateAccount}>Save</button>
                          <Link to="/accounts" className="btn btn-default clear">Cancel</Link>
                        </div>
                      </div>                        
                    </div>
                  </div>
                </div>
              </div>
            </div>                          
          </form>
        </div>
    );
}
