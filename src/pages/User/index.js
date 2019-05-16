import React, { Fragment, PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { Helmet } from 'react-helmet'
import { Heading, Menu } from 'components'
import Profile from './user/Profile'
import ProfileEdit from './user/ProfileEdit'
import UpdateAccount from './user/UpdateAccount'

import './User.scss'

const sections = [
  'profile',
  'edit',
  'account'
]

class User extends PureComponent {

  state = {
    mode: 'profile',
    index: 0
  }

  componentWillMount() {
    const { mode } = this.props
    if (mode) {
      this.setState({ mode })
    }
  }

  head() {
    return (
      <Helmet bodyAttributes={{ class: 'profilePage' }}>
        <title>Profile</title>
      </Helmet>
    )
  }

  changeMode = mode => {
    this.setState({
      mode,
      index: sections.indexOf(mode)
    })
  }

  render = () => {
    const { mode } = this.state
    const { match, refetch, ...props } = this.props

    return (
      <>
        {this.head()}
        <Heading level={1}>{props.session.getCurrentUser.username}</Heading>
        <div className='container'>
          <Menu
            inline
            itemHeight={40}
            options={[
              { label: 'Profile', to: `${match.url}` },
              { label: 'Edit Profile', to: `${match.url}/edit` },
              { label: 'Update Account', to: `${match.url}/account` }
            ]}
          />
          <Route path={match.path} exact render={() => <Profile {...this.props} />} />
          <Route path={`${match.path}/edit`} render={() => <ProfileEdit {...this.props} />} />
          <Route path={`${match.path}/account`} render={() => <UpdateAccount {...this.props} />} />
        </div>
      </>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(User))
