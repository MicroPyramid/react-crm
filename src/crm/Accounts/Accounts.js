import React from 'react';
import { useState, useEffect } from 'react';
import {momentTimeFormats} from '../Utilities';
import { ACCOUNTS } from '../../common/apiUrls';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import TextInput from '../UIComponents/Inputs/TextInput';
import MailActionButton from '../UIComponents/ActionButtons/MailActionButton';
import ViewActionButton from '../UIComponents/ActionButtons/ViewActionButton';
import EditActionButton from '../UIComponents/ActionButtons/EditActionButton';
import DeleteActionButton from '../UIComponents/ActionButtons/DeleteActionButton';
import Modal from '../UIComponents/Modal/Modal';
import { getApiResults } from '../Utilities';

const Accounts = (props) => {  
  
  console.log(props);

  const [openAccounts, setOpenAccounts] = useState([]);
  const [closedAccounts, setClosedAccounts] = useState([]);  
  const [filterObject, setFilterObject] = useState({ name: '', city: '', tags: []});
  const [isFilterAvailable, setIsFilterAvailable] = useState(false);
  const [tags, setTags] = useState([]);    
  const [status, setStatus] = useState(true);  

  useEffect(() => {
    setOpenAccounts(props.accounts.open_accounts);
    setClosedAccounts(props.accounts.close_accounts);              
    if(props.history.location.pathname === "/accounts/") {
      updateAccounts();
    }
  }, []);    

  const updateAccounts = () => {
    const resAcc = getApiResults(ACCOUNTS);    
    resAcc.then(res => {
      setOpenAccounts(res.data.open_accounts);
      setClosedAccounts(res.data.close_accounts);
    })
  }

  const stateUpdate = (res) => {    
    setOpenAccounts(res.open_accounts);
    setClosedAccounts(res.closed_accounts);
  }

  const getTags = () => {
    let tagsArray = [];
    props.accounts.tags && props.accounts.tags.map(tag => {
        tagsArray.push({value: tag.name, label: tag.name, tag: tag.name});
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
                                  <th scope="col">ID</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Created By</th>
                                  <th scope="col">City</th>
                                  <th scope="col">State</th>
                                  <th scope="col">Created On</th>
                                  <th scope="col">Tags</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  (accounts && accounts.map( (account, index) => {                                                                                                                                             
                                    let tags = (account.tags.length !== 0 ) ?
                                    account.tags.map( (tag, index) => {
                                        return(
                                          <span className={`text-left color${index+1} tag_class_acc`} id="list_tag">{tag.name}</span>
                                        )
                                    }): 'No Tags';
                                    return(
                                      <tr>
                                        <td scope="col">{index+1}</td>
                                        <td scope="col"><a data-toggle="modal" data-target={`#exampleModalCenter_account${account.id}`} href="#">{account.name}</a></td>
                                        <td scope="col"><img src={account.created_by.profile_pic} alt={account.created_by.username}></img></td>
                                        <td scope="col">{(account.billing_city) ? account.billing_city : 'Not Specified'}</td>
                                        <td scope="col">{(account.billing_state) ? account.billing_state : 'Not Specified'}</td>
                                        <td scope="col" title={momentTimeFormats(account.created_on)[1]}>{momentTimeFormats(account.created_on)[0]}</td>
                                        <td scope="col">{tags}</td>
                                        <td scope="col" className="actions action-flex">
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
    
    let modalOpenAccounts = (openAccounts) ? [...openAccounts] : [];
    let modalClosedAccounts = (closedAccounts) ? [...closedAccounts] : [];
    let mergedModalAccounts = modalOpenAccounts.concat(modalClosedAccounts);
    
    return(
      (mergedModalAccounts && mergedModalAccounts.map( (account, index) => {  
                               
        let accountObject = {          
          name: account.name,
          phone: account.phone,
          email: account.email,
          status: account.status,
          contacts: account.contacts,
          lead: (account.lead !== null) ? account.lead.title : '',
          address: account.billing_address_line+', '+account.billing_city+', '+account.billing_state+', '+account.billing_country+', '+account.billing_postcode,
          contacts: account.contacts,
          tags: account.tags,
        }
        
        return(          
          <Modal
                modalTab="account"
                id={account.id} 
                object={accountObject}
                createdBy={account.created_by.email}
                createdOn={account.created_on}
                />
        )
      }))
    )
  }

  const getFilteredAccounts = (e) => {
    e.preventDefault();    
    
    setOpenAccounts(props.accounts.open_accounts);
    setClosedAccounts(props.accounts.close_accounts);
    
    let filteredResults, trimmedName, trimmedCity, tags, finalFilter = []; 
    let results;
        
    let mergedAccounts = props.accounts.open_accounts.concat(props.accounts.close_accounts);            

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
      results = finalFilter.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))=== i ); 

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

      results = finalFilter.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))=== i );
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

    setOpenAccounts(displayOpenAccounts);
    setClosedAccounts(displayClosedAccounts);
    
  }    

  const clearSearchResults = () => {               
    setOpenAccounts(props.accounts.open_accounts);
    setClosedAccounts(props.accounts.close_accounts);  
    setFilterObject({...filterObject, name: '', city: '', tags: []});
    setIsFilterAvailable(!isFilterAvailable);
  }
    
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
                        <TextInput  elementSize="col-md-2"  labelName="Name"  attrName="name"  attrPlaceholder="Name"  inputId="id_name" 
                                    value={filterObject.name} getInputValue={handleChange} />
                        <TextInput  elementSize="col-md-2"  labelName="City"  attrName="city"  attrPlaceholder="City"  inputId="id_city" 
                                    value={filterObject.city} getInputValue={handleChange} />
                        <ReactSelect  elementSize="col-md-2" labelName="Tags" attrName="tags" isMulti={true} options={tags} 
                                      value={filterObject.tags} getChangedValue={handleChangeTag}/>                       
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
                              (closedAccounts && closedAccounts.length >! 0) ? <h6 className="text-center">No Closed Acccount Records Found</h6> : ''
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

