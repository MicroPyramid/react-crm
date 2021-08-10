import React, { lazy } from "react";
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
import ForgotPassword from './app/auth/ForgotPassword'
import AppIndex from './app/index'
import './assets/css/index.css'
import './assets/css/temp.css'

function App() {
  return ( 
    <div className="App">
      <Provider store={store}>
      <Router basename="app">
        <Switch>
          <Route exact path="/login" component={Login} />          
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="/home" component={AppIndex}/>
          <Redirect from="/" to="/login"/>
        </Switch>
      </Router>
      </Provider>
    </div>    
);
}

export default App;