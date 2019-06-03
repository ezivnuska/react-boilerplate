import React, { Fragment, PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import { RESET_PASSWORD } from 'queries'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import { Heading } from 'components'

const initialState = {
  email: '',
  error: ''
}

class ForgotPassword extends PureComponent {

  state = {
    ...initialState
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

  handleSubmit(event, passwordReset) {
    event.preventDefault()
    passwordReset().then(async ({data}) => {
      this.clearState()
      this.props.history.push('/')
    }).catch(error => {
      this.setState({
        error: error.graphQLErrors.map(x => x.message)
      })
      console.error('ERR =>', error.graphQLErrors.map(x => x.message))
    })
  }

  validateForm() {
    const { email } = this.state
    return !email
  }

  head() {
    return (
      <Helmet bodyAttributes={{class: 'accountRecoveryPage'}}>
        <title>Account recovery</title>
      </Helmet>
    )
  }

  render(){

    const { email } = this.state

    return (
      <Fragment>
        {this.head()}
        <Heading level={1}>Account Recovery</Heading>
        <Mutation mutation={RESET_PASSWORD} variables={{ email }}>

          {(passwordReset, { data, loading, error }) => {

            return (

              <form onSubmit={event => this.handleSubmit(event, passwordReset)}>

                <div className='form_wrap'>

                  <p>Please enter the email address associated with your account and we will email you a temporary password.</p>

                  <div className={(this.state.error ? 'error-label' : '')}>
                    {this.state.error}
                  </div>

                  <div className='form_row'>
                    <div className='form_item'>
                      <div className='form-input'>
                        <input type='email' name='email' placeholder='Email' value={email} onChange={this.handleChange.bind(this)} />
                        <span className='bottom_border'></span>
                      </div>
                    </div>
                  </div>

                  <div className='formBottomLinks'>
                    <p>
                      Remembered your password? <NavLink to='/signin'>Sign-in</NavLink>
                    </p>
                  </div>

                  <div className='form-buttons'>
                    <button
                      type='submit'
                      className='btn'
                      disabled={loading || this.validateForm()}
                    >
                      Reset
                    </button>
                  </div>

                </div>

              </form>

            )
          }}

        </Mutation>
      </Fragment>
    )
  }
}

export default withRouter(ForgotPassword)
