import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import withSession from 'hoc/withSession'

import { MainLayout } from 'layouts'

import {
  Dashboard,
  ForgotPassword,
  Home,
  Signout,
  NotFound,
  Users,
  User
} from 'pages'

const Root = ({ refetch, session }) => (
  <Switch>
    <Route path='/' exact render={props => (
      <MainLayout>
        <Home {...props} session={session} refetch={refetch} />
      </MainLayout>
    )} />
    <Route path='/account-recovery' render={props => (
      <MainLayout>
        <ForgotPassword {...props} refetch={refetch} />
      </MainLayout>
    )} />
    <Route path='/users' render={props => (
      <MainLayout>
        <Users {...props} />
      </MainLayout>
    )} />
    <Route path={['/profile/:URL_Param', '/profile/:URL_Param/edit', '/profile/:URL_Param/account']} render={props => (
      <MainLayout>
        <User {...props} session={session} />
      </MainLayout>
    )} />
    <Route path='/' render={props => (
      <MainLayout>
        <NotFound {...props} refetch={refetch} />
      </MainLayout>
    )} />
  </Switch>
)

const AppComponent = withSession(Root)

export default AppComponent
