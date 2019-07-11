import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Heading,
  Link,
  ProfileImage,
} from 'components'

import './MemorySignature.scss'

const MemorySignature = ({ user, size, date }) => (
  <div className='memory-signature'>
    <Link to={`/user/${user.username}`}>
      <ProfileImage
        src={user.profileImage}
        size={size}
      />
    </Link>
    <div className='info'>
      <Link to={`/user/${user.username}`}>{user.username}</Link>
      <span className='memory-date'>{date}</span>
    </div>
  </div>
)

MemorySignature.propTypes = ({
  user: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
})

MemorySignature.defaultProps = ({
  size: 50
})

export default MemorySignature
