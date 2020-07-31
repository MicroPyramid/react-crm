import React, { Component } from 'react';
import { ACCOUNTS } from '../common';

export default class Accounts extends Component {
  componentDidMount() {
    // this.getAccounts()
  }

  getAccounts(){
    fetch(`${ACCOUNTS}accounts-list/`,
    { method: 'GET',
      headers:
        {
          'Content-Type': 'application/json',
          Authorization: `jwt ${localStorage.getItem('Token')}`,
          company: `${localStorage.getItem('SubDomain')}`,
        },
    })
      .then((res) => res.json())
      .then((res) => {
      })
  }

  render() {
    return (
      <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
        <div className="main_container">
          <div className="row marl">
            <div className="col-lg-12 text-right">
              <span className="d-inline">
                <a className="primary_btn">
                  Add New Account
                </a>
              </span>
            </div>
          </div>
          <div className="filter_row list_filter_row row marl">
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
                            <input type="text" className="form-control" placeholder="Account Name" name="name" />
                          </div>
                        </div>
                        <div className="filter_col col-md-2">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">City</label>
                            <input type="text" className="form-control" placeholder="City" name="city" />
                          </div>
                        </div>
                        <input type="hidden" name="tab_status" id="tab_status" value="Open" />
                        <div className="filter_col col-md-2">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Tags</label>
                            <select className="form-control select2-hidden-accessible" id="id_tag" name="tag" multiple="" data-select2-id="id_tag" tabIndex="-1" aria-hidden="true">
                            </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="3" style={{ width: 'auto' }}><span className="selection">
                            <span className="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="-1" aria-disabled="false">
                              <ul className="select2-selection__rendered">
                                <li className="select2-search select2-search--inline">
                                  <input className="select2-search__field" type="search" tabIndex="0" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false" role="searchbox" aria-autocomplete="list" placeholder="" style={{ width: '0.75em' }} />
                                </li>
                              </ul>
                            </span>
                            </span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                          </div>
                        </div>
                        <div className="filter_col col-lg-2">
                          <div className="form-group buttons_row">
                            <button className="btn btn-primary save" type="submit">Search</button>
                            <a className="btn btn-default clear">Clear</a>
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
                    <li className="nav-item">
                      <a className="nav-link active" id="open-tab" data-toggle="tab" href="#open" role="tab" aria-controls="open" aria-selected="true">Active (0)</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="close-tab" data-toggle="tab" href="#close" role="tab" aria-controls="close" aria-selected="false">Closed (0)</a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="open" role="tabpanel" aria-labelledby="open">
                      <div className="card">
                        <div className="card-body">
                          <div className="panel-heading-list card-title text-right">
                            <span className="total_count float-left">Open Accounts - 0</span>
                            <span className="filter_toggle ">
                              <a className="primary_btn"><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
                              </a>
                            </span>
                          </div>
                          <div className="table-responsive">
                            <table className="table ">
                              <thead>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                          </div>
                          <h6 className="text-center">No Acccount Records Found</h6>
                          <div className="text-center row marl">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="close" role="tabpanel" aria-labelledby="close">
                      <div className="card">
                        <div className="card-body">
                          <div className="panel-heading-list card-title text-right">
                            <span className="total_count float-left">Closed Accounts - 0</span>
                            <span className="filter_toggle ">
                              <a className="primary_btn"><svg className="svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>
                              </a>
                            </span>
                          </div>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                          </div>
                          <h6 className="text-center">No Closed Acccount Records Found</h6>
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
}
