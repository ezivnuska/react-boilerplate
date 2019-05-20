import React from 'react'
import { Route, Switch } from 'react-router-dom'
import withSession from 'hoc/withSession'

import { MainLayout } from 'layouts'

import {
  ForgotPassword,
  Home,
  NotFound,
  Profile,
  Users,
  User
} from 'pages'

const Root = ({ refetch, session }) => (
  <MainLayout>
    <Switch>
      <Route path='/' exact render={props => (
          <Home {...props} session={session} refetch={refetch} />
      )} />
      <Route path='/account-recovery' render={props => (
        <ForgotPassword {...props} refetch={refetch} />
      )} />
      <Route path='/users' render={props => (
        <Users {...props} session={session} />
      )} />
      <Route path={['/profile', '/profile/edit', '/profile/account']} render={props => (
        <Profile {...props} session={session} refetch={refetch} />
      )} />
      <Route path='/user/:URL_Param' render={props => (
        <User {...props} session={session} />
      )} />
      <Route path='/' render={props => (
        <NotFound {...props} refetch={refetch} />
      )} />
    </Switch>
  </MainLayout>
)

const AppComponent = withSession(Root)

export default AppComponent
