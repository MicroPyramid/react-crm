import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import LeadsList from '../leads/LeadsList'
import AddLead from '../leads/AddLead'
import Users from '../users/Users'
import UserDetails from '../users/UserDetails'
import AddContact from '../contacts/AddContact'
import AddUser from '../users/AddUser'
import EditUser from '../users/EditUser'
import AddOrganization from '../Organization/CreateOrganization/Index'
import { service } from '../../service'

const Routes = (props) => {
  
  useEffect(() => {        
    service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')            
      service.get('/api/auth/companies-list/')
        .then(res => {
        })
        .catch(err => {
          if(err.response.status === 401) {
            localStorage.clear()
            window.location = '/login'
          }
        })      
  }, [])

  return(
    <Switch>
      <Route exact path='/home' component={Dashboard}/>
      <Route exact path='/home/leads/' component={LeadsList} />
      <Route exact path='/home/leads/new' component={AddLead} />
      <Route exact path='/home/users/' component={Users}/>
      <Route exact path='/home/users/new' component={AddUser}/>
      <Route exact path='/home/users/:id/edit' component={EditUser}/>
      <Route exact path='/home/users/:id/details' component={UserDetails}/>
      <Route exact path='/home/contacts/new/' component={AddContact}/>
      <Route exact path='/home/companies/new' component={AddOrganization}/>
    </Switch>
  )
}

export default Routes
