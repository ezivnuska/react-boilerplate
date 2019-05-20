import React, { Fragment, PureComponent } from 'react'
import withAuth from 'hoc/withAuth'
import { Helmet } from 'react-helmet'
import { Heading } from 'components'

import './Dashboard.scss'

class Dashboard extends PureComponent {
  head() {
    return (
      <Helmet bodyAttributes={{ class: 'dashboardPage' }}>
        <title>Dashboard</title>
      </Helmet>
    )
  }

  render() {
    const user = this.props.session.getCurrentUser
    return (
      <Fragment>
        {this.head()}
        <Heading level={1}>Dashboard</Heading>
        <p>{user.username} is logged in.</p>
      </Fragment>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(Dashboard)
