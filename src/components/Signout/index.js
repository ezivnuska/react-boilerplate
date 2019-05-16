import React from 'react'
import { withRouter } from 'react-router-dom'
import * as Cookies from 'es-cookie'
import { ApolloConsumer } from 'react-apollo'
import { IconLink } from 'components'

import './Signout.scss'

const handleSignout = (client, history) => {
  Cookies.remove('token')
  client.resetStore()
  history.push('/')
}

const Signout = ({ history, size }) => (
  <ApolloConsumer>
    {client => (
      <IconLink
        id='signout-button'
        onClick={() => handleSignout(client, history)}
        iconClass='fas fa-sign-out-alt'
        style={{
          height: size ? size + 'px' : 'auto',
          lineHeight: size ? size + 'px' : 'inherit'
        }}
      >
        Sign out
      </IconLink>
    )}
  </ApolloConsumer>
)

export default withRouter(Signout)
