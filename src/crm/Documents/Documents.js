import React, {useState} from 'react';
import TextInput from '../UIComponents/Inputs/TextInput';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import TextDisplay from '../UIComponents/Display/TextDisplay';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import { statuses } from '../optionsData';

export default function Documents(props) {

  const [isFilterAvailable, setIsFilterAvailable] = useState(false);
  const [filterObject, setFilterObject] = useState({title: '', status: '', sharedTo: []});
  const [sharedTo, setSharedTo] = useState([]);

  const toggleFilter = () => {       
    setIsFilterAvailable(!isFilterAvailable);
  }

  const handleChange = (e) => {

  }

  const ReactSelectHandleChange = (e, filter) => {

  }

  return (
    <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
      <div className="main_container">

        <div className="row marl">
          <div className="col-lg-12 text-right">            
            <span className="d-inline mr-1"><a className="primary_btn" href="/documents/create/"><svg className="svg-inline--fa fa-plus fa-w-14 svg-size fa-plus-svg" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>Add New Document</a></span>
          </div>
        </div>

        <div className="filter_row list_filter_row row marl" style={{display: (isFilterAvailable) ? 'block': 'none'}}>        
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <form id="docs_filter" method="POST" action="">
                  <div className="card-body">
                    <div className="card-title">Filters</div>
                    <div className="row marl">                                            
                        <TextInput  elementSize="col-md-4"  labelName="Title"  attrName="title"  attrPlaceholder="Title"  inputId="id_title" 
                                    value={filterObject.title} getInputValue={handleChange} />                                                                      
                        <SelectComponent  elementSize="col-md-2" labelName="Status" attrName="status" attrId="id_source" options={statuses} 
                                    value={filterObject.status} getInputValue={handleChange} />
                        <ReactSelect elementSize="col-md-3" labelName="Shared To" isMulti={true} options={sharedTo} 
                                    value={filterObject.sharedTo} getChangedValue={(e) => ReactSelectHandleChange(e, 'sharedTo')}/>                                            
                      <div className="filter_col col-3">
                        <div className="form-group buttons_row">
                          <button className="btn btn-primary save mr-1" type="button">Search</button>
                          <a href="/documents/" className="btn btn-default clear">Clear</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      
      {/* Start of display documents */}
        <div className="table_container_row row marl ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="panel-heading-list card-title text-right">
                  <span className="total_count float-left">Documents - 1</span>
                  <span className="filter_toggle "> <a href="#" className="primary_btn" onClick={toggleFilter}><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg></a></span>
                </div>                                    
                
                <div className="document-induvidual col-sm-6 col-md-4 col-lg-3 col-xl-3 border my-3 ml-2">

                  <div className="row">
                    <div className="col-12">
                      <a data-toggle="modal" href="#" data-target="exampleModalCenter_doc34">
                        <p className="pt-2 font-weight-bold text-dark">Testing File One</p>
                      </a>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-4">
                      <img className="rounded-circle" src="https://bottlecrm.s3.amazonaws.com/images/user.png" title="domain4@gmail.com" width="60" height="60"/>
                    </div>
                    <div className="col-lg-8">
                      <div title="Dec. 7, 2020, 11:38 a.m."><b>Created On: </b>2 hours ago</div>
                      <div><b>Status: </b>active</div>
                      <div><b>Shared To: </b>
                        <a href="/users/1044/view/">
                          <img className="rounded-circle mr-1" src="https://bottlecrm.s3.amazonaws.com/images/user.png" title="domain4@gmail.com" width="20" height="20"/>
                        </a>
                        <a href="/users/1176/view/">
                          <img className="rounded-circle mr-1" src="https://bottlecrm.s3.amazonaws.com/images/user.png" title="domian5@gmail.com" width="20" height="20"/>
                        </a>
                        <a href="/users/1177/view/">
                          <img className="rounded-circle" src="https://bottlecrm.s3.amazonaws.com/images/user.png" title="domain6@gmail.ocm" width="20" height="20"/>
                        </a>
                      </div>                      
                    </div>
                  </div>

                  <div className="row pt-2 ml-3 pb-2">
                    <div className="col-6 offset-6">
                      <span>
                        <div className="actions">
                          <a href="/documents/34/view/" className="view_icon text-info ml-3" title="View"><svg className="svg-inline--fa fa-eye fa-w-18 edit_delete_options" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg></a>
                          <a href="/documents/34/edit/" className="edit_icon text-warning ml-3" title="Edit"><svg className="svg-inline--fa fa-pencil-alt fa-w-16 edit_delete_options" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg></a>
                          <a href="/documents/34/delete/" className="delete_icon remove_document text-danger ml-3" title="Delete"><svg className="svg-inline--fa fa-trash-alt fa-w-14 edit_delete_options" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg></a>                                          
                          <a href="/documents/34/download/" className="download_icon text-success ml-3" title="Download"><svg className="svg-inline--fa fa-download fa-w-16 edit_delete_options" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg></a>                        
                        </div>
                      </span>
                    </div>
                  </div>

                </div>

              
              </div>
            </div>
          </div>
        </div>
{/* End of display documents */}

        {/* Modal */}
      <div className="modal fade" id="exampleModalCenter_doc34" tabIndex="-1" role="dialog" 
          aria-labelleby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">testing file One</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="card">
                <div className="card-body">
                  <div className="row amrl no-gutters">
                    <div className="col-lg-8">
                      <TextDisplay/>
                      <TextDisplay/>
                      <TextDisplay/>
                      <TextDisplay/>
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
