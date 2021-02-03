import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/Header';
import Login from './auth/Login';
import ValidateDomain from './auth/ValidateDomain';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import PasswordResetMessage from './auth/PasswordResetMessage';
import Dashboard from './crm/Dashboard';
import Accounts from './crm/Accounts/Accounts';
import AddAccount from './crm/Accounts/AddAccount';
import EditAccount from './crm/Accounts/EditAccount';
import ViewAccount from './crm/Accounts/ViewAccount';

function App (props) {    

    return (
        <div className="App">
            <Router basename="/app">
                <div>
                    <Route sensitive path={'/'} component={Header} />
                    <Route sensitive path={'/validate-domain'} component={ValidateDomain}/>
                    <Route sensitive path={'/login'} component={Login}/>
                    <Route sensitive path={'/register'} component={Register} />
                    <Route exact sensitive path={'/password-reset'}   component={ForgotPassword}/>
                    <Route sensitive path={'/password-reset/done'} component={PasswordResetMessage}/>
                    <Route exact sensitive path={'/'} component={ValidateDomain} />
                                    
                    <Route sensitive path={'/dashboard'} component={Dashboard}/>                    
                                        
                    <Route sensitive exact path={'/accounts'} component={Accounts} />                        
                    <Route sensitive exact path={'/accounts/create'} component={AddAccount} />
                    <Route sensitive exact path={'/accounts/:id/edit'} component={EditAccount} />
                    <Route sensitive exact path={'/accounts/:id/view'} component={ViewAccount} />
                </div>
            </Router>
        </div>
    );
}

export default App;
