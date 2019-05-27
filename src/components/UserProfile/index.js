import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PROFILE_PAGE } from 'queries'
import { Query } from 'react-apollo'
import { Module, UserInfo } from 'components'

import './UserProfile.scss'

class UserProfile extends PureComponent {

  static propTypes = ({
    username: PropTypes.string.isRequired
  })

  render() {
    const { username } = this.props
    
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
