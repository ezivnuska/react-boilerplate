import React, { Fragment, PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  GET_CURRENT_USER
} from 'queries'
import toastr from 'toastr'
import { Helmet } from 'react-helmet'
import { Form, Module } from 'components'

import './UpdateAccount.scss'

const initialState = {
  newEmail: '',
  password: '',
  passwordConfirm: '',
  error: '',
  passwordMatch: null
}

class UpdateAccount extends PureComponent {

  state = {
    ...initialState
  }

  head() {
    const { username } = this.props.session.getCurrentUser
    return (
      <Helmet bodyAttributes={{ class: 'update-account' }}>
        <title>Update Account: {username}</title>
      </Helmet>
    )
  }

  componentWillMount() {
    this.props.refetch()
  }

  componentDidMount(){
    toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': true,
      'progressBar': true,
      'positionClass': 'toast-bottom-right',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }
  }

  clearState() {
    this.setState({...initialState})
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  confirmPW() {
    const { password, passwordConfirm } = this.state
    const isMatch = password !== passwordConfirm && password.length <= 7
    this.setState({
      passwordMatch: isMatch
    })
  }

  validateEmail() {
    const { newEmail } = this.state
    return !newEmail
  }

  validatePassword() {
    const { password, passwordConfirm } = this.state

    const isInvalid = !password || password !== passwordConfirm || password.length <= 2
    return isInvalid
  }

  handleChangeEmail(event, changeEmail) {
    event.preventDefault()
    changeEmail().then(async ({ data }) => {
      toastr.success('We have updated your email!', 'Saved!')
      this.clearState()
    }).catch(error => {
      this.setState({
        error: 'An error has occured.'
      })
    })
  }

  handleChangePassword(event, changePassword) {
    event.preventDefault()
    changePassword().then(async ({ data }) => {
      toastr.success('We have updated your password!', 'Saved!')
      this.clearState()
    }).catch(error => {
      this.setState({
        error: 'An error has occured.'
      })
    })
  }

  render() {

    const { newEmail, password, passwordConfirm } = this.state
    const { getCurrentUser } = this.props.session
    
    return (
      <Fragment>

        {this.head()}

        <Module title='Info'>
          <p><strong>Username:</strong> {getCurrentUser.username}</p>
          <p><strong>Name:</strong> {getCurrentUser.firstname} {getCurrentUser.lastname}</p>
          <p><strong>Email:</strong> {getCurrentUser.email}</p>
        </Module>
        
        <Mutation
          mutation={CHANGE_EMAIL}
          variables={{ currentEmail: getCurrentUser.email, newEmail }}
          refetchQueries={() => [
            {query: GET_CURRENT_USER}
          ]}
        >

          {(changeEmail, { data, loading, error }) => (
            <Form
              title='Change Email'
              error={error}
              onSubmit={event => this.handleChangeEmail(event, changeEmail)}
              disabled={loading || this.validateEmail()}
            >
              
              <div className='form-input'>
                <input type='email' name='newEmail' placeholder='Email' value={newEmail} onChange={this.handleChange.bind(this)} />
              </div>

            </Form>
          )}

        </Mutation>

        <Mutation
          mutation={CHANGE_PASSWORD}
          variables={{ email: getCurrentUser.email, password: password }}
          refetchQueries={() => [
            {query: GET_CURRENT_USER}
          ]}>

          {(changePassword, { data, loading, error }) => (
            
            <Form
              title='Change Password'
              error={error}
              onSubmit={event => this.handleChangePassword(event, changePassword)}
              disabled={loading || this.validatePassword()}
            >

              <div className='form-input'>
                <input type='password' name='password' placeholder='Password' value={password} onChange={this.handleChange.bind(this)} />
              </div>

              <div className='form-input'>
                <input type='password' name='passwordConfirm' placeholder='Password confirm' value={passwordConfirm} onChange={this.handleChange.bind(this)} onBlur={this.confirmPW.bind(this)} />
              </div>

            </Form>
          )}

        </Mutation>

      </Fragment>
    )
  }
}

export default UpdateAccount
