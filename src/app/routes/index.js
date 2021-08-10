import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import LeadRoutes from '../leads'
import Leads from '../leads/Leads'
import Lead from '../leads/createLead/'
import ViewLead from '../leads/ViewLead'
import Users from '../users/Users'
import UserDetails from '../users/UserDetails'
import NewLeadDetails from '../leads/NewLeadDetails'
import AddContact from '../contacts/AddContact'
import UsersList from '../users/Users'
import CreateUsers from '../users/createUser'
import AddOrganization from '../Organization/CreateOrganization/Index'
const Routes = () => {
  return(
    <Switch>
      <Route exact path="/home" component={Home}/>
      {/* <Route exact path="/home/leads" component={LeadRoutes}/>       */}
      <Route exact path="/home/leads" component={Leads}/> 
      <Route exact path="/home/leads/new" component={Lead}/>
      <Route exact path="/home/leads/view" component={ViewLead}/>
      <Route exact path="/home/users/" component={Users}/>
      <Route exact path="/home/users/:id/details" component={UserDetails}/>
      <Route exact path="/home/users/new" component={CreateUsers}/>
      <Route exact path='/home/leads/newLeadDetails' component={NewLeadDetails}/>
      <Route exact path="/home/contacts/new/" component={AddContact}/>
      <Route exact path='/home/companies/new' component={AddOrganization}/>
    </Switch>  
  )
}

export default Routes