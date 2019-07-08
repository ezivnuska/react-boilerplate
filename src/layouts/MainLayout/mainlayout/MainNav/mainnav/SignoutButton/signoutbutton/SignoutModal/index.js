import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import * as Cookies from 'es-cookie'
import { ApolloConsumer, compose, graphql } from 'react-apollo'
import { SIGNOUT_USER } from 'queries';
import { Modal } from 'components'

import './SignoutModal.scss'

class SignoutModal extends PureComponent {
  handleSignout = (client, history) => {
    this.props.signout()
    .then(async () => {
      Cookies.remove('token')
      await client.resetStore()
      history.push('/')
    })
  }

  render() {
    const { history, ...props } = this.props
    return (
      <ApolloConsumer>
        {client => (
          <Modal title='Sign Out' name='signout' closeable {...props}>
            <div className='signout-modal'>
              <p>Are you sure you want to sign out?</p>
  
              <div className='form-buttons'>
                <button onClick={() => this.handleSignout(client, history)} className='btn'>
                  Yes, please sign me out
                </button>
              </div>
            </div>
          </Modal>
        )}
      </ApolloConsumer>
    )
  }
}

const SignoutModalWithMutation = compose(
  graphql(SIGNOUT_USER, { name: 'signout' })
)(SignoutModal)

export default withRouter(SignoutModalWithMutation)
