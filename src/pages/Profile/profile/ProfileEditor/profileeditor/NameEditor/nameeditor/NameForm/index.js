import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import {
  EDIT_PROFILE,
  GET_USER_PROFILE,
  PROFILE_PAGE
} from 'queries'
import { withRouter } from 'react-router-dom'
import toastr from 'toastr'

import { Form } from 'components'

const initialState = {
  firstname: '',
  lastname: ''
}

class NameForm extends PureComponent {

  state = {
    ...initialState
  }

  componentWillMount() {
    const { firstname, lastname } = this.props.session.getCurrentUser
    
    this.setState({
      firstname,
      lastname
    })
  }

  componentDidMount() {
    
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

  handleChange = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(event, editProfile) {
    event.preventDefault()
    editProfile()
    .then(async ({ data }) => {
      await this.props.refetch()
      this.props.cancel()
      toastr.success('We have updated your profile!', 'Saved!')
    }).catch(error => {
      console.log('ERROR:', error)
      this.setState({
        error: error.graphQLErrors.map(x => x.message)
      })
      console.error('ERR =>', error.graphQLErrors.map(x => x.message))
    })
  }

  validateForm() {
    const { firstname, lastname } = this.state
    const user = this.props.session.getCurrentUser
    const isInvalid = firstname === user.firstname && lastname === user.lastname
    return isInvalid
  }

  render() {

    const { firstname, lastname } = this.state
    const { session } = this.props
    const { bio, email, username } = session.getCurrentUser

    return (
      <Mutation
        mutation={EDIT_PROFILE}
        variables={{ email, bio, firstname, lastname }}
        refetchQueries={() => [
          { query: GET_USER_PROFILE },
          { query: PROFILE_PAGE, variables: { username } }
        ]}>

        {(editProfile, { data, loading, error }) => (

          <Form
            error={error}
            onSubmit={event => this.handleSubmit(event, editProfile)}
            disabled={loading || this.validateForm()}
          >

            <div className='form-input'>
              <input type='text' name='firstname' placeholder='First name' defaultValue={firstname} onChange={e => this.handleChange(e)} />
            </div>

            <div className='form-input'>
              <input type='text' name='lastname' placeholder='Last name' defaultValue={lastname} onChange={e => this.handleChange(e)} />
            </div>

          </Form>
        )}

      </Mutation>
    )
  }
}

export default withRouter(NameForm)
