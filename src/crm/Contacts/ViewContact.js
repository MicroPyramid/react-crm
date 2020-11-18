import React, { Component } from 'react';
import { CONTACTS } from '../../common/apiUrls';

class ViewContact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '', last_name: '', phone: '', email: '',
      assignedTo: '', 
      address_line: '', street: '', city: '', state: '', postcode: '',
      country: '', description: '',      
      contact_attachment: '',
      createdBy: '', createdOn: '',
      userId: '',
      isEditButton: true,
      displayEditButton: 'hide'
    }
  }

  componentDidMount() {
    this.getContact();
  }

  getContact = () => {
    let userId = window.location.pathname.split('/')[2];
    this.setState({userId: userId});
    fetch(`${CONTACTS}${userId}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem('Token')}`,
        'company': `${localStorage.getItem('SubDomain')}`,        
      }
    })
    .then ( res => res.json())
    .then (res => {
      console.log(res);
      this.setState({
        first_name: res.contact_obj.first_name,
        last_name: res.contact_obj.last_name,
        phone: res.contact_obj.phone,
        email: res.contact_obj.email,
        address_line: res.address_obj.address_line,
        street: res.address_obj.street,
        city: res.address_obj.city,
        state: res.address_obj.state,
        postcode: res.address_obj.postcode,
        description: res.address_obj.description,
        createdBy: res.contact_obj.created_by.email,
        createdOn: res.contact_obj.created_on_arrow
    })
    })
  }

  displayActionButton = () => {    
    (this.state.isEditButton) ? this.setState({displayEditButton: 'display_edit'}) : this.setState({displayEditButton: 'hide'})      
    this.setState({isEditButton: !this.state.isEditButton});    
  }

  render() {
    return(
      <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"> <a href="/contacts/">Contacts</a></li>
            <li className="breadcrumb-item active">new one</li>
          </ol>
        </nav>

        {/* Overview */}
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
                      <button className="btn_action dropdown-toggle" onClick={this.displayActionButton}> Actions <span className="caret"></span></button>
                      <a href={`/contacts/${this.state.userId}/edit`} className={`btn_edit ${this.state.displayEditButton}`}>Edit</a>
                    </div>
                  </span>
                </h5>
                </div>
                
                <div className="row marl">
                  <div className="col-md-4">
                    <div className="filter_col col-md-12" id="iname">
                      <div className="form-group">
                        <label className="contact_field_label" for="id_name" data-name="name">Name</label>
                        <div className="contact_field" id="contact_name" data-name="name">{this.state.first_name+' '+this.state.last_name}</div>
                      </div>
                    </div>
                    <div className="filter_col col-md-12">
                      <div className="form-group">
                        <label className="contact_field_label" for="id_phone" data-name="name">Phone</label>
                        <div className="contact_field" id="contact_phone" data-name="name">{this.state.phone}</div>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-4">
                    <div className="filter_col col-md-12">
                      <div className="form-group">
                        <label className="contact_field_label" for="id_email" data-name="name">Email</label>
                        <div className="contact_field" id="contact_email" data-name="name">{this.state.email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="filter_col col-md-12">
                      <div className="form-group">                        
                        <label className="contact_field_label" for="id_address" data-name="name">Billing Address</label>
                        <div className="contact_field" id="contact_address" data-name="name">
                          {this.state.address_line},
                          {this.state.street}, 
                          {this.state.city},
                          {this.state.state},
                          {this.state.postcode},
                          {this.state.country},
                        </div>
                      </div>
                    </div>
                    <div className="filter_col col-md-12">
                      <div className="form-group">
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="created_information">
                      Created by <b>{this.state.createdBy} </b>  
                      created on <b title="Nov. 17, 2020, 7:42 p.m.">{this.state.createdOn}</b>
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
}


export default ViewContact;