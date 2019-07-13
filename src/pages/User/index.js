import React, { Fragment, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import withAuth from 'hoc/withAuth'
import { Query } from 'react-apollo'
import { PROFILE_PAGE } from 'queries'
import { Helmet } from 'react-helmet'
import {
  Heading,
  Html,
  Module,
  ProfileImage,
  Spinner,
  UserMemories
} from 'components'

import './User.scss'

class User extends PureComponent {

  state = {
    username: null
  }

  componentWillMount() {
    const username = this.props.match.params.URL_Param
    this.setState({ username })
  }


  head() {
    const { username } = this.state
    return (
      <Helmet bodyAttributes={{ class: 'profile' }}>
        <title>Profile: {username}</title>
      </Helmet>
    )
  }

  render() {
    const { username } = this.state
    const { context, session } = this.props
    const currentUser = session.getCurrentUser
    
    if (!username) return <div>Loading</div>

    return (
      <Fragment>
        {this.head()}
        <Query
          query={PROFILE_PAGE}
          variables={{ username }}
        >

          {({ data, loading, error }) => {
            
            if (loading) return <Spinner />
            if (error) return <div>Error</div>
            
            const { bio, username, profileImage } = data.profilePage
            
            return (
              <Fragment>
                <div className='user-header'>
                  <ProfileImage
                    size={150}
                    src={profileImage}
                  />
                  <Heading level={3}>{username}</Heading>
                </div>
                {bio ? (
                  <Module title='Bio'>
                    <Html html={bio} />
                  </Module>
                ) : (
                  <div className='text-placeholder'>Oops! {username} has not added a bio.</div>
                )}
                <Module title='Memories'>
                  <UserMemories
                    context={context}
                    currentUser={currentUser}
                    user={data.profilePage}
                  />
                </Module>
              </Fragment>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(User))
