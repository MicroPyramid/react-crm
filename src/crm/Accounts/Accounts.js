import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Select, { createFilter } from 'react-select';

const Accounts = (props) => {
  
  console.log(props);
  const [isTabActive, setIsTabActive] = useState(true);
  const [openAccounts, setOpenAccounts] = useState([]);
  const [closedAccounts, setClosedAccounts] = useState([]);  
  const [filterObject, setFilterObject] = useState({ name: '', city: '', tags: []});
  const [isFilterAvailable, setIsFilterAvailable] = useState(false);
  const [tags, setTags] = useState([]);    
  const [isDisplayFilteredObjects, setIsDisplayFilteredObjects] = useState(true);
  const [displayOpenAccounts, setDisplayOpenAccounts] = useState([]);
  const [displayClosedAccounts, setDisplayClosedAccounts] = useState([]);

  useEffect(() => {        
    setOpenAccounts(props.accounts.open_accounts);
    setClosedAccounts(props.accounts.close_accounts);    
  }, []);  

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

    setDisplayOpenAccounts(displayOpenAccounts);
    setDisplayClosedAccounts(displayClosedAccounts);

    setIsDisplayFilteredObjects(false);
  }    

  const clearSearchResults = () => {    
    setIsDisplayFilteredObjects(true);
  }

  let resDisplayOpenAccounts  = (isDisplayFilteredObjects) ? openAccounts : displayOpenAccounts;
  let resDisplayClosedAccounts  = (isDisplayFilteredObjects) ? closedAccounts : displayClosedAccounts;
    
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
                    <li className="nav-item" onClick={() => {setIsTabActive(true)}}>                      
                      <a className="nav-link active" id="open-tab" data-toggle="tab" href="#open" role="tab" aria-controls="open" aria-selected="true">Active ({(resDisplayOpenAccounts) ? resDisplayOpenAccounts.length: 0})</a>
                    </li>
                    <li className="nav-item" onClick={() => {setIsTabActive(false)}}>                      
                      <a className="nav-link" id="close-tab" data-toggle="tab" href="#close" role="tab" aria-controls="close" aria-selected="false">Closed ({(resDisplayClosedAccounts) ? resDisplayClosedAccounts.length: 0})</a>
                    </li>
                  </ul>
                  
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="open" role="tabpanel" aria-labelledby="open">
                      <div className="card">
                        <div className="card-body">
                          <div className="panel-heading-list card-title text-right">                            
                            <span className="total_count float-left">Open Accounts - {(resDisplayOpenAccounts) ? resDisplayOpenAccounts.length: 0}</span>
                            <span className="filter_toggle">
                              <a href="#" className="primary_btn" onClick={toggleFilter}><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
                              </a>
                            </span>
                          </div>
                          <div className="table-responsive">
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
                                  (resDisplayOpenAccounts && resDisplayOpenAccounts.map( (account, index) => {                                    
                                    let createdDate = new Date(account.created_on);
                                    let date = createdDate.getFullYear() + '' + (createdDate.getMonth()+1) + '' + createdDate.getUTCDate()                                      
                                    
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
                                        <td>{`${moment(date, "YYYYMMDD").fromNow()}`}</td>
                                        <td>{tags}</td>
                                        <td className="actions action-flex">
                                          <a href={`/accounts/${account.id}/view/`} className="action__btn-email-a mr-1" title="View" data-account={account.id} data-account-email={account.email}  title="Send Mail"
                                              data-toggle="modal" data-target="#send_email_to_contacts">
                                            <svg className="action__btn action__btn-email svg-inline--fa fa-paper-plane fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>
                                          </a>
                                          <a href={`/accounts/${account.id}/view/`} className="action__btn-view-a mr-1" title="View">
                                            <svg className="action__btn action__btn-view  svg-inline--fa fa-eye fa-w-18 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>              
                                          </a>
                                          <a href={`/accounts/${account.id}/edit/`} className="action__btn-edit-a edit mr-1" title="Edit">
                                            <svg className="action__btn action__btn-edit svg-inline--fa fa-pencil-alt fa-w-16 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
                                          </a>
                                          <a href="/accounts/" className="action__btn-delete-a delete remove_account" title="Delete">
                                            <svg className="action__btn action__btn-delete svg-inline--fa fa-trash-alt fa-w-14 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                                          </a>
                                        </td>
                                      </tr>
                                    )
                                  }))
                                }
                              </tbody>
                            </table>
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
                            <span className="total_count float-left">Closed Accounts - {(resDisplayClosedAccounts) ? resDisplayClosedAccounts.length: 0}</span>
                            <span className="filter_toggle ">
                              <a href="#" className="primary_btn" onClick={toggleFilter}><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>                              
                              </a>
                            </span>
                          </div>
                          <div className="table-responsive">
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
                                  (resDisplayClosedAccounts && resDisplayClosedAccounts.map( (account, index) => { 
                                    let createdDate = new Date(account.created_on);
                                    let date = createdDate.getFullYear() + '' + (createdDate.getMonth()+1) + '' + createdDate.getUTCDate()                                    

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
                                        <td>{`${moment(date, "YYYYMMDD").fromNow()}`}</td>
                                        <td>{tags}</td>
                                        <td className="actions action-flex">
                                          <a href={`/accounts/${account.id}/view/`} className="action__btn-email-a mr-1" title="View" data-account={account.id} data-account-email={account.email}  title="Send Mail"
                                              data-toggle="modal" data-target="#send_email_to_contacts">
                                            <svg className="action__btn action__btn-email svg-inline--fa fa-paper-plane fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>
                                          </a>
                                          <a href={`/accounts/${account.id}/view/`} className="action__btn-view-a mr-1" title="View">
                                            <svg className="action__btn action__btn-view  svg-inline--fa fa-eye fa-w-18 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>              
                                          </a>
                                          <a href={`/accounts/${account.id}/edit/`} className="action__btn-edit-a edit mr-1" title="Edit">
                                            <svg className="action__btn action__btn-edit svg-inline--fa fa-pencil-alt fa-w-16 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
                                          </a>
                                          <a href="/accounts/" className="action__btn-delete-a delete remove_account" title="Delete">
                                            <svg className="action__btn action__btn-delete svg-inline--fa fa-trash-alt fa-w-14 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                                          </a>
                                        </td>
                                      </tr>
                                    )
                                  }))
                                  
                                }
                              </tbody>
                            </table>
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

        {/* Open Accounts */}
        {
          (openAccounts && openAccounts.map( (account, index) => {
            let createdDate = new Date(account.created_on);
            let date = createdDate.getFullYear() + '' + (createdDate.getMonth()+1) + '' + createdDate.getUTCDate();

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
                                              {(account.lead !== null) ? account.lead.title: ''}
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
                                              Created by <b>{account.email}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{`${moment(date, "YYYYMMDD").fromNow()}`}</b>
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
        }
        
        {/* Closed Accounts */}
        {
          (closedAccounts && closedAccounts.map( (account, index) => {
            let createdDate = new Date(account.created_on);
            let date = createdDate.getFullYear() + '' + (createdDate.getMonth()+1) + '' + createdDate.getUTCDate();

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
                                              <label className="acc_field_label" for="id_website" data-name="name">Lead</label>
                                              <div className="account_field" id="account_website" data-name="name">
                                                {(account.lead !== null) ? account.lead.title: ''}
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
                                                    <p className="modal_contact_name">{contact.first_name}</p>
                                                  )
                                                }))
                                              }
                                          </div>                            
                                        </div>
                                        

                                      </div>                                    
                                    </div>  

                                      <div className="col-md-12">
                                          <div className="created_information">
                                              Created by <b>{account.email}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{`${moment(date, "YYYYMMDD").fromNow()}`}</b>
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
        }
        
      </div>

  )
}

export default Accounts;