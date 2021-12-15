import React, { useEffect } from "react";
import {
  Provider
} from "react-redux";
import store from "./redux/store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import 'antd/dist/antd.css'
import "./assets/css/light-theme.css"
import Login from './app/auth/Login'
import Registration from './app/auth/Registration'
import ForgotPassword from './app/auth/ForgotPassword'
import ForgotPasswordDone from './app/auth/components/ForgotPasswordDone';
import AppIndex from './app/Layout'
import Companies from './app/Companies'
// import './assets/css/index.css'

function App() {  
  
  return ( 
    <div className="App">
      <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/register" component={Registration}/>
          <Route exact path="/login" component={Login} />          
          <Route exact path="/reset-password-done" component={ForgotPasswordDone} />
          <Route exact path="/forgot-password" component={ForgotPassword} />          
          <Route exact path="/companies-list" component={Companies}/>                  
          <Route path="/home" component={AppIndex}/>
          {(window.location.pathname === '/') ? <Redirect to="/login" />: '' }
        </Switch>
      </Router>
      </Provider>
    </div>    
);
}

export default App;