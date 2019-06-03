import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import SigninForm from './authform/SigninForm'
import SignupForm from './authform/SignupForm'
import { Link } from 'components'

import './AuthForm.scss'

const initialState = {
  isSignin: true,
  error: null,
}

class AuthForm extends PureComponent {

  state = {
    ...initialState,
  }

  componentWillMount() {
    const { error } = this.props
    if (error) {
      this.setState({ error })
    }
  }

  toggleMode() {
    this.setState({
      isSignin: !this.state.isSignin
    })
  }

  renderForm() {
    const { error } = this.state
    return this.state.isSignin
      ? <SigninForm {...this.props} error={error} />
      : <SignupForm {...this.props} error={error} />
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
