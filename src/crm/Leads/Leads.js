import React, {useState, useEffect} from 'react';
import {timeFromNow} from '../Utilities';
import { LEADS } from '../../common/apiUrls';
import ViewActionButton from '../UIComponents/ActionButtons/ViewActionButton';
import EditActionButton from '../UIComponents/ActionButtons/EditActionButton';
import DeleteActionButton from '../UIComponents/ActionButtons/DeleteActionButton';


export default function Leads(props) {

  const [openLeads, setOpenLeads] = useState([]);
  const [closedLeads, setClosedLeads] = useState([]);
  const [status, setStatus] = useState(true);
  const [isDisplay, setIsDisplay] = useState('hide');  
  
  useEffect(() => {    
    setOpenLeads(props.leads.open_leads);
    setClosedLeads(props.leads.close_leads);
  }, []);
   
  // Updates the state recevied after deleting
  const stateUpdate = (res) => {
    setOpenLeads(res.open_leads);
    setClosedLeads(res.close_leads);
  }

  const displayLeads = (status) => {

    let leads = (status === "open") ? openLeads : closedLeads;  

    return(
      <table className="table">
        <thead>
          <tr>
            <th width="5%">ID</th>
            <th width="10%">Title</th>
            <th width="10%">Created By</th>
            <th width="10%">Source</th>
            <th width="5%">Status</th>
            <th width="20%">Assigned To</th>
            <th width="20%">Tags</th>
            <th width="5%">Country</th>
            <th width="15%">Created On</th>
            <th width="10%">Actions</th>
          </tr>
        </thead>
        <tbody>
           {
             leads && leads.map( (lead, index) => {
              return(<tr className="text-center" key={lead.id}>
                 <td scope="row">{index+1}</td>          
                 <td><a data-toggle="modal" data-target={`#exampleModalCenter_lead${lead.id}`} href="#">{lead.title}</a></td>
                 <td><a className="text-capitalize" href={`/users/${lead.created_by.id}/view/`}><img src={lead.created_by.profile_pic} alt={lead.created_by.username} style={{width: "40px", height: "40px"}} title={lead.created_by.email}/></a></td>          
                 <td className="text-capitalize">{lead.source}</td>
                 <td className="text-capitalize">{(lead.status) ? lead.status : 'None'}</td>
                 <td>{
                    (lead.assigned_to && lead.assigned_to.length !== 0) ?
                      lead.assigned_to.map( assigned_to => {
                        return(                
                            <a href={`/users/${assigned_to.id}/view/`} key={assigned_to.id}>
                              <img className="text-capitalize" src={assigned_to.profile_pic} alt={assigned_to.username} title={assigned_to.email} width="40" height="40"/>
                            </a>                  
                        )
                      }) : 'None'
                    }</td>
                    <td>
                      <div className="tag_content" id={`leadtag${lead.id}`} data-leadtagcontent={lead.id}>
                        {
                          (lead.tags && lead.tags.length !== 0) ?   
                            lead.tags.map((tag, index) => {
                              return (
                                <span style={{cursor: "pointer"}} className="tag_class_lead_ mr-1" data-leadtag={`${lead.id}${index}`}>
                                  <span className={`text-left color${index+1}`} id="list_tag" data-tag={`${lead.id}${index}`}>
                                    <span data-tag={`${lead.id}${index}`} className="tag_class_lead" >{tag.name}</span>
                                    <span className={`remove_tag ${isDisplay}`} data-tag={`${lead.id}${index}`} data-lead={`${lead.id}`}>                            
                                    </span>
                                  </span>
                                </span>
                              )
                            })
                            : 'No Tags'
                        }
                      </div>
                    </td>
                    <td>{(lead.country) ? lead.country: 'None'}</td>
                    <td title="Nov. 27, 2020, 4:08 p.m.">{timeFromNow(lead.created_on)}</td>
                    <td className="actions action-flex">                        
                        <ViewActionButton object={lead} to="leads"/>
                        <EditActionButton object={lead} to="leads"/>
                        <DeleteActionButton stateUpdate={stateUpdate} openLeads={setOpenLeads} closeLeads={setClosedLeads} api={LEADS} id={lead.id} to="leads"/>
                    </td>
                  </tr>)
             })
           }
        </tbody>
      </table>
    )
  }

  
  return (
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      <div className="main_container">

        <div className="row marl">
          <div className="col-lg-12 text-right">
            <span className="d-inline mr-1"><a className="primary_btn btn-info edit" data-toggle="modal" data-target="#uploadleadfile" href="#"><svg className="svg-inline--fa fa-upload fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>Upload Lead csv file</a></span>
            <a className="primary_btn" href="/leads/create/"><svg className="svg-inline--fa fa-plus fa-w-14 svg-size fa-plus-svg" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>Add New Lead</a>            
          </div>
        </div>

        {/* Filter */}
        <div></div>

        {/*  */}
        <div className="filter_row row marl">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <div className="table_container_row row marl no-gutters">
                <div className="col-md-12">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">                                        
                    <li className="nav-item" onClick={() => {setStatus(true)}}>
                      <a className="nav-link active" id="open-tab" data-toggle="tab" href="#open" role="tab" aria-controls="open" aria-selected="true">Open ({(openLeads) ? openLeads.length : 0})</a>
                    </li>                    
                    <li className="nav-item" onClick={() => {setStatus(false)}}>
                      <a className="nav-link" id="close-tab" data-toggle="tab" href="#close" role="tab" aria-controls="close" aria-selected="false">Closed ({(closedLeads) ? closedLeads.length : 0})</a>
                    </li>
                  </ul>
                  
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="open" role="tabpanel" aria-labelledby="open">
                      <div className="card">
                        <div className="card-body">
                          <div className="panel-heading-list card-title text-right">                            
                            <span className="total_count float-left">Open Leads - {(openLeads) ? openLeads.length : 0}</span>
                            <span className="filter_toggle">
                              <a href="#" className="primary_btn"><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
                              </a>
                            </span>
                          </div>
                          <div className="table-responsive">
                            { (status) ? displayLeads("open"): ''}                            
                          </div>
                          
                          <div className="text-center row marl">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="close" role="tabpanel" aria-labelledby="close">
                      <div className="card">
                        <div className="card-body">
                          <div className="panel-heading-list card-title text-right">                            
                            <span className="total_count float-left">Closed Leads - {(closedLeads) ? closedLeads.length : 0}</span>
                            <span className="filter_toggle ">
                              <a href="#" className="primary_btn"><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>                              
                              </a>
                            </span>
                          </div>

                          <div className="table-responsive">
                            { (!status) ? displayLeads("close"): ''}
                          </div>                                                    

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
    </div>
  )
}
