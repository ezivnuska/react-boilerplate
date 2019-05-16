import React, { Fragment, PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { Helmet } from 'react-helmet'
import { Heading, Menu, UserProfile } from 'components'
import ProfileEdit from './profile/ProfileEdit'
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
    const { match, refetch, ...props } = this.props
    const { username } = props.session.getCurrentUser

    return (
      <>
        {this.head()}
        <Heading level={1}>{username}</Heading>
        <div className='container'>
          <Menu
            inline
            itemHeight={40}
            options={[
              { label: 'Profile', to: '/profile' },
              { label: 'Edit Profile', to: '/profile/edit' },
              { label: 'Update Account', to: '/profile/account' }
            ]}
          />
          <Route path='/profile' exact render={() => <UserProfile username={username} />} />
          <Route path='/profile/edit' exact render={() => <ProfileEdit {...props} />} />
          <Route path='/profile/account' render={() => <UpdateAccount {...props} />} />
        </div>
      </>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Profile))
