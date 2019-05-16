import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PROFILE_PAGE } from 'queries'
import { Query } from 'react-apollo'
import { Heading } from 'components'

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

          return (
            <Fragment>
              <Heading level={2}>
                {username}
              </Heading>
              <div dangerouslySetInnerHTML={{__html: data.profilePage.bio}}></div>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default UserProfile
