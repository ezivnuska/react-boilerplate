import React, { Fragment, PureComponent } from 'react'
import { GET_ALL_USERS } from 'queries'
import { Query } from 'react-apollo'
import webConfig from 'config'
import { Helmet } from 'react-helmet'
import {
  Heading,
  ProfileImage,
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

  render() {
    return (
      <>
        <Heading level={1}>Users</Heading>
        <div className='container'>
          <Query query={GET_ALL_USERS}>

            {({ data, loading, error }) => {

              if (loading) return <div></div>
              if (error) return <div>Error</div>

              return (
                <div className='users flexbox'>
                  {data.getAllUsers.length == 0 &&
                    <div className='column column_12_12'>
                      <h3>Empty... check back soon!</h3>
                    </div>
                  }
                  {data.getAllUsers.map((user, index) => (
                    <div className='column column_6_12' key={index}>
                      <UserSignature
                        user={user}
                        size={50}
                        to={`profile/${user.username}`}
                      />
                    </div>
                  ))}
                </div>
              )
            }}
          </Query>
        </div>
      </>
    )
  }
}

export default Users
