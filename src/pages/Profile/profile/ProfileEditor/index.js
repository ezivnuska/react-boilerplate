import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_USER_PROFILE } from 'queries'
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

    return (

      <Query query={GET_USER_PROFILE}>
    
        {({ data, loading, error }) => {
    
          if (loading) return <div>Loading</div>
          if (error) return <div>error</div>
          
          return (
            <div id='profile-editor'>

              <NameEditor {...this.props} />
              
              <AvatarDropzone {...this.props} />

              <BioEditor {...this.props} />

            </div>
          )
        }}
    
      </Query>
    )
  }
}

export default ProfileEditor
