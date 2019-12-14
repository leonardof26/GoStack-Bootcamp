import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import SignIn from '../pages/SignIn'

import MembershipList from '../pages/Membership/List'
import MembershipCreate from '../pages/Membership/Create'
import MembershipUpdate from '../pages/Membership/Update'

import PlansList from '../pages/Plans/List'
import PlansCreate from '../pages/Plans/Create'
import PlansUpdate from '../pages/Plans/Update'

import StudentsList from '../pages/Students/List'
import StudentsCreate from '../pages/Students/Create'
import StudentsUpdate from '../pages/Students/Update'

import HelpOrders from '../pages/HelpOrders'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/memberships/list" component={MembershipList} isPrivate />
      <Route path="/memberships/new" component={MembershipCreate} isPrivate />
      <Route
        path="/memberships/:id/modify"
        component={MembershipUpdate}
        isPrivate
      />

      <Route path="/plans/list" component={PlansList} isPrivate />
      <Route path="/plans/new" component={PlansCreate} isPrivate />
      <Route path="/plans/:id/modify" component={PlansUpdate} isPrivate />

      <Route path="/students/list" component={StudentsList} isPrivate />
      <Route path="/students/new" component={StudentsCreate} isPrivate />
      <Route path="/students/:id/modify" component={StudentsUpdate} isPrivate />

      <Route path="/helporders" component={HelpOrders} isPrivate />
    </Switch>
  )
}
