import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNUP_USER } from 'queries'
import * as Cookies from 'es-cookie'
import { Form } from 'components'

import './SignupForm.scss'

const initialState = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
  error: '',
}

class SignupForm extends PureComponent {
  state = {
    ...initialState,
  }

  componentWillMount() {
    const { error } = this.props
    if (error) this.setState({ error })
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
      Cookies.set('token', data.signupUser.token)
      await this.props.refetch()
      // this.clearState()
      // this.props.history.push('/dashboard')
    })
    .catch(error => {
      console.log('ERROR', error)
      this.setState({
        error: error.graphQLErrors.map(x => x.message)
      })
      console.log('ERR =>', error.graphQLErrors.map(x => x.message))
    })
  }

  validateForm() {
    const { email, password, passwordConfirm, username } = this.state
    const isInvalid = !email || !username || !password || password !== passwordConfirm
    return isInvalid
  }

  render() {
    const { email, password, passwordConfirm, username } = this.state

    return (
      <Mutation mutation={SIGNUP_USER} variables={{ email, password, username }}>

        {(signupUser, { data, loading, error }) => {

          return (
            <Form
              error={error || this.state.error}
              onSubmit={event => this.handleSubmit(event, signupUser)}
              title='Sign Up'
              disabled={loading || this.validateForm()}
            >
              <div className='form-input'>
                <input type='email' name='email' placeholder='Email' value={email} onChange={e => this.handleChange(e)} />
              </div>

              <div className='form-input'>
                <input type='text' name='username' placeholder='Username' value={username} onChange={e => this.handleChange(e)} />
              </div>

              <div className='form-input'>
                <input type='password' name='password' placeholder='Password' value={password} onChange={e => this.handleChange(e)} />
              </div>

              <div className='form-input'>
                <input type='password' name='passwordConfirm' placeholder='Password' value={passwordConfirm} onChange={e => this.handleChange(e)} />
              </div>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default SignupForm
