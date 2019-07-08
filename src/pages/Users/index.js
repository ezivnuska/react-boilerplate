import React, { Fragment, PureComponent } from 'react'
import { GET_ALL_USERS } from 'queries'
import { Query } from 'react-apollo'
import { Helmet } from 'react-helmet'
import withAuth from 'hoc/withAuth'
import UsersList from './users/UsersList'

import './Users.scss'

class Users extends PureComponent {

  head() {
    return (
      <Helmet bodyAttributes={{ class: 'usersPage' }}>
        <title>Users</title>
      </Helmet>
    )
  }

  render() {
    const { getCurrentUser } = this.props.session
    return (
      <Fragment>
        {this.head()}
        <Query query={GET_ALL_USERS}>

          {({ data, loading, error }) => {

            if (loading) return <div></div>
            if (error) return <div>Error</div>

            return (
              <div className='users'>
                {data.getAllUsers.length
                  ? <UsersList users={data.getAllUsers} currentUser={getCurrentUser} />
                  : <h3>Empty... check back soon!</h3>
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
