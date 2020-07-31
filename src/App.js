import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/Header';
import Home from './Home';
import Login from './auth/Login';
import ValidateDomain from './auth/ValidateDomain';
import Register from './auth/Register';
import Dashboard from './crm/Dashboard';
import ForgotPassword from './auth/ForgotPassword';
import Accounts from './crm/Accounts';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route sensitive path={'/'} component={Header} />
          <Route sensitive path={'/dashboard'} component={Dashboard} />
          <Route sensitive path={'/accounts'} component={Accounts} />
          <Route sensitive path={'/validate-domain'} component={ValidateDomain} />
          <Route sensitive path={'/login'} component={Login} />
          <Route sensitive path={'/register'} component={Register} />
          <Route sensitive path={'/password-reset'} component={ForgotPassword} />
          <Route exact sensitive path={'/'} component={Home} />
        </div>
      </Router>
    </div>
  );
}

export default App;
