import React, { Fragment, PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import SigninForm from './authform/SigninForm'
import SignupForm from './authform/SignupForm'
import { Link } from 'components'

const initialState = {
  isSignin: true
}

class AuthForm extends PureComponent {

  state = {
    ...initialState,
  }

  componentWillMount() {
    // console.log('AuthForm', this.props)
  }

  toggleMode() {
    this.setState({
      isSignin: !this.state.isSignin
    })
  }

  renderForm() {
    // console.log('renderAuthForm>>>', this.props)
    return this.state.isSignin
      ? <SigninForm {...this.props} />
      : <SignupForm {...this.props} />
  }

  renderFormLinks() {
    return (
      <div className='formBottomLinks'>
        <p>Don't have an account? <Link onClick={() => this.toggleMode()}>{this.state.isSignin ? 'Sign Up' : 'Sign In'}</Link></p>
        <p>Forgot your password? <NavLink to='/account-recovery'>Reset here</NavLink></p>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.renderForm()}
        {this.renderFormLinks()}
      </>
    )
  }
}

export default AuthForm
