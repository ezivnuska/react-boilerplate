import React, { Fragment, PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_USER_PROFILE } from 'queries'
import { Helmet } from 'react-helmet'
import { Route, withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import AvatarModal from './profile/AvatarModal'
import BioModal from './profile/BioModal'
import UpdateAccount from './profile/UpdateAccount'
import {
  EditableContainer,
  Heading,
  Html,
  Link,
  Module,
  ProfileImage
} from 'components'

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
                    
                    <div className='profile-header'>
                      <EditableContainer
                        onClick={() => context.openModal('avatar')}
                        style={{ opacity: ((networkStatus === 4 || loading) ? '0.5' : '1') }}
                      >
                        <ProfileImage
                          size={150}
                          src={data.getUserProfile.profileImage}
                        />
                      </EditableContainer>

                      <Heading level={3}>{username}</Heading>

                      <Link to='/profile/account'>Account details</Link>

                    </div>

                    
                    <Module title='Bio'>
                      <EditableContainer
                        onClick={() => context.openModal('bio')}
                        block
                        style={{ opacity: ((networkStatus === 4 || loading) ? '0.5' : '1') }}
                      >
                        <Html html={data.getUserProfile.bio || '<p>Click here to add a bio</p>' } />
                      </EditableContainer>
                    </Module>
                    
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
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(Profile))
