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

const initialState = {
  bio: ''
}

class BioEditor extends PureComponent {

  state = {
    ...initialState
  }

  componentDidMount() {
    const { profile } = this.props
    if (profile) {
      this.setState({
        bio: profile.bio
      })
    }
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

  handleEditorChange(bio) {
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
      <Mutation
        mutation={EDIT_PROFILE}
        variables={{ email, bio, firstname, lastname }}
        refetchQueries={() => [
          { query: GET_USER_PROFILE },
          { query: PROFILE_PAGE, variables: { username } }
        ]}>

        {(editProfile, { data, loading, error }) => {

          return (

            <form onSubmit={event => this.handleSaveBio(event, editProfile)}>

              <div className='form_wrap editBioForm'>

                <div className={{ 'error-label': this.state.error != '' }}>
                  {this.state.error}
                </div>

                <div className='form_row'>
                  <CKEditor
                    value={bio}
                    onChange={this.handleEditorChange.bind(this)}
                    config={{ extraAllowedContent: 'div(*) p(*) strong(*)' }}
                  />
                </div>

                <div className='form-buttons'>
                  <button type='submit' className='btn'
                    disabled={loading}>
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          )
        }}

      </Mutation>
    )
  }
}

export default withRouter(BioEditor)
