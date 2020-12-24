import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/Header';
import Home from './Home';
import Login from './auth/Login';
import ValidateDomain from './auth/ValidateDomain';
import Register from './auth/Register';
import Dashboard from './crm/Dashboard';
import ForgotPassword from './auth/ForgotPassword';
import Accounts from './crm/Accounts';
import User from './users/User'
import UserCreate from './users/UserCreate'
import UserEdit from './users/UserEdit'
import UserDelete from  './users/UserDelete'
import Settings from './settings/Settings';
import Contacts from './settings/Contacts';
import BlockedDomain from './settings/BlockedDomain';
import BlockedEmail from './settings/BlockedEmail';
import Status from './users/Status'
import ProfileDetails from './profile/ProfileDetails'
import ProfileChangePassword from './profile/ProfileEdit';




function App() {
  return (
    <div className="App">
      <Router >
        <div>
          <Route sensitive path={'/'} component={Header} />
          <Route sensitive path={'/dashboard'} component={Dashboard} />
          <Route sensitive path={'/accounts'} component={Accounts} />
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

          <Route exact path={'/settings'} component={Settings} />
          <Route exact path={'/contacts'} component={Contacts} />
          <Route exact path={'/blockdomain'} component={BlockedDomain} />
          <Route exact path={'/blockemail'} component={BlockedEmail} />
          <Route exact path={'/profile'} component={ProfileDetails} />
          <Route exact path={'/profile/change-password'} component={ProfileChangePassword} />
          

          
        </div>
      </Router>
    </div>
  );
}

export default App;
