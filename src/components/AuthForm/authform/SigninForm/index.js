import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNIN_USER } from 'queries'
import * as Cookies from 'es-cookie'
import { Form } from 'components'

import './SigninForm.scss'

const initialState = {
  email: '',
  password: '',
  error: null,
}

class SigninForm extends PureComponent {
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

  handleSubmit(e, signinUser) {
    e.preventDefault()
    signinUser()
    .then(async ({ data }) => {
      Cookies.set('token', data.signinUser.token)
      await this.props.refetch()
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({
        error: error.graphQLErrors && error.graphQLErrors.map(x => x.message)
      })
    })
  }

  validateForm() {
    const { email, password } = this.state
    const isInvalid = !email || !password
    return isInvalid
  }

  render() {
    const { email, password } = this.state

    return (
      <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>

        {(signinUser, { data, loading, error }) => {
          return (
            <Form
              error={this.state.error}
              onSubmit={event => this.handleSubmit(event, signinUser)}
              title='Sign In'
              disabled={loading || this.validateForm()}
            >

              <div className='form-input'>
                <input type='email' name='email' placeholder='Email' value={email} onChange={this.handleChange} />
              </div>

              <div className='form-input'>
                <input type='password' name='password' placeholder='Password' value={password} onChange={this.handleChange} />
              </div>

            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default SigninForm
