import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import AvatarDropzone from './profileeditor/AvatarDropzone'
import BioEditor from './profileeditor/BioEditor'
import NameEditor from './profileeditor/NameEditor'
import { FormSection } from 'components'

import './ProfileEditor.scss'

const initialState = {
  error: '',
  currentUser: null
}

class ProfileEditor extends PureComponent {
  state = {
    ...initialState
  }

  componentWillMount = () => {
    const { getCurrentUser } = this.props.session
    if (getCurrentUser) {
      this.setState({ currentUser: getCurrentUser })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = this.state
    const updatedUser = nextProps.session.getCurrentUser
    if (currentUser !== updatedUser) {
      this.setState({ currentUser: updatedUser })
    }
  }

  render() {
    const { currentUser } = this.state

    return (
      <div id='profile-editor'>

        <FormSection title='Name'>
          <NameEditor {...this.props} />
        </FormSection>

        <FormSection title='Avatar'>
          <AvatarDropzone {...this.props} />
        </FormSection>

        <FormSection title='Bio'>
          <BioEditor {...this.props} />
        </FormSection>

      </div>
    )
  }
}

export default withRouter(ProfileEditor)
