import React, { Component } from 'react';
import { DOMAIN } from '../common';

export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      accounts: [],
      opportunities: [],
      data: []
    }
  }

  componentDidMount() { 
    if (localStorage.getItem('Token')) {
      fetch('https://bottlecrm.com/api/dashboard/',
        { 
          method: 'GET',
          headers:
            {
              'Content-Type': 'application/json',
              Authorization: `jwt ${localStorage.getItem('Token')}`,
              company: `${localStorage.getItem('SubDomain')}`,
            },
        }
      )
        .then((response) => response.json())
        .then(response => {
          this.setState({ data: response }) 
        })
    } else {
      const redirectUrl = `//localhost:3000/validate-domain`;
      window.location.href = redirectUrl;
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
        <div className="row marl justify-content-center">
          <div className="col-md-9">
            <div className="row count_blocks_row">
              <div className="col-md-3">
                <div className="item sky_blue">
                  <a>
                    <div className="title">Accounts</div>
                    <div className="count">{data.accounts_count || 0}</div>
                  </a>
                </div>
              </div>
              <div className="col-md-3">
                <div className="item green">
                  <a>
                    <div className="title">Contacts</div>
                    <div className="count">{data.contacts_count || 0}</div>
                  </a>
                </div>
              </div>
              <div className="col-md-3">
                <div className="item red">
                  <a>
                    <div className="title">Leads</div>
                    <div className="count">{data.leads_count || 0}</div>
                  </a>
                </div>
              </div>
              <div className="col-md-3">
                <div className="item yellow">
                  <a>
                    <div className="title">Opportunities</div>
                    <div className="count">{data.opportunities_count || 0}</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="open_sections row">
              <div className="col-md-6 table_container_row">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <span>Recent Accounts</span>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Tags</th>
                            <th width="40%">Assigned To</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.accounts && data.accounts.length > 0 ? data.accounts.map((account) => 
                            <tr key={account.id}>
                              <td>
                                <div className="text_ellipsis">
                                  <a href="/accounts/2/view/">{account.name}</a>
                                </div>
                              </td>
                              <td style={{ display: 'block' }}>
                                <span className="text-left">No Tags</span>
                              </td>
                              <td>
                                <span className="text-left">None</span>
                              </td>
                            </tr>
                          )
                          :
                            <tr>
                              <td>No data found</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 table_container_row">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <span>Recent Opportunities</span>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Tags</th>
                            <th width="40%">Assigned To</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.opportunities && data.opportunities.length > 0 
                          ? 
                            data.opportunities.map((opportunity) =>
                              <tr key={opportunity.id}>
                                <td>
                                  <div className="text_ellipsis">
                                    <a href="/opportunities/1/view/">{opportunity.name}</a>
                                  </div>
                                </td>
                                {opportunity.tags.length > 0 
                                ?
                                  <td style={{ display: 'block' }}>
                                    <span className="text-left">No Tags</span>
                                  </td>
                                :
                                  <td>No Tags</td>
                                }
                                <td>
                                  <span className="text-left">None</span>
                                </td>
                              </tr>
                            )
                          : 
                            <tr>
                              <td>No data found</td>
                            </tr>
                          }
                        </tbody>
                      </table>
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
}
