import React from 'react'
import { withRouter } from 'react-router-dom'
import * as Cookies from 'es-cookie'
import { ApolloConsumer } from 'react-apollo'
import { IconLink } from 'components'

import './SignoutButton.scss'

const handleSignout = (client, history) => {
  Cookies.remove('token')
  client.resetStore()
  history.push('/')
}

const SignoutButton = ({ history, size }) => (
  <ApolloConsumer>
    {client => (
      <div
        id='signout-button'
        className='menu-button'
        onClick={() => handleSignout(client, history)}
      >
        <i className='fas fa-sign-out-alt'></i>
        <span className='text'>Sign out</span>
      </div>
    )}
  </ApolloConsumer>
)

export default withRouter(SignoutButton)
