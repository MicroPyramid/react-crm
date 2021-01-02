import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './common/Header';
import Home from './Home';
import Login from './auth/Login';
import ValidateDomain from './auth/ValidateDomain';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';

import Accounts from './crm/Accounts';
import User from './users/User'
import UserCreate from './users/UserCreate'
import UserEdit from './users/UserEdit'
import UserDelete from  './users/UserDelete'
import Status from './users/Status'
import ProfileDetails from './profile/ProfileDetails'
import ProfileChangePassword from './profile/ProfileEdit';




import Dashboard from './crm/Dashboard';
import Accounts from './crm/Accounts/Accounts';
import AddAccount from './crm/Accounts/AddAccount';
import EditAccount from './crm/Accounts/EditAccount';
import Contacts from './crm/Contacts/Contacts';
import AddContact from './crm/Contacts/AddContact';
import EditContact from './crm/Contacts/EditContact';
import Leads from './crm/Leads/Leads';
import AddLead from './crm/Leads/AddLead';
import EditLead from './crm/Leads/EditLead';
import { ACCOUNTS, CONTACTS, LEADS } from './common/apiUrls';
import { useState, useEffect } from 'react';


function App() {

  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {    
    getApiData();
  }, []);

  const getApiData = () => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      },
    }
    axios.all([
      axios.get(`${ACCOUNTS}`, config),
      axios.get(`${CONTACTS}`, config),
      axios.get(`${LEADS}`, config)
    ]).then(axios.spread( async (res1, res2, res3) => {
      await setAccounts(res1.data);
      await setContacts(res2.data);
      await setLeads(res3.data);
    }))
  }
  
  
  return (    
    <div className="App">
      <Router >
        <div>
          <Route sensitive path={'/'} component={Header} />
          <Route sensitive path={'/validate-domain'} component={ValidateDomain} />
          <Route sensitive path={'/login'} component={Login} />
          <Route sensitive path={'/register'} component={Register} />
          <Route sensitive path={'/password-reset'} component={ForgotPassword} />

          <Route exact sensitive path={'/'} component={Home} />
          <Route exact path={'/user'} component={User} />
          <Route exact path={'/users/create'} component={UserCreate} />
          <Route exact path={'/users/edit/:id'}  component={UserEdit} />
          <Route exact path={'/users/delete/:id'}  component={UserDelete} />
          <Route exact path={'/users/status/:id'}  component={Status} />
           <Route exact path={'/profile'} component={ProfileDetails} />
          <Route exact path={'/profile/change-password'} component={ProfileChangePassword} />
          



          <Route sensitive path={'/dashboard'} component={Dashboard} />

          <Route sensitive exact path={'/accounts'}
                  component={ (routerProps) => <Accounts {...routerProps} accounts={accounts}/>} />          
          <Route sensitive exact path={'/accounts/create'} component={AddAccount}/>          
          <Route sensitive exact path={'/accounts/:id/edit'} component={EditAccount}/>
          

          <Route sensitive exact path={'/contacts'}
                 component={ (routerProps) => <Contacts {...routerProps} contacts={contacts}/>} />          
          <Route sensitive path={'/contacts/create'} component={AddContact} />
          <Route sensitive path={'/contacts/:id/edit'} component={EditContact} />          

          <Route sensitive exact path={'/leads'}
                 component={ (routerProps) => <Leads leads={leads}/>} />          
          <Route sensitive path={'/leads/create'} component={AddLead} />
          <Route sensitive path={'/leads/:id/edit'} component={EditLead} />          
                    

        </div>
      </Router>
    </div>    
  );
}

export default App;
