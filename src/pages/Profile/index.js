import React, { Fragment, PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_USER_PROFILE } from 'queries'
import { Helmet } from 'react-helmet'
import { Route, withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { Heading, Menu, ProfileImage, TextEditor } from 'components'
import AvatarModal from './profile/AvatarModal'
import BioModal from './profile/BioModal'
import UpdateAccount from './profile/UpdateAccount'

import './Profile.scss'

class Profile extends PureComponent {

  head() {
    const { username } = this.props.session.getCurrentUser
    return (
      <Helmet bodyAttributes={{ class: 'profile' }}>
        <title>Profile: {username}</title>
      </Helmet>
    )
  }

  onUpdate = refetch => {
    refetch()
    this.props.context.closeModal()
  }

  render = () => {
    const { context, session } = this.props
    const { username } = session.getCurrentUser
    
    return (
      <Fragment>
        {this.head()}
        <Query
          query={GET_USER_PROFILE}
          notifyOnNetworkStatusChange
        >
      
          {({ data, loading, error, refetch, networkStatus }) => {
            
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
    
                <Route path='/profile' exact render={() => data.getUserProfile ? (
                  <Fragment>
                                    
                    <AvatarModal
                      onComplete={() => this.onUpdate(refetch)}
                      {...this.props}
                    />
                    
                    <BioModal
                      bio={data.getUserProfile.bio}
                      onComplete={() => this.onUpdate(refetch)}
                      {...this.props}
                    />

                    {error && <div className='error'>{error}</div>}
                    
                    <div
                      onClick={() => context.openModal('avatar')}
                      style={{ opacity: ((networkStatus === 4 || loading) ? '0.5' : '1') }}
                    >
                      <ProfileImage
                        size={75}
                        src={data.getUserProfile.profileImage}
                      />
                    </div>

                    <Heading level={3}>{username}</Heading>
                    
                    <div
                      onClick={() => context.openModal('bio')}
                      style={{ opacity: ((networkStatus === 4 || loading) ? '0.5' : '1') }}
                    >
                      <TextEditor initialValue={data.getUserProfile.bio} editable={false} />
                    </div>

                  </Fragment>
                ) : null} />

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
