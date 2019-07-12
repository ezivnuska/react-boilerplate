import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Heading,
  Link,
  ProfileImage,
} from 'components'

import './MemorySignature.scss'

const MemorySignature = ({ user, size, date }) => (
  <Link to={`/user/${user.username}`}>
    <div className='memory-signature'>
      <ProfileImage
        src={user.profileImage}
        size={size}
      />
      {user.username}
    </div>
  </Link>
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
