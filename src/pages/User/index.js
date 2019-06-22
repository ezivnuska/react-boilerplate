import React, { Fragment, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { UserProfile } from 'components'

import './User.scss'

class User extends PureComponent {

  render = () => {
    const { match } = this.props
    const username = match.params.URL_Param
    
    return (
      <Fragment>
        <UserProfile username={username} {...this.props} />
      </Fragment>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(User))
