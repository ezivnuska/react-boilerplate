import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import withContext from 'hoc/withContext'
import SignoutModal from './signoutbutton/SignoutModal'

import './SignoutButton.scss'

const SignoutButton = ({ context }) => (
  <Fragment>
    <SignoutModal context={context} />
   
    <div
      id='signout-button'
      className='menu-button'
      onClick={() => context.openModal('signout')}
    >
      <i className='fas fa-sign-out-alt'></i>
      <span className='text'>Sign out</span>
    </div>
  </Fragment>
)

export default withContext(withRouter(SignoutButton))
