import React, { Fragment, PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { Heading, Menu, ProfileImage, UserProfile } from 'components'
import AvatarModal from './profile/AvatarModal'
import ProfileEditor from './profile/ProfileEditor'
import UpdateAccount from './profile/UpdateAccount'

import './Profile.scss'

class Profile extends PureComponent {

  componentWillMount() {
    // console.log('Profile', this.props)
  }

  componentWillReceiveProps = nextProps => {
    console.log('nextProps', nextProps)
  }

  render = () => {
    const { context, session } = this.props
    const { bio, username, profileImage } = session.getCurrentUser
    
    return (
      <Fragment>
        
        <Heading level={1}>{username}</Heading>
        
        <Menu
          inline
          itemHeight={40}
          options={[
            { label: 'Profile', to: '/profile' },
            { label: 'Update Account', to: '/profile/account' }
          ]}
        />

        <Route path='/profile' exact render={() => (
          <Fragment>
            <AvatarModal {...this.props} />
            <div onClick={() => context.openModal('avatar')}>
              <ProfileImage size={100} src={profileImage} />
            </div>
            <Heading level={3}>{username}</Heading>
            {bio && bio}
          </Fragment>
        )} />
        <Route path='/profile/account' exact render={() => <UpdateAccount {...this.props} />} />

      </Fragment>
    )
  }

  // render = () => {
  //   const { username } = this.props.session.getCurrentUser

  //   return (
  //     <Fragment>
        
  //       <Heading level={1}>{username}</Heading>
        
  //       <Menu
  //         inline
  //         itemHeight={40}
  //         options={[
  //           { label: 'Profile', to: '/profile' },
  //           { label: 'Edit Profile', to: '/profile/edit' },
  //           { label: 'Update Account', to: '/profile/account' }
  //         ]}
  //       />

  //       <Route path='/profile' exact render={() => <UserProfile {...this.props} />} />
  //       <Route path='/profile/edit' exact render={() => <ProfileEditor {...this.props} />} />
  //       <Route path='/profile/account' exact render={() => <UpdateAccount {...this.props} />} />

  //     </Fragment>
  //   )
  // }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Profile))
