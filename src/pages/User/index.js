import React, { Fragment, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { Helmet } from 'react-helmet'
import { Heading, UserProfile } from 'components'

import './User.scss'

class User extends PureComponent {

  head() {
    const username = this.props.match.params.URL_Param
    return (
      <Helmet bodyAttributes={{ class: 'userPage' }}>
        <title>{username}</title>
      </Helmet>
    )
  }

  render = () => {
    const { match } = this.props
    const username = match.params.URL_Param

    return (
      <Fragment>
        {this.head()}
        <Heading level={1}>{username}</Heading>
        <div className='container'>
          <UserProfile username={username} />
        </div>
      </Fragment>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(User))
