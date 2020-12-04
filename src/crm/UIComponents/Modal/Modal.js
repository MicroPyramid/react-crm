import React from 'react';
import {timeFromNow} from '../../Utilities';
import TextDisplay from '../Display/TextDisplay';
import ArrayDisplay from '../Display/ArrayDisplay';

export default function Modal(props) {  

  let { data, index } = props;  

  return (
      
    <div className="modal fade" id={`exampleModalCenter_account${data.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">{data.name}</h5>
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
                              <TextDisplay  elementSize="col-md-12" labelName="Name" attrId="account_name" attrFor="id_name"
                                            value={data.name}
                                            />
                              <TextDisplay  elementSize="col-md-12" labelName="Phone" attrId="account_phone" attrFor="id_phone"
                                            value={data.phone}
                                            />
                              <TextDisplay  elementSize="col-md-12" labelName="Status" attrId="account_status" attrFor="id_status"
                                            value={data.status}
                                            />                                                                              
                            </div>

                            <div className="col-md-4">
                              <TextDisplay  elementSize="col-md-12" labelName="Email" attrId="account_email" attrFor="id_email"                                             
                                              value={data.email}
                                              />
                              <TextDisplay  elementSize="col-md-12" labelName="Website" attrId="account_website" attrFor="id_website"                                             
                                            value={data.website}
                                            />    
                              <ArrayDisplay elementSize="col-md-12" labelName="Contacts" attrId="contacts" attrFor="id_contacts" 
                                          value={data.contacts} property="first_name" style="contact"/>
                            </div>  
                            
                            <div className="col-md-4">
                              
                              <TextDisplay  elementSize="col-md-12" labelName="Billing Address" attrId="account_billing_address" attrFor="id_billing_address"                                             
                                            value={data.billing_address_line+', '+data.billing_street+', '+data.billing_city+', '+data.billing_state+', '+data.billing_postcode+', '+data.country}
                                            />

                              <ArrayDisplay elementSize="col-md-12" labelName="Assigned Users" attrId="assigned_to" attrFor="id_assigned_to" 
                                            value={data.assigned_to} property="email" style="assignedUsers"/>                            
                              
                              <ArrayDisplay elementSize="col-md-12" labelName="Tags" attrId="tags" attrFor="id_tags"
                                            value={data.tags} property="name" style="tag"/>
                            </div>                                    
                          </div>  

                          <div className="col-md-12">
                                <div className="created_information">
                                    Created by <b>{data.email}</b> created on <b title="Nov. 19, 2020, 10:16 a.m.">{timeFromNow(data.created_on)}</b>
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
}
