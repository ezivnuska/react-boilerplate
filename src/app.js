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
        <Users {...props} session={session} />
      </MainLayout>
    )} />
    <Route path={['/profile', '/profile/edit', '/profile/account']} render={props => (
      <MainLayout>
        <Profile {...props} session={session} />
      </MainLayout>
    )} />
    <Route path='/user/:URL_Param' render={props => (
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
