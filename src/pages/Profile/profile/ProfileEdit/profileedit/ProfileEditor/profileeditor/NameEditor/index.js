import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import {
  EDIT_PROFILE,
  GET_USER_PROFILE,
  PROFILE_PAGE
} from 'queries'
import { withRouter } from 'react-router-dom'
import CKEditor from 'react-ckeditor-wrapper'
import toastr from 'toastr'

import { Form } from 'components'

const initialState = {
  firstname: '',
  lastname: ''
}

class NameEditor extends PureComponent {

  state = {
    ...initialState
  }

  componentDidMount() {
    const { firstname, lastname } = this.props.profile
    
    this.setState({
      firstname,
      lastname
    })
    
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
    editProfile().then(async ({ data }) => {
      toastr.success('We have updated your profile!', 'Saved!')
    }).catch(error => {
      this.setState({
        error: error.graphQLErrors.map(x => x.message)
      })
      console.error('ERR =>', error.graphQLErrors.map(x => x.message))
    })
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

        {(editProfile, { data, loading, error }) => {

          return (

            <Form
              error={error}
              onSubmit={event => this.handleSubmit(event, editProfile)}
              title='Edit Name'
            >

              <div className='form-input'>
                <input type='text' name='firstname' placeholder='First name' defaultValue={firstname} onChange={e => this.handleChange(e)} />
              </div>

              <div className='form-input'>
                <input type='text' name='lastname' placeholder='Last name' defaultValue={lastname} onChange={e => this.handleChange(e)} />
              </div>

              <div className='form_buttons'>
                <button type='submit' className='btn' disabled={loading}>
                  Update
                </button>
              </div>
            </Form>
          )
        }}

      </Mutation>
    )
  }
}

export default withRouter(NameEditor)