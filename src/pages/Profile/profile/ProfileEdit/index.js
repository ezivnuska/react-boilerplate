import React from 'react'
import { Query } from 'react-apollo'
import { GET_USER_PROFILE } from 'queries'
import ProfileEditor from './profileedit/ProfileEditor'

import './ProfileEdit.scss'

const ProfileEdit = props => (

  <Query query={GET_USER_PROFILE}>

    {({ data, loading, error }) => {

      if (loading) return <div>Loading</div>
      if (error) return <div>error</div>

      return (
        <ProfileEditor
          profile={data.getUserProfile}
          {...props}
        />
      )
    }}

  </Query>
)

export default ProfileEdit
