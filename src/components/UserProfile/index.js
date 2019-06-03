import React, { PureComponent } from 'react'
import { PROFILE_PAGE } from 'queries'
import { Query } from 'react-apollo'
import { Module, UserInfo } from 'components'

import './UserProfile.scss'

class UserProfile extends PureComponent {

  state = {
    username: null,
  }

  componentWillMount() {
    const username = this.props.username || this.props.session.getCurrentUser.username
    if (username) this.setState({ username })
  }

  render() {
    const { username } = this.state
    
    if (!username) return <div>Loading</div>

    return (
      <Query query={PROFILE_PAGE} variables={{ username }}>

        {({ data, loading, error }) => {
          
          if (loading) return <div></div>
          if (error) return <div>Error</div>
          
          const { username } = data.profilePage
          
          return (
            <Module
              id='user-profile'
              title={username}
            >
                <UserInfo user={data.profilePage} />
            </Module>
          )
        }}
      </Query>
    )
  }
}

export default UserProfile
