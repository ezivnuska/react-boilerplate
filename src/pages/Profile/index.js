import React, { Fragment, PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_USER_PROFILE } from 'queries'
import { Helmet } from 'react-helmet'
import { Route, withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { Heading, Menu, ProfileImage, TextEditor, UserProfile } from 'components'
import AvatarModal from './profile/AvatarModal'
// import ProfileEditor from './profile/ProfileEditor'
import UpdateAccount from './profile/UpdateAccount'

import './Profile.scss'

const initialState = {
  error: '',
  currentUser: null
}

class Profile extends PureComponent {

  state = {
    ...initialState
  }  

  componentWillMount = () => {
    this.props.refetch()
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = this.state
    const updatedUser = nextProps.session.getCurrentUser
    
    if (currentUser !== updatedUser) {
      this.setState({ currentUser: updatedUser })
    }
  }

  head() {
    const { username } = this.props.session.getCurrentUser
    return (
      <Helmet bodyAttributes={{ class: 'profile' }}>
        <title>Profile: {username}</title>
      </Helmet>
    )
  }

  render = () => {
    const { context, session } = this.props
    const { username } = session.getCurrentUser
    
    return (
      <Fragment>
        {this.head()}
        <Query query={GET_USER_PROFILE}>
      
        {({ data, loading, error }) => {
    
          if (loading) return <div>Loading</div>
          if (error) return <div>error</div>

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
                    <ProfileImage size={100} src={data.getUserProfile.profileImage} />
                  </div>
                  <Heading level={3}>{username}</Heading>
                  {data.getUserProfile && <TextEditor initialValue={data.getUserProfile.bio} />}
                </Fragment>
              )} />
              <Route path='/profile/account' exact render={() => <UpdateAccount {...this.props} />} />
            </Fragment>
          )
        }}
        </Query>
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
