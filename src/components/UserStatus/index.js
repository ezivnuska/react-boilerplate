import React from 'react'
import withSession from 'hoc/withSession'
import {
  Signout,
  UserSignature,
} from 'components'

import './UserStatus.scss'

const UserStatus = ({ session, ...props }) => {
  const user = session.getCurrentUser
  return user ? (
    <div id='user-status'>
      <UserSignature
        user={user}
        size={30}
        to={`/profile/${user.username}`}
      />
      <div style={{ textAlign: 'right' }}>
        <Signout size={30} />
      </div>
    </div>
  ) : null
}

export default withSession(UserStatus)
