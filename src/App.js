import React from "react";
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
import AppIndex from './app/index'
import CompaniesList from './app/CompaniesList'
import './assets/css/index.css'
import './assets/css/temp.css'

function App() {
  return ( 
    <div className="App">
      <Provider store={store}>
      <Router>
        <Switch baseurl="/">
          <Route exact path="/register" component={Registration}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/companies-list" component={CompaniesList}/>
          <Route exact path="/home" component={AppIndex}/> 
          {(window.location.pathname === '/') ? <Redirect to="/login" />: '' }
        </Switch>
      </Router>
      </Provider>
    </div>    
);
}

export default App;