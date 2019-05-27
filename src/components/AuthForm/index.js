import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import SigninForm from './authform/SigninForm'
import SignupForm from './authform/SignupForm'
import { Link } from 'components'

import './AuthForm.scss'

const initialState = {
  isSignin: true
}

class AuthForm extends PureComponent {

  state = {
    ...initialState,
  }

  toggleMode() {
    this.setState({
      isSignin: !this.state.isSignin
    })
  }

  renderForm() {
    return this.state.isSignin
      ? <SigninForm {...this.props} />
      : <SignupForm {...this.props} />
  }

  renderBottomLinks() {
    return (
      <div className='bottom-links'>
        <p>Don't have an account? <Link onClick={() => this.toggleMode()}>{this.state.isSignin ? 'Sign Up' : 'Sign In'}</Link></p>
        <p>Forgot your password? <NavLink to='/account-recovery'>Reset here</NavLink></p>
      </div>
    )
  }

  render() {
    return (
      <div id='auth-form'>
        {this.renderForm()}
        {this.renderBottomLinks()}
      </div>
    )
  }
}

export default AuthForm
