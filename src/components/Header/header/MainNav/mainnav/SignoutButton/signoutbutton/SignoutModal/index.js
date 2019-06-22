import React from 'react'
import { withRouter } from 'react-router-dom'
import * as Cookies from 'es-cookie'
import { ApolloConsumer } from 'react-apollo'
import { Modal } from 'components'

import './SignoutModal.scss'

const handleSignout = (client, history) => {
    Cookies.remove('token')
    client.resetStore()
    history.push('/')
}

const SignoutModal = ({ history, ...props }) => (
  <ApolloConsumer>
    {client => {
      return (
        <Modal title='Sign Out' name='signout' closeable {...props}>
          <div className='signout-modal'>
            <p>Are you sure you want to sign out?</p>

            <div className="form-buttons">
              <button onClick={() => handleSignout(client, history)} className="btn">
                Yes, please sign me out
              </button>
            </div>
          </div>
        </Modal>
      )
    }}
  </ApolloConsumer>
)

export default withRouter(SignoutModal)
