import React from 'react'
import PropTypes from 'prop-types'

import {
  Heading,
  Link,
  ProfileImage,
} from 'components'

import './MemorySignature.scss'

const MemorySignature = ({ user, size }) => (
  <div className='memory-signature'>
    <Link to={`/user/${user.username}`}>
      
      <ProfileImage
        src={user.profileImage}
        size={size}
      />
      
      <Heading
        level={3}
        className='username'
      >
        {user.username}
      </Heading>

    </Link>
  </div>
)

MemorySignature.propTypes = ({
  user: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
})

MemorySignature.defaultProps = ({
  size: 50
})

export default MemorySignature
