import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Leads from './Leads'
import Lead from './createLead/index'

export const LeadRoutes = () => {
  return (
    <Switch>
      {/* <Route exact path="/home/leads" component={Leads}/> */}
      {/* <Route exact path="/home/leads/new" component={Lead}/>       */}
    </Switch>
  )
}

export default LeadRoutes