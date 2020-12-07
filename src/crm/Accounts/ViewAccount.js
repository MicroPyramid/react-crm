import React, {useState, useEffect } from 'react';
import moment from 'moment';
import {ACCOUNTS} from '../../common/apiUrls';

export default function ViewAccount(props) {  
  
  const [account, setAccount] = useState();
  const [createOn, setCreatedOn] = useState();
  const [isEditButton, setIsEditButton] = useState(true);
  const [displayEditButton, setDisplayEditButton] = useState('hide');
  const [handleComment, setHandleComment] = useState({comment: ''});
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState({comment: ''});


  useEffect(() => {
    getAccount();
  }, []); 
   
  const getAccount = () => {
    let userId = window.location.pathname.split('/')[2];
    fetch(`${ACCOUNTS}${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      }
    })
    .then (res => res.json())
    .then (res => {
      console.log(res);
      setAccount(res.account_obj);
      let createdDate = new Date(res.account_obj.created_on);
      let date = createdDate.getFullYear() + '' + (createdDate.getMonth()+1) + '' + createdDate.getUTCDate();
      setCreatedOn(moment(date, "YYYYMMDD").fromNow());
    });
  }  
  
  const displayActionButton = () => {        
    (isEditButton) ? setDisplayEditButton('display_edit') : setDisplayEditButton('hide');
    setIsEditButton(!isEditButton);    
  }  

  const submitComment = (e) => {
    e.preventDefault();
    let userId = window.location.pathname.split('/')[2];
    // if (handleComment.comment.trim()) {
    //   setComments([...comments, handleComment.comment]);
    //   setErrors({...errors, comment: ''});
    // } else {
    //   setErrors({...errors, comment: 'This field is required'});
    // }
    console.log(handleComment.comment);
    fetch(`${ACCOUNTS}${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      },
      body: JSON.stringify({        
        id: account.id,
        name: account.name,
        phone: account.phone,
        email: account.email,
        billing_address_line: account.billing_address_line,
        billing_street: account.billing_street,
        billing_city: account.billing_city,        
        billing_state: account.billing_state,
        billing_postcode: account.billing_postcode,
        billing_country: account.billing_country,
        // contacts: 220,        
      })
    })
    .then(res => res.json())
    .then(res => console.log(res));
  }  

  return (
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      {
        (account) ? 
        <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/accounts/">Accounts</a></li>
            <li className="active breadcrumb-item">{account.name}</li>
          </ol>
        </nav> 
        <div className="main_container" id="maincontainer">
          <div className="overview_form_block row marl justify-content-center">
            <div className="col-md-8" id="opacity_block">
            <div className="card">
              <div className="card-body" id="datashow">
                
                <div className="card-title text-right">
                <h5 className="overview">
                  <span className="float-left title title_overview">Overview</span>
                  <span className="" style={{marginTop: "0px"}}>
                    <div className="dropdown buttons_row">
                      <button className="btn_action dropdown-toggle" onClick={displayActionButton}> Actions <span className="caret"></span></button>
                      <a href={`/accounts/${account.id}/edit`} className={`btn_edit ${displayEditButton}`}>Edit</a>
                    </div>
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
                    {/* Created by <b>{account.email}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{`${moment(date, "YYYYMMDD").fromNow()}`}</b> */}
                    Created by <b>{account.email}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{createOn}</b>
                  </div>
               </div>
                                                
              <div className="col-md-12 p-0">

                <div className="card-title">
                  <h5>Comments</h5>
                </div>

                <div className="row marl">
                  <div className="col-md-12">
                    <form id="comment_form" method="POST" enctype="multipart/form-data">
                      <div className="form-group">
                        <div className="dropdown suggest " data-key="@">
                          <div className="dropdown-menu" role="menu"></div>
                        </div>
                        <textarea className="form-control mentions" textarea="" cols="40" rows="3" id="id_comments" name="comment" placeholder="Submit Your Comments Here"                                  
                                  onChange={(e) => setHandleComment({...handleComment, comment: e.target.value})}></textarea>                                  
                        <div>                        
                          <p id="CommentError" style={{ color:"red"}}>{errors.comment}</p>
                        </div>
                        <br/>
                        <div className="buttons_row">
                          <button className="btn btn-default save" style={{textAlign: "center"}} id="comment_submit" type="submit" onClick={submitComment}>Submit</button>
                        </div>
                      </div>
                      
                      <ul className="list-group" id="comments_div">
                        <li className="list-group-item list-row" id="comment34">
                          <div className="list-row-buttons btn-group float-right">
                            <button className="btn primary_btn btn-sm dropdown-toggle" data-toggle="dropdown" type="button" aria-expanded="false">Actions<span className="caret"></span></button>
                            <ul className="dropdown-menu text-center">
                              <li>
                                <a className="action" onclick="edit_comment(34)" >Edit</a>
                              </li>
                              <li>
                                <a className="action" onclick="remove_comment(34)" >Remove</a>
                              </li>
                            </ul>
                          </div>
                          <div className="stream-post-container" id="comment_name34"><pre>comme</pre></div>
                          <div className="stream-container">
                            <pre className="float-left">domain4@gmail.com</pre>
                            <pre className="float-right date" title="Nov. 25, 2020, 12:38 p.m.">5 minutes ago</pre>
                          </div>
                        </li>
                      </ul>
                    </form>
                    
                  </div>
                </div>

              </div>
              
              </div>
            </div>
            </div>
          </div>
        </div>
 
        </>
        

        
        : ''
      }
    </div>
  )
}
