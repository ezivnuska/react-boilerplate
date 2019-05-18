import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNUP_USER } from 'queries'
import * as Cookies from 'es-cookie'
import { Form } from 'components'

import './SignupForm.scss'

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  error: '',
}

class SignupForm extends PureComponent {
  state = {
    ...initialState,
  }

  componentWillMount() {
    this.handleChange = this.handleChange.bind(this)
  }

  clearState() {
    this.setState({...initialState})
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(e, signupUser) {
    e.preventDefault()
    signupUser()
    .then(async ({ data }) => {
      Cookies.set('token', data.signUPUser.token)
      await this.props.refetch()
      this.clearState()
      this.props.history.push('/dashboard')
    })
    .catch(error => {
      this.setState({
        error: error.graphQLErrors.map(x => x.message)
      })
      console.log('ERR =>', error.graphQLErrors.map(x => x.message))
    })
  }

  validateForm() {
    const { email, password, password_confirm } = this.state
    const isInvalid = !email || !password || password !== password_confirm
    return isInvalid
  }

  render() {
    const { email, error, password, username } = this.state

    return (
      <Mutation mutation={SIGNUP_USER} variables={{ email, password, username }}>

        {(signupUser, { data, loading, error }) => {

          return (
            <Form
              error={error}
              onSubmit={event => this.handleSubmit(event, signupUser)}
              title='Sign Up'
              disabled={loading || this.validateForm()}
            >
              <div className='form-input'>
                <input type='email' name='email' placeholder='Email' value={email} onChange={this.handleChange} />
              </div>

              <div className='form-input'>
                <input type='username' name='username' placeholder='Username' value={username} onChange={this.handleChange} />
              </div>

              <div className='form-input'>
                <input type='password' name='password' placeholder='Password' value={password} onChange={this.handleChange} />
              </div>

              <div className='form-input'>
                <input type='password' name='password_confirm' placeholder='Password' value={password} onChange={this.handleChange} />
              </div>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default SignupForm
