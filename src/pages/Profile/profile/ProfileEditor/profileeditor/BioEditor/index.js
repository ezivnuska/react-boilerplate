import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import {
  EDIT_PROFILE,
  GET_USER_PROFILE,
  PROFILE_PAGE
} from 'queries'
import { withRouter } from 'react-router-dom'
import toastr from 'toastr'
import {
  Form,
  Heading,
  TextEditor
} from 'components'

import './BioEditor.scss'

const initialState = {
  bio: ''
}

class BioEditor extends PureComponent {

  state = {
    ...initialState
  }

  componentWillMount() {
    const { bio } = this.props
    if (bio) {
      this.setState({ bio })
    }
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

  updateBio = bio => {
    this.setState({
      bio
    })
  }

  handleSaveBio(event, editProfile) {
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

    const { bio } = this.state
    const { session } = this.props
    const { email, firstname, lastname, username } = session.getCurrentUser
    
    return (
      <div id='bio-editor'>
        <Heading level={2}>Bio</Heading>
        <Mutation
          mutation={EDIT_PROFILE}
          variables={{ email, bio, firstname, lastname }}
          refetchQueries={() => [
            { query: GET_USER_PROFILE },
            { query: PROFILE_PAGE, variables: { username } }
          ]}>

          {(editProfile, { data, loading, error }) => (
            <Form
              title='Edit About Section'
              error={error}
              onSubmit={event => this.handleSaveBio(event, editProfile)}
              disabled={loading}
              fullwidth
            >

              <div className='form-input'>
                <TextEditor editable initialValue={bio.length ? bio : null} onUpdate={value => this.updateBio(value)} />
              </div>

            </Form>
          )}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(BioEditor)
