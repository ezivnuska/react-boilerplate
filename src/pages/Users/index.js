import React, { Fragment, PureComponent } from 'react'
import { GET_ALL_USERS } from 'queries'
import { Query } from 'react-apollo'
import { Helmet } from 'react-helmet'
import withAuth from 'hoc/withAuth'
import UsersList from './users/UsersList'
import {
  Heading,
  UserSignature
} from 'components'

import './Users.scss'

class Users extends PureComponent {

  head() {
    return (
      <Helmet bodyAttributes={{ class: 'usersPage' }}>
        <title>Users</title>
      </Helmet>
    )
  }

  renderUserSignature = user => {
    const { username } = this.props.session.getCurrentUser
    const isCurrentUser = user.username === username
    
    if (!user) return null

    return isCurrentUser ? (
      <UserSignature
        user={user}
        size={50}
        to={'/profile'}
      />
    ) : (
      <UserSignature
        user={user}
        size={50}
        to={`/user/${user.username}`}
      />
    )
  }

  render() {
    const { getCurrentUser } = this.props.session
    return (
      <Fragment>
        {this.head()}
        <Heading level={1}>Users</Heading>
        <Query query={GET_ALL_USERS}>

          {({ data, loading, error }) => {

            if (loading) return <div></div>
            if (error) return <div>Error</div>

            return (
              <div className='users'>
                {data.getAllUsers.length == 0 &&
                  <div>
                    <h3>Empty... check back soon!</h3>
                  </div>
                }
                {data.getAllUsers.length &&
                  <UsersList users={data.getAllUsers} currentUser={getCurrentUser} />
                }
              </div>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(Users)
