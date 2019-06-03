import React, { Fragment, PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { Helmet } from 'react-helmet'
import { Heading, Menu, UserProfile } from 'components'
import ProfileEditor from './profile/ProfileEditor'
import UpdateAccount from './profile/UpdateAccount'

import './Profile.scss'

class Profile extends PureComponent {

  head() {
    return (
      <Helmet bodyAttributes={{ class: 'profilePage' }}>
        <title>Profile</title>
      </Helmet>
    )
  }

  render = () => {
    const { username } = this.props.session.getCurrentUser

    return (
      <Fragment>
        {this.head()}
        
        <Heading level={1}>{username}</Heading>
        
        <Menu
          inline
          itemHeight={40}
          options={[
            { label: 'Profile', to: '/profile' },
            { label: 'Edit Profile', to: '/profile/edit' },
            { label: 'Update Account', to: '/profile/account' }
          ]}
        />

        <Route path='/profile' exact render={() => <UserProfile {...this.props} />} />
        <Route path='/profile/edit' exact render={() => <ProfileEditor {...this.props} />} />
        <Route path='/profile/account' exact render={() => <UpdateAccount {...this.props} />} />

      </Fragment>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Profile))
