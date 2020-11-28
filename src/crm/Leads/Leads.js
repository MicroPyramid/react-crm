import React, {useState, useEffect} from 'react';
import {timeFromNow} from '../Utilities';
export default function Leads(props) {

  const [openLeads, setOpenLeads] = useState([]);
  const [closedLeads, setClosedLeads] = useState([]);  
  const [status, setStatus] = useState(true);
  const [isDisplay, setIsDisplay] = useState('hide');

  useEffect(() => {    
    setOpenLeads(props.leads.open_leads);
    setClosedLeads(props.leads.close_leads);
  }, []);
   

  const displayAccounts = (status) => {

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
                      <a href={`/accounts/${lead.id}/view/`} className="action__btn-email-a mr-1" title="View" data-account={lead.id} data-account-email={lead.email}  title="Send Mail"
                          data-toggle="modal" data-target="#send_email_to_contacts">
                        <svg className="action__btn action__btn-email svg-inline--fa fa-paper-plane fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>
                      </a>
                      <a href={`/accounts/${lead.id}/view/`} className="action__btn-view-a mr-1" title="View">
                        <svg className="action__btn action__btn-view  svg-inline--fa fa-eye fa-w-18 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>              
                      </a>
                      <a href={`/accounts/${lead.id}/edit/`} className="action__btn-edit-a edit mr-1" title="Edit">
                        <svg className="action__btn action__btn-edit svg-inline--fa fa-pencil-alt fa-w-16 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
                      </a>
                      <a href="/accounts/" className="action__btn-delete-a delete remove_account" title="Delete">
                        <svg className="action__btn action__btn-delete svg-inline--fa fa-trash-alt fa-w-14 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                      </a>
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
                            { (status) ? displayAccounts("open"): ''}                            
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
                            { (!status) ? displayAccounts("close"): ''}
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
