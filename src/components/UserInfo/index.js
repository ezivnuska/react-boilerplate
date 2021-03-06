import React from 'react'
import {
  Html,
  Module,
  ProfileImage
} from 'components'

import './UserInfo.scss'

const UserInfo = ({ user }) => {
  const size = 100;
  const renderName = (firstname, lastname) => (
    <span>
      {(firstname && lastname) ? `${firstname} ${lastname}`
      : (firstname && !lastname) ? `${firstname}`
      : (lastname && !firstname) ? `${lastname}`
      : ''}
    </span>
  )

  return (
    <div className='user-info'>
      
      <div className='user-info-heading'>

        <ProfileImage src={user.profileImage} size={100} />
        
        <div className='full-name' style={{ lineHeight: size + 'px' }}>
          {renderName(user.firstname, user.lastname)}
        </div>

      </div>

      <Module
        className='user-bio'
        title='About'
        fullsize
      >
        <Html html={user.bio} />
      </Module>
      
    </div>
  )
}

export default UserInfo
