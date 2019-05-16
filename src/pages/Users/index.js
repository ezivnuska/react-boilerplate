import React, { Fragment, PureComponent } from 'react'
import { GET_ALL_USERS } from 'queries'
import { Query } from 'react-apollo'
import withSession from 'hoc/withSession'
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

  renderUserSignature = user => {
    const { username } = this.props.session.getCurrentUser
    const isCurrentUser = user.username === username
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
    return (
      <>
        <Heading level={1}>Users</Heading>
        <div className='container'>
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
                    <ul className='users'>
                      {data.getAllUsers.map((user, index) => (
                        <li key={index}>
                          {this.renderUserSignature(user)}
                        </li>
                      ))}
                    </ul>
                  }
                </div>
              )
            }}
          </Query>
        </div>
      </>
    )
  }
}

export default withSession(Users)
