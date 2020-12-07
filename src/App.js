import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/Header';
import Home from './Home';
import Login from './auth/Login';
import ValidateDomain from './auth/ValidateDomain';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import Dashboard from './crm/Dashboard';
import Accounts from './crm/Accounts/Accounts';
import AddAccount from './crm/Accounts/AddAccount';
import EditAccount from './crm/Accounts/EditAccount';
import ViewAccount from './crm/Accounts/ViewAccount';
import Contacts from './crm/Contacts/Contacts';
import AddContact from './crm/Contacts/AddContact';
import EditContact from './crm/Contacts/EditContact';
import ViewContact from './crm/Contacts/ViewContact';
import Leads from './crm/Leads/Leads';
import AddLead from './crm/Leads/AddLead';
import EditLead from './crm/Leads/EditLead';
import Documents from './crm/Documents/Documents';
import AddDocument from './crm/Documents/AddDocument';
import EditDocument from './crm/Documents/EditDocument';
import ViewDocument from './crm/Documents/ViewDocument';
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
    Promise.all([
      fetch(`${ACCOUNTS}`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `jwt ${localStorage.getItem('Token')}`, company: `${localStorage.getItem('SubDomain')}`, } }),
      fetch(`${CONTACTS}`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `jwt ${localStorage.getItem('Token')}`, company: `${localStorage.getItem('SubDomain')}`, } }),
      fetch(`${LEADS}`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `jwt ${localStorage.getItem('Token')}`, company: `${localStorage.getItem('SubDomain')}`, } })        
      ])
      .then(async([res1, res2, res3]) => {
        const accounts = await res1.json();
        const contacts = await res2.json();
        const leads = await res3.json();
        setAccounts(accounts);
        setContacts(contacts);
        setLeads(leads);
      })      
  }
  
  
  return (    
    <div className="App">
      <Router>
        <div>
          <Route sensitive path={'/'} component={Header} />
          <Route sensitive path={'/validate-domain'} component={ValidateDomain} />
          <Route sensitive path={'/login'} component={Login} />
          <Route sensitive path={'/register'} component={Register} />
          <Route sensitive path={'/password-reset'} component={ForgotPassword} />

          <Route sensitive path={'/dashboard'} component={Dashboard} />

          <Route sensitive exact path={'/accounts'} 
                  component={ (routerProps) => <Accounts {...routerProps} accounts={accounts}/>} />
          <Route sensitive path={'/accounts/create'} 
                  component={ (routerProps) => <AddAccount {...routerProps} contacts={contacts} leads={leads}/>} />
          <Route sensitive path={'/accounts/:id/edit'} 
                  component={ (routerProps) => <EditAccount {...routerProps} contacts={contacts} leads={leads}/>} />
          <Route sensitive path={'/accounts/:id/view'} 
                  component={ (routerProps) => <ViewAccount {...routerProps} accounts={accounts}/>} />
                  
          <Route sensitive exact path={'/contacts'} component={Contacts} />
          <Route sensitive path={'/contacts/create'} component={AddContact} />
          <Route sensitive path={'/contacts/:id/edit'} component={EditContact} />
          <Route sensitive path={'/contacts/:id/view'} component={ViewContact} />

          <Route sensitive exact path={'/leads'}
                 component={ (routerProps) => <Leads leads={leads}/>} />
          <Route sensitive path={'/leads/create'}
                 component={ (routerProps) => <AddLead leads={leads}/>} />
          <Route sensitive path={'/leads/:id/edit'}
                 component={ (routerProps) => <EditLead leads={leads}/>} />
          
          <Route sensitive exact path={'/documents'} component={Documents}/>
          <Route sensitive path={'/documents/create'} 
                 component={ (routerProps) => <AddDocument {...routerProps} /> } />
          <Route sensitive path={'/documents/:id/edit'} 
                 component={ (routerProps) => <EditDocument {...routerProps} /> } />
          <Route sensitive path={'/documents/:id/view'}
                 component={ (routerProps) => <ViewDocument {...routerProps}/>} />
          <Route exact sensitive path={'/'} component={Home} />
        </div>
      </Router>
    </div>    
  );
}

export default App;
