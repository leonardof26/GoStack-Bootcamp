import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import SignIn from '../pages/SignIn'
import MembershipList from '../pages/Membership/List'
import MembershipForm from '../pages/Membership/Form'
import PlansList from '../pages/Plans/List'
import PlansForm from '../pages/Plans/Form'
import StudentsList from '../pages/Students/List'
import StudentsForm from '../pages/Students/Form'
import HelpOrders from '../pages/HelpOrders'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/memberships/list" component={MembershipList} isPrivate />
      <Route path="/memberships/new" component={MembershipForm} isPrivate />
      <Route
        path="/memberships/:id/modify"
        component={MembershipForm}
        isPrivate
      />

      <Route path="/plans/list" component={PlansList} isPrivate />
      <Route path="/plans/new" component={PlansForm} isPrivate />
      <Route path="/plans/:id/modify" component={PlansForm} isPrivate />

      <Route path="/students/list" component={StudentsList} isPrivate />
      <Route path="/students/new" component={StudentsForm} isPrivate />
      <Route path="/students/:id/modify" component={StudentsForm} isPrivate />

      <Route path="/helporders" component={HelpOrders} isPrivate />
    </Switch>
  )
}
