import React, { Component } from 'react';
import { CONTACTS } from '../../common';

export default class Contacts extends Component {
  
  constructor(props) {
    super(props);
    this.state= {
      contacts: [],
      filteredContacts: [],
      isLoading: true,
      isFilterAvailable: false,
      isInitialDisplay: true,
      name: '',
      city: '',
      assignedTo: ''      
    }
  }

  componentDidMount() {
    this.getContacts();
  }
  
  /**
   * @method      getContacts
   * @description Retrives the contacts and updates to state object
   */

  getContacts = () => {
    fetch(`${CONTACTS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt ${localStorage.getItem('Token')}`,
        'company': `${localStorage.getItem('SubDomain')}`,
      }
    })
    .then ( res => res.json())
    .then ( res => {
      console.log(res);
      console.log(res.contact_obj_list);      
      this.setState({contacts: res.contact_obj_list});
      this.setState({isLoading: false})
    });    
  }
  
  
  /**   
   * @method      searchUsers
   * @description searches the contact based on the search criteria and updates the table.
   */

  searchUsers = (e) => {
    e.preventDefault();    
    // TODO : Implement searching users 
  }

  /**
   * @method      displayUsers
   * @description displays the contacts assigned based on isInitialDisplay boolean property
   */

  displayUsers = () => {
    let newContacts = [];
    if (this.state.isInitialDisplay) {
      newContacts = [...this.state.contacts];      
    } else {
      newContacts = [...this.state.filteredContacts];
    }
    let usersList = newContacts.map ((user, index) => {              
    let assigned_to = (user.assigned_to.length !== 0) ?         
          user.assigned_to.map (assigned_user => {
            return (                
                  <a href={`user/${assigned_user.id}/view/`}>
                    <img src={assigned_user.profile_pic} alt={assigned_user.username} title={assigned_user.email} width="40" height="40"></img>
                  </a>                              
            )
          })
        : <td>None</td>
      return(
        <tr style={{textAlign:'center'}}>
          <td scope="col">{index+1}</td>
          <td scope="col"><a href="/#" data-toggle="modal" data-target={`#exampleModalCenter_contact${user.id}`}>{user.first_name +' ' + user.last_name}</a></td>
          <td>{assigned_to}</td>
          <td scope="col">{(user.address.city) ? user.address.city : 'Not Specified'}</td>
          <td scope="col">{(user.address.state) ? user.address.state : 'Not Specified'}</td>
          <td scope="col">{user.created_on_arrow}</td>
          <td scope="col" className="actions action-flex">
            <a href={`/contacts/${user.id}/view/`} className="action__btn-view-a mr-1" title="View">
              <svg className="action__btn action__btn-view  svg-inline--fa fa-eye fa-w-18 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>              
            </a>
            <a href={`/contacts/${user.id}/edit/`} className="action__btn-edit-a edit mr-1" title="Edit">
              <svg className="action__btn action__btn-edit svg-inline--fa fa-pencil-alt fa-w-16 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
            </a>
            <a  href="/contacts/" onClick={(e) => this.deleteContact(e, user.id)} className="action__btn-delete-a delete remove_account " title="Delete">
              <svg className="action__btn action__btn-delete svg-inline--fa fa-trash-alt fa-w-14 svg-size" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
            </a>
          </td>
        </tr>
      )
    })
    return usersList;
  }

  /**
   * @method      deleteContact
   * @description deletes the selected contact   
   */

  deleteContact = (e,id) => {
    e.preventDefault();
    fetch(`${CONTACTS}${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      }
    })
    setTimeout(() => {
      this.getContacts();      
    }, 500);
  }


  /**
   * @method      toggleFilter
   * @description Helps in toggling the Filters
   */

  toggleFilter = () => {    
    this.setState({isFilterAvailable: !this.state.isFilterAvailable});
  }

  /**
   * @method      clearSearch
   * @description clears the search fields
   */
  
  clearSearch = () => {
    this.setState({isInitialDisplay: true});        
    this.setState({name: '', city: '', assignedTo: ''});
  }

  render(){
        
    return(
      <div id="mainbody" className="main_container" style={{ marginTop: '65px' }}>
        <div className="main_container">

          <div className="row marl">
            <div className="col-lg-12 text-right">
              <span className="d-inline">
                <a className="primary_btn" href="/contacts/create/"><svg className="svg-inline--fa fa-plus fa-w-14 svg-size fa-plus-svg" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>Add New Contact</a>
              </span>
            </div>
          </div> 
      
          <div className="filter_row list_filter_row row marl" style={{display: (this.state.isFilterAvailable) ? 'block': 'none'}}>
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <form id="contacts_filter" action="" method="POST">
                    <div className="card-body">
                      <div className="card-title">Filters</div>
                      <div className="row marl mt-2">
                        <div className="filter_col col-md-3">
                          <div className="form-group">
                            <label for="exampleInputEmail1">NAME</label>
                            <input type="text" className="form-control" placeholder="First Name" name="first_name" 
                                   value={this.state.name}
                                   onChange={(e) => this.setState({name: e.target.value})}></input>
                          </div>
                        </div>
                        <div className="filter_col col-md-3">
                          <div className="form-group">
                            <label for="exampleInputEmail1">CITY</label>
                            <input type="text" className="form-control" placeholder="City" name="city" 
                                   value={this.state.city}
                                   onChange={(e) => this.setState({city: e.target.value})}></input>
                          </div>
                        </div>
                        <div className="filter_col col-md-3">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Assigned To</label>                    
                            <input type="text" className="form-control" placeholder="Assigned To" name="assigned_to" 
                                   value={this.state.assignedTo}
                                   onChange={(e) => this.setState({assignedTo: e.target.value})}></input>
                          </div>
                        </div>
                        <div className="filter_col text-center col-3">
                          <div className="form-group buttons_row">
                            <button className="btn btn-primary save mr-1" type="submit" onClick={this.searchUsers}>Search</button>
                            <a className="btn btn-default clear" onClick={this.clearSearch}>Clear</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="table_container_row row marl ">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title text-right">
                    <span className="float-left">Contacts - {this.state.contacts.length}</span>
                    <span className="filter_toggle">
                      <a href="#" className="primary_btn" onClick={this.toggleFilter}><svg className="action__btn-view svg-inline--fa fa-filter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg></a>
                    </span>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        {
                          (this.state.contacts.length !== 0) ?
                            <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Name</th>
                            <th scope="col">Assigned To</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Created On</th>
                            <th scope="col">Actions</th>
                          </tr> : <h6 className="text-center mb-0 p-1"> { ((this.state.isLoading) ? 'Loading Contacts...' : 'No Contact Records Found' ) }</h6>
                        }
                      
                      </thead>
                      <tbody>                        
                        {(!this.state.isLoading) ? this.displayUsers(): ''}
                      </tbody>
                    </table>
                  </div>
                  <div className="marl row text-center">                        
                  </div>
                </div>
              </div>
            </div>
            <br clear="all"/>
          </div>
          
        </div>
      </div>
    )
  }
}