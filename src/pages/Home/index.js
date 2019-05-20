import React, { Fragment, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { AuthForm, Dashboard } from 'components'

import './Home.scss'

class Home extends PureComponent {

  head() {
    return (
      <Helmet bodyAttributes={{ class: 'homePage' }}>
        <title>Home</title>
      </Helmet>
    )
  }

  render() {
    const { session } = this.props
    const user = (session && session.getCurrentUser) ? session.getCurrentUser : null
    
    return (
      <Fragment>
        {this.head()}
        {user
          ? <Dashboard user={user} />
          : <AuthForm {...this.props} />
        }
      </Fragment>
    )
  }
}

export default withRouter(Home)
