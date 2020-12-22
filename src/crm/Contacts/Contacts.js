import React, { useState, useEffect } from 'react';
import { CONTACTS } from '../../common';
import {momentTimeFormats} from '../Utilities';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import MailActionButton from '../UIComponents/ActionButtons/MailActionButton';
import ViewActionButton from '../UIComponents/ActionButtons/ViewActionButton';
import EditActionButton from '../UIComponents/ActionButtons/EditActionButton';
import DeleteActionButton from '../UIComponents/ActionButtons/DeleteActionButton';
import Modal from '../UIComponents/Modal/Modal';

export default function Contacts(props) {  

  // console.log(props);

  const [contacts, setContacts] = useState([]);
  const [isFilterAvailable, setIsFilterAvailable] = useState(false);
  const [filterObject, setFilterObject] = useState({first_name: '', city: '', assignedTo: []});
  
  useEffect(() => {
    setContacts(props.contacts.contact_obj_list);    
    getAssignedTo();
    
  }, []);
  
  const getAssignedTo = () => {
    
  }

  const stateUpdate = (res) => {       
    setContacts(res.contact_obj_list);        
  }

  const toggleFilter = () => {       
    setIsFilterAvailable(!isFilterAvailable);
  }

  const handleChange = (e) => {
    setFilterObject({...filterObject, [e.target.name]: e.target.value});
  }

  const ReactSelectHandleChange = (e, value) => {

  }

  const displayContacts = () => {
    
    return (
      <table className="table">
        <thead>
          <tr>                      
            <th scope="col">S.no</th>
            <th scope="col">Name</th>
            <th scope="col">Assigned To</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Created On</th>                       
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {
            contacts && contacts.map( (contact, index) => {              
              let assigned_to = (contact.assigned_to.length !== 0 && contact.assigned_to !== undefined) ? 
                                contact.assigned_to.map( assignedTo => {
                                  return(
                                    <a href={`/users/${assignedTo.id}/view/`} key={assignedTo.id}>
                                      <img className="text-capitalize" src={assignedTo.profile_pic} alt={assignedTo.username} title={assignedTo.email} width="40" height="40"/>
                                    </a>
                                  )
                                }): 'None'
              return( 
                <tr>
                  <td scope="col">{index+1}</td>
                  <td scope="col"><a href="#" data-toggle="modal" data-target={`#exampleModalCenter_contact${contact.id}`}>{contact.first_name +' ' + contact.last_name}</a></td>
                  <td scope="col">{assigned_to}</td>
                  <td scope="col">{(contact.address.city) ? contact.address.city : 'Not Specified'}</td>
                  <td scope="col">{(contact.address.state) ? contact.address.state : 'Not Specified'}</td>
                  <td scope="col" title={momentTimeFormats(contact.created_on)[1]}>{momentTimeFormats(contact.created_on)[0]}</td>
                  <td scope="col">                    
                    <ViewActionButton object={contact} to="contacts"/>
                    <EditActionButton object={contact} to="contacts"/>
                    <DeleteActionButton stateUpdate={stateUpdate} api={CONTACTS} id={contact.id} to="contacts"/>         
                  </td>
                </tr>
              )            
            })
          }   


                                  
        </tbody>
      </table>

    )

    
  }

  const displayModalForContacts = () => {    

    return(
      (props.contacts.contact_obj_list && props.contacts.contact_obj_list.map( (contact, index) => {
        
        let contactObject = {
            name: contact.first_name+' '+contact.last_name,
            email: contact.email,
            phone: contact.phone,
            address: contact.address_line+', '+contact.city+', '+contact.state+', '+contact.country+', '+contact.postcode,
            description: contact.description
        }

        return(
          <Modal
              modalTab="contact"
              id={contact.id}
              object={contactObject}
              createdBy={contact.created_by.email}
              createdOn={contact.created_on}
              />
        )
      }))  
    )
  }

  const getFilteredContacts = (e) => {
    e.preventDefault();
    
    let firstName, filterCity, results;

    firstName = filterObject.first_name.trim("").toLowerCase();
    filterCity = filterObject.city.trim("").toLowerCase();

    // Filtering first name
    if(firstName) {
      results = props.contacts.contact_obj_list.filter( contact => contact.first_name.toLowerCase().includes(firstName));      
    }
    else {
      results = props.contacts.contact_obj_list;
    }
    
    // Filtering city
    if(filterCity) {
      results = results.filter(contact =>{
        if(contact.address.city !== null) {          
          return contact.address.city.toLowerCase().includes(filterCity);
        }
      });
    }
    else {
      results = results;
    }      
        
    setContacts(results);
  }
    
  const clearSearch = (e) => {
    e.preventDefault();
    setFilterObject({...filterObject, first_name: '', city: '', assignedTo: []});
    setContacts(props.contacts.contact_obj_list);
    setIsFilterAvailable(!isFilterAvailable);
  }
  
  return (
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      <div className="main_container">

        <div className="row marl">
            <div className="col-lg-12 text-right">
              <span className="d-inline">
                <a className="primary_btn" href="/contacts/create/"><svg className="svg-inline--fa fa-plus fa-w-14 svg-size fa-plus-svg" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>Add New Contact</a>
              </span>
            </div>
        </div>

        <div className="filter_row list_filter_row row marl" style={{display: (isFilterAvailable) ? 'block': 'none'}}>        
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <form id="contacts_filter" action="" method="POST">
                    <div className="card-body">
                      <div className="card-title">Filters</div>
                      <div className="row marl mt-2">
                        <div className="filter_col col-md-3">
                          <div className="form-group">
                            <label for="exampleInputEmail1">NAME</label>
                            <input type="text" className="form-control" name="first_name" placeholder="First Name" name="first_name" 
                                   value={filterObject.first_name}
                                   onChange={handleChange}></input>
                          </div>
                        </div>
                        <div className="filter_col col-md-3">
                          <div className="form-group">
                            <label for="exampleInputEmail1">CITY</label>
                            <input type="text" className="form-control" placeholder="City" name="city" 
                                   value={filterObject.city}
                                   onChange={handleChange}></input>
                          </div>
                        </div>
                        <ReactSelect  elementSize="col-md-3" labelName="Assigned To" isMulti={true} 
                                      value={filterObject.assignedTo} getChangedValue={(e) => ReactSelectHandleChange(e, 'assignedUsers')}/>                                      
                        <div className="filter_col text-center col-3">
                          <div className="form-group buttons_row">
                            <button className="btn btn-primary save mr-1" type="button" onClick={getFilteredContacts}>Search</button>
                            <a className="btn btn-default clear" onClick={clearSearch}>Clear</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        <div className="table_container_row row marl ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title text-right">
                  <span className="float-left">Contacts - {(contacts !== undefined) ? contacts.length : ''}</span>                  
                  <span className="filter_toggle">
                    <a href="#" className="primary_btn" onClick={toggleFilter}><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg></a>
                  </span>
                </div>
                <div className="table-responsive">
                {displayContacts()}
                
              
              </div>                    
              </div>
            </div>
          </div>    
        </div>                     
        
      </div>

      {/* ModalContainer */}
      { displayModalForContacts() }
    </div>
  )
}