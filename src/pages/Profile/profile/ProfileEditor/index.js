import React, { Fragment, PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_USER_PROFILE } from 'queries'
import { Helmet } from 'react-helmet'
import AvatarDropzone from './profileeditor/AvatarDropzone'
import BioEditor from './profileeditor/BioEditor'
import NameEditor from './profileeditor/NameEditor'

import './ProfileEditor.scss'

const initialState = {
  error: '',
  currentUser: null
}

class ProfileEditor extends PureComponent {

  state = {
    ...initialState
  }

  head() {
    const { username } = this.props.session.getCurrentUser
    return (
      <Helmet bodyAttributes={{ class: 'profile-editor' }}>
        <title>Edit Profile: {username}</title>
      </Helmet>
    )
  }

  componentWillMount = () => {
    this.props.refetch()
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
      <Fragment>
        {this.head()}
        <Query query={GET_USER_PROFILE}>
      
          {({ data, loading, error }) => {
      
            if (loading) return <div>Loading</div>
            if (error) return <div>error</div>
            
            return (
              <div id='profile-editor'>

                <NameEditor {...this.props} />
                
                <AvatarDropzone {...this.props} />

                {data.getUserProfile && <BioEditor bio={data.getUserProfile.bio} {...this.props} />}

              </div>
            )
          }}
      
        </Query>
      </Fragment>
    )
  }
}

export default ProfileEditor
