import React from 'react';
import { useState, useEffect } from 'react';
import {timeFromNow} from '../Utilities';
import Select, { createFilter } from 'react-select';
import { ACCOUNTS } from '../../common/apiUrls';
import MailActionButton from '../UIComponents/ActionButtons/MailActionButton';
import ViewActionButton from '../UIComponents/ActionButtons/ViewActionButton';
import EditActionButton from '../UIComponents/ActionButtons/EditActionButton';
import DeleteActionButton from '../UIComponents/ActionButtons/DeleteActionButton';

const Accounts = (props) => {
  
  const [isTabActive, setIsTabActive] = useState(true);
  const [openAccounts, setOpenAccounts] = useState([]);
  const [closedAccounts, setClosedAccounts] = useState([]);  
  const [filterObject, setFilterObject] = useState({ name: '', city: '', tags: []});
  const [isFilterAvailable, setIsFilterAvailable] = useState(false);
  const [tags, setTags] = useState([]);    
  const [isDisplayFilteredObjects, setIsDisplayFilteredObjects] = useState(true);
  const [displayOpenAccounts, setDisplayOpenAccounts] = useState([]);
  const [displayClosedAccounts, setDisplayClosedAccounts] = useState([]);
  // 
  const [status, setStatus] = useState(true);

  useEffect(() => {        
    setOpenAccounts(props.accounts.open_accounts);
    setClosedAccounts(props.accounts.close_accounts);    
  }, []);  

  const stateUpdate = (res) => {    
    setOpenAccounts(res.open_accounts);
    setClosedAccounts(res.closed_accounts);
  }

  const getTags = () => {
    let tagsArray = [];    
    let newOpenAccounts = [...openAccounts];
    newOpenAccounts.map(account => {
      account.tags.map(tag => {
        tagsArray.push({value: tag.name, label: tag.name, tag: tag.name});
      })
    })

    let newClosedAccounts = [...closedAccounts];
    newClosedAccounts.map(account => {
      account.tags.map(tag => {
        tagsArray.push({value: tag.name, label: tag.name, tag: tag.name});
      })
    })    
    setTags(tagsArray);
  }
  
  const toggleFilter = () => {       
    setIsFilterAvailable(!isFilterAvailable);

    // Retrieve tags only when filters are available
    if (!isFilterAvailable) getTags();
  }
  
  const handleChange = (e) => {    
    setFilterObject({...filterObject, [e.target.name]: e.target.value});
  }

  const handleChangeTag = (e) => {   
    setFilterObject({...filterObject, tags: e});
  }

  const displayAccounts = (status) => {

    let accounts = (status === "open") ? openAccounts : closedAccounts; 
    return(
      <table className="table">
                              <thead>
                                <tr>
                                  <th width="5%">ID</th>
                                  <th width="15%">Name</th>
                                  <th width="10%">Created By</th>
                                  <th width="10%">City</th>
                                  <th width="10%">State</th>
                                  <th width="10%">Created On</th>
                                  <th width="18%">Tags</th>
                                  <th width="15%">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  (accounts && accounts.map( (account, index) => {                                                                                                                                             
                                    let tags = (account.tags.length !== 0 ) ?
                                    account.tags.map( (tag, index) => {
                                        return(
                                          <span className={`text-left color${index+1} tag_class_acc`} data-link="28" id="list_tag">{tag.name}</span>
                                        )
                                    }): 'No Tags';

                                    return(
                                      <tr>
                                        <td>{index+1}</td>                                        
                                        <td><a data-toggle="modal" data-target={`#exampleModalCenter_account${account.id}`} href="#">{account.name}</a></td>
                                        <td><img src={account.created_by.profile_pic} alt={account.created_by.username}></img></td>
                                        <td>{(account.billing_city) ? account.billing_city : 'Not Specified'}</td>
                                        <td>{(account.billing_city) ? account.billing_state : 'Not Specified'}</td>
                                        <td title="Nov. 27, 2020, 4:08 p.m.">{timeFromNow(account.created_on)}</td>
                                        <td>{tags}</td>
                                        <td className="actions action-flex">
                                          <MailActionButton object={account} to="accounts"/>
                                          <ViewActionButton object={account} to="accounts"/>
                                          <EditActionButton object={account} to="accounts"/>
                                          <DeleteActionButton stateUpdate={stateUpdate} api={ACCOUNTS} id={account.id} to="accounts"/>         
                                        </td>
                                      </tr>
                                    )
                                  }))
                                }
                              </tbody>
                            </table>
    )
  }

  const displayModalForAccounts = () => {
    
    let modalOpenAccounts = (openAccounts) ? [...openAccounts] : '';
    let modalClosedAccounts = (closedAccounts) ? [...closedAccounts] : '';
    let mergedModalAccounts = modalOpenAccounts.concat(modalClosedAccounts);

    return(
      (mergedModalAccounts && mergedModalAccounts.map( (account, index) => {            

        return(
          <div className="modal fade" id={`exampleModalCenter_account${account.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{account.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div id="modal_body_ajax">
                </div>
                <div className="" id="">
                    <div className="">
                      <div className="col-md-12" id="">
                          <div className="card">
                            <div className="card-body" id="datashow" style={{margin: "0", padding: "0"}}>
                                <div className="card-title text-right">
                                  <h5>
                                      <span style={{marginTop: "0px"}}>
                                      </span>
                                  </h5>
                                </div>

                                <div className="row marl">
                                  <div className="col-md-4">
                                      <div className="filter_col col-md-12" id="iname">
                                        <div className="form-group">
                                            <label className="acc_field_label" for="id_name" data-name="name">Name</label>
                                            <div className="account_field" id="account_name" data-name="name">{account.name}</div>
                                        </div>
                                      </div>
                                      <div className="filter_col col-md-12">
                                        <div className="form-group">
                                            <label className="acc_field_label" for="id_phone" data-name="name">Phone</label>
                                            <div className="account_field" id="account_phone" data-name="name">{account.phone}
                                            </div>
                                        </div>
                                      </div>
                                      <div className="filter_col col-md-12">
                                        <div className="form-group">
                                            <label className="acc_field_label" for="id_status" data-name="name">Status</label>
                                            <div className="account_field" id="account_status" data-name="name">{account.status}
                                            </div>
                                        </div>
                                      </div>
                                  </div>

                                  <div className="col-md-4">

                                    <div className="filter_col col-md-12">
                                        <div className="form-group">                                            
                                          <label className="acc_field_label" for="id_email" data-name="name">Email</label>
                                          <div className="account_field" id="account_email" data-name="name">{account.email}</div>
                                      </div>                                                                                    
                                    </div>
                                      
                                      <div className="filter_col col-md-12">
                                        <div className="form-group">
                                          <label className="acc_field_label" for="id_website" data-name="name">Website</label>
                                          <div className="account_field" id="account_website" data-name="name">{account.website}</div>
                                        </div>
                                      </div>

                                      <div className="filter_col col-md-12">
                                        <div className="form-group">
                                          <label className="acc_field_label" for="id_website" data-name="name">lead</label>
                                          <div className="account_field" id="account_website" data-name="name">                                          
                                          {(account.lead) ? account.lead.title: ''}
                                          </div>
                                        </div>
                                      </div> 

                                    </div>  
                                  
                                  <div className="col-md-4">

                                    <div className="filter_col col-md-12">
                                      <div className="form-group">
                                        <label className="acc_field_label" for="id_billing_address" data-name="name">Billing Address</label>
                                        <div className="account_field" id="account_billing_address" data-name="name">
                                                {account.billing_address_line} {account.billing_street}
                                                {account.billing_city} {account.billing_state}
                                                {account.billing_postcode} {account.country}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="filter_col col-md-12">                        
                                      <div className="form-group">
                                        <label className="case_field_label" for="id_contact" data-name="name">Assigned To</label>                                            
                                          {
                                            (account.assignedTo && account.assignedTo.map( assignee => {
                                              return(
                                                <a href="/users/1044/view/">{assignee.email}</a>
                                              )
                                            }))
                                          }                                            
                                      </div>                            
                                    </div>

                                    <div className="filter_col col-md-12">                        
                                      <div className="form-group">
                                        <label className="case_field_label" for="id_contact" data-name="name">Contacts</label>                                            
                                          {
                                            (account.contacts && account.contacts.map( contact => {
                                              return(
                                                <p>{contact.first_name}</p>
                                              )
                                            }))
                                          }                                            
                                      </div>                            
                                    </div>
                                    

                                  </div>                                    
                                </div>  

                                <div className="col-md-12">
                                      <div className="created_information">
                                          Created by <b>{account.email}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{timeFromNow(account.created_on)}</b>
                                      </div>
                                  </div>

                                </div>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>            
          </div>                        
        )
      }))
    )
  }

  const getFilteredAccounts = (e) => {
    e.preventDefault();
    
    setOpenAccounts(props.accounts.open_accounts);
    setClosedAccounts(props.accounts.close_accounts);
    
    let filteredResults, newOpenAccounts, newClosedAccounts, accounts, trimmedName, trimmedCity, tags, finalFilter = []; 
    let results;
    
    newOpenAccounts = [...openAccounts];
    newClosedAccounts = [...closedAccounts]; 
    let mergedAccounts = newOpenAccounts.concat(newClosedAccounts);            

    trimmedName = filterObject.name.trim("").toLowerCase();
    trimmedCity = filterObject.city.trim("").toLowerCase();

    if (trimmedName && trimmedCity) {
      filteredResults = mergedAccounts.filter(account => (account.name.toLowerCase().includes(trimmedName)) && (account.billing_city.toLowerCase().includes(trimmedCity)));
    } else if (trimmedName) {
      filteredResults = mergedAccounts.filter(account => (account.name.toLowerCase().includes(trimmedName)));
    } else if (trimmedCity){
      filteredResults = mergedAccounts.filter(account => (account.billing_city.toLowerCase().includes(trimmedCity)));
    }        

    tags = filterObject.tags && filterObject.tags.map( tag => tag.value);
               
    if (tags === null) tags = [];    

    // Only filtered Results are available
    if (filteredResults !== undefined && tags.length === 0) {            
      results = filteredResults;
    }

    // Only tags are available
    if (filteredResults === undefined && tags.length !== 0) {
      mergedAccounts.map ( result => {
        result.tags.filter(tag => {        
          tags.map( oTag => {
            if (oTag === tag.name) {  
              finalFilter.push(result);              
            }
          })
        })
      });           
      results = finalFilter;
    }

    // Both filtered results and tags are available
    if (filteredResults !== undefined && tags.length !== 0) {
      filteredResults.map ( result => {
        result.tags.filter(tag => {        
          tags.map( oTag => {
            if (oTag === tag.name) {  
              finalFilter.push(result);
            }
          })
        })
      });        
      results = finalFilter;
    }

    // Both filtered results and tags are not available
    if (filteredResults === undefined && tags === null) {            
      results = mergedAccounts;
    }
    
    let displayOpenAccounts = [];
    let displayClosedAccounts = [];

    if (results !== undefined) {
      results.map( result => {        
        if (result.status === 'open') {
          displayOpenAccounts.push(result);
        } else {
          displayClosedAccounts.push(result);
        }      
      })
    } else {
      displayOpenAccounts = props.accounts.open_accounts;
      displayClosedAccounts = props.accounts.close_accounts;
    }

    console.log(displayOpenAccounts);
    console.log(displayClosedAccounts);

    // setDisplayOpenAccounts(displayOpenAccounts);
    // setDisplayClosedAccounts(displayClosedAccounts);

    setOpenAccounts(displayOpenAccounts);
    setClosedAccounts(displayClosedAccounts);

    setIsDisplayFilteredObjects(false);
  }    

  const clearSearchResults = () => {    
    setIsDisplayFilteredObjects(true);    
    setFilterObject(filterObject);
    setOpenAccounts(props.accounts.open_accounts);
    setClosedAccounts(props.accounts.close_accounts);   

  }

  // let resDisplayOpenAccounts  = (isDisplayFilteredObjects) ? openAccounts : displayOpenAccounts;
  // let resDisplayClosedAccounts  = (isDisplayFilteredObjects) ? closedAccounts : displayClosedAccounts;
    
  return(
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
        
        {/* Main container */}
        <div className="main_container">
        
        <div className="row marl">
            <div className="col-lg-12 text-right">
              <span className="d-inline">
                <a className="primary_btn" href="/accounts/create/"><svg className="svg-inline--fa fa-plus fa-w-14 svg-size fa-plus-svg" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>Add New Account</a>
              </span>
            </div>
        </div>
          
        <div className="filter_row list_filter_row row marl" style={{display: (isFilterAvailable) ? 'block': 'none'}}>
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <form id="accounts_filter" method="POST" action="">
                    <div className="card-body">
                      <div className="card-title">Filters</div>
                      <div className="row marl">
                        <div className="filter_col col-md-2">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" placeholder="Account Name" name="name" 
                                   onChange={handleChange}/>
                          </div>
                        </div>
                        <div className="filter_col col-md-2">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">City</label>
                            <input type="text" className="form-control" placeholder="City" name="city" 
                            onChange={handleChange}/>
                          </div>
                        </div>
                        <input type="hidden" name="tab_status" id="tab_status" value="Open" />
                        <div className="filter_col col-md-2">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Tags</label>
                            <Select 
                            className="react_select"
                            isMulti 
                            options={tags}
                            onChange={handleChangeTag}
                            />
                          </div>
                        </div>
                        <div className="filter_col col-lg-2">
                          <div className="form-group buttons_row">
                            <button className="btn btn-primary mr-1 save" type="submit" onClick={getFilteredAccounts}>Search</button>
                            <a className="btn btn-default clear" onClick={clearSearchResults}>Clear</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
                                                
          
          <div className="filter_row row marl">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <div className="table_container_row row marl no-gutters">
                <div className="col-md-12">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">                                        
                    <li className="nav-item" onClick={() => {setStatus(true)}}>                      
                      <a className="nav-link active" id="open-tab" data-toggle="tab" href="#open" role="tab" aria-controls="open" aria-selected="true">Active ({(openAccounts) ? openAccounts.length: 0})</a>
                    </li>                    
                    <li className="nav-item" onClick={() => {setStatus(false)}}>                      
                      <a className="nav-link" id="close-tab" data-toggle="tab" href="#close" role="tab" aria-controls="close" aria-selected="false">Closed ({(closedAccounts) ? closedAccounts.length: 0})</a>
                    </li>
                  </ul>
                  
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="open" role="tabpanel" aria-labelledby="open">
                      <div className="card">
                        <div className="card-body">
                          <div className="panel-heading-list card-title text-right">                                                        
                            <span className="total_count float-left">Open Accounts - {(openAccounts) ? openAccounts.length: 0}</span>
                            <span className="filter_toggle">
                              <a href="#" className="primary_btn" onClick={toggleFilter}><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
                              </a>
                            </span>
                          </div>
                          <div className="table-responsive">                            
                            { (status) ? displayAccounts("open"): ''}
                          </div>
                          { 
                            (!openAccounts) ? <h6 className="text-center">Loading Open Accounts...</h6> : 
                              (openAccounts && openAccounts.length === 0) ? <h6 className="text-center">No Open Acccount Records Found</h6> : ''                            
                          }
                          <div className="text-center row marl">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="close" role="tabpanel" aria-labelledby="close">
                      <div className="card">
                        <div className="card-body">
                          <div className="panel-heading-list card-title text-right">                                                        
                            <span className="total_count float-left">Closed Accounts - {(closedAccounts) ? closedAccounts.length: 0}</span>
                            <span className="filter_toggle ">
                              <a href="#" className="primary_btn" onClick={toggleFilter}><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>                              
                              </a>
                            </span>
                          </div>
                          <div className="table-responsive">
                            { (!status) ? displayAccounts("close"): ''}
                          </div>                          
                          { 
                            (!closedAccounts) ? <h6 className="text-center">Loading Closed Accounts...</h6> : 
                              (closedAccounts && closedAccounts.length === 0) ? <h6 className="text-center">No Closed Acccount Records Found</h6> : ''                            
                          }
                          <div className="text-center row marl">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br clear="all" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Container */}

        { displayModalForAccounts() }
        
        
      </div>

  )
}

export default Accounts;