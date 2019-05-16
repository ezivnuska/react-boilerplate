import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_USER_PROFILE } from 'queries'
import ProfileEditor from './profileedit/ProfileEditor'
import { Heading } from 'components'

import './ProfileEdit.scss'

class ProfileEdit extends PureComponent {

  render() {

    return (
      <div className='column column_12_12'>
        <div className='fullWidth'>

          <Heading level={1}>
            Edit Profile
          </Heading>

          <Query query={GET_USER_PROFILE}>

            {({ data, loading, error }) => {

              if (loading) return <div>Loading</div>
              if (error) return <div>error</div>

              return (
                <ProfileEditor
                  profile={data.getUserProfile}
                  {...this.props}
                />
              )
            }}

          </Query>

        </div>
      </div>
    )
  }
}

export default ProfileEdit
