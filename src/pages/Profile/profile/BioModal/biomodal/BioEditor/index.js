import React, { Fragment, PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import {
  EDIT_PROFILE,
  GET_USER_PROFILE,
  PROFILE_PAGE
} from 'queries'
import { withRouter } from 'react-router-dom'
import toastr from 'toastr'
import {
  Heading,
  Spinner,
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
    this.setState({ bio })
  }

  resetBio = e => {
    e.preventDefault()
    const { bio } = this.props
    this.setState({ bio })
  }

  handleSaveBio(event, editProfile) {
    event.preventDefault()
    editProfile().then(async ({ data }) => {
      this.props.onComplete()
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
    const { email, username } = session.getCurrentUser

    return (
      <div id='bio-editor'>
        <Heading level={2}>Bio</Heading>
        <Mutation
          mutation={EDIT_PROFILE}
          variables={{ email, bio }}
          refetchQueries={() => [
            { query: GET_USER_PROFILE },
            { query: PROFILE_PAGE, variables: { username } }
          ]}>

          {(editProfile, { data, loading, error }) => {
    
            if (error) return <div>error</div>
            
            return (
              <Fragment>
                <TextEditor editable initialValue={bio || (data && data.getCurrentUser.bio)} onUpdate={value => this.updateBio(value)} />
                <div className='form-buttons'>
                  {loading ? <Spinner /> : (
                    <Fragment>
                      <button
                        type='button'
                        onClick={e => this.resetBio(e)}
                        disabled={loading}
                        className='btn transparent'
                      >
                        <i className='fas fa-times-circle fa-3x'></i>
                      </button>
                      <button
                        type='button'
                        onClick={e => this.handleSaveBio(e, editProfile)}
                        disabled={loading}
                        className='btn transparent'
                      >
                        <i className='fas fa-arrow-circle-right fa-3x'></i>
                      </button>
                    </Fragment>
                  )}
                </div>
              </Fragment>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(BioEditor)
