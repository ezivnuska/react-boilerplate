import React from 'react'

import './UserInfo.scss'

const UserInfo = ({ user }) => (
  <ul className='user-info'>
    <li key={0}>Name: {user.firstname} {user.lastname}</li>
    <li key={1}>Email: {user.email}</li>
  </ul>
)

export default UserInfo
