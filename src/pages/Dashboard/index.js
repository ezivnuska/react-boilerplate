import React, { Fragment, PureComponent } from 'react'
import withAuth from 'hoc/withAuth'
import { NavLink } from 'react-router-dom'
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
      <>
        {this.head()}
        <Heading level={1}>Dashboard</Heading>
        <div className='container'>
          This is the Dashboard.
        </div>
      </>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(Dashboard)
