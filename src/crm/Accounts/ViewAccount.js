import React, {useState, useEffect } from 'react';
import moment from 'moment';
import {ACCOUNTS} from '../../common/apiUrls';
import TextDisplay from '../UIComponents/Display/TextDisplay';
import ArrayDisplay from '../UIComponents/Display/ArrayDisplay';
import SingleObjectDisplay from '../UIComponents/Display/SingleObjectDisplay';

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

  console.log(account);

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
                      <TextDisplay elementSize="col-md-12" labelName="Name" attrId="account_name" attrDataName="name" value={account.name}/>
                      <TextDisplay elementSize="col-md-12" labelName="Phone" attrId="account_phone" attrDataName="phone" value={account.phone}/>
                      <TextDisplay elementSize="col-md-12" labelName="Status" attrId="account_status" attrDataName="status" value={account.status}/>
                  </div>

                  <div className="col-md-4">
                    <TextDisplay elementSize="col-md-12" labelName="Email" attrId="account_email" attrDataName="email" value={account.email}/>
                    <TextDisplay elementSize="col-md-12" labelName="Website" attrId="account_website" attrDataName="website" value={account.website}/>
                    <SingleObjectDisplay elementSize="col-md-12" labelName="Lead" attrId="account_lead" attrDataName="lead" value={account.lead.title}/>                    
                    <ArrayDisplay elementSize="col-md-12" labelName="Contacts" attrId="contacts" attrFor="id_contacts" attrDataName="contacts"
                                          value={account.contacts} property="first_name" style="contact"/>
                  </div>

                  <div className="col-md-4">
                    <TextDisplay elementSize="col-md-12" labelName="Billing Address" attrId="account_billing_address" attrDataName="billing_address" 
                                value={account.billing_address_line+', '+account.billing_street+', '+account.billing_city+', '+account.billing_state+', '+account.billing_postcode+', '+account.billing_country}/>
                    <ArrayDisplay elementSize="col-md-12" labelName="Assigned Users" attrId="assigned_to" attrFor="id_assigned_to"  attrDataName="assigned_users"
                                          value={account.assigned_to} property="email" style="assignedUsers"/>
                    <ArrayDisplay elementSize="col-md-12" labelName="Tags" attrId="tags" attrFor="id_tags" attrDataName="tags"
                                          value={account.tags} property="name" style="tag"/>
                </div>                                    
              </div> {/* End of card body */}


              <div className="col-md-12">
                  <div className="created_information">
                    {/* Created by <b>{account.email}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{`${moment(date, "YYYYMMDD").fromNow()}`}</b> */}
                    Created by <b>{account.email}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{createOn}</b>
                  </div>
               </div>

              {/* Comments */}
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
            
            <br/>


            {/* Contacts Form */}
            <form method="GET" className="accountdetails_row">
              <div className="table_container_row row marl no-gutters">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="panel-heading-list card-title view-pad">
                        Contacts
                        <a href="/contacts/create/?view_account=232"><svg className="svg-inline--fa fa-plus fa-w-14 pull-right text-black"  aria-hidden="true" focusable="false" data-prefix="fa" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></a>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-condensed">
                          
                          <thead>
                            <tr>
                              <th width="5%" className="text-center">S.No</th>
                              <th width="25%" className="text-center">Contact Name</th>
                              <th width="20%" className="text-center">Phone</th>
                              <th width="25%" className="text-center">Email</th>
                              <th width="25%" className="text-center">Actions</th>
                            </tr>
                          </thead>
                          
                          <tbody>
                            {
                              (account && account.contacts.map((contact, index) => (                              
                                <tr id={`contacts_details${contact.id}`} className="text-center">
                                  <td className="text-center" scope="row">{index+1}</td>
                                  <td className="text-center">{contact.first_name+' '+contact.last_name}</td>
                                  <td className="text-center">{contact.phone}</td>
                                  <td className="text-center">{contact.email}</td>
                                  <td className="actions text-center">
                                    <a href={`/contacts/${contact.id}/view`} className="btn btn-primary text-white mr-1">View</a>
                                    <a href={`/contacts/${contact.id}/edit/?view_account=${contact.id}`} className="btn btn-success btn-success-edit text-white mr-1">Edit</a>
                                    <a href={`/contacts/${contact.id}/delete`} className="btn btn-warning btn-warning-remove text-white">Remove</a>                                    
                                  </td>
                                </tr>
  )))
                            }
                            
                            
                          </tbody>
                        </table>
                      </div>
                      
                    </div>
                  </div>            
                </div>
              </div>
            </form>
            

            </div> {/* end of col-md-8 */}
          </div>
        </div>
 
        </>
        

        
        : ''
      }
    </div>
  )
}
