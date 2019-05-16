import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Heading,
  Link,
  ProfileImage,
} from 'components'

import './UserSignature.scss'

const renderUserFragment = (user, size) => (
  <>
   <ProfileImage
    src={user.profileImage}
    size={size}
  />
   <div className='username' style={{ lineHeight: size + 'px' }}>
     <span>{user.username}</span>
   </div>
  </>
)
const UserSignature = ({ user, size, to }) => to ? (
  <Link
    className='user-signature'
    style={{ height: size ? size + 'px' : 'auto' }}
    to={to}
  >
    {renderUserFragment(user, size)}
  </Link>
) : (
  <div className='user-signature'>
    {renderUserFragment(user, size)}
  </div>
)

// <NavLink to={`profile/${user.username}`}>
//   <div className="wrap">
//     <ProfileImage src={user.profileImage} />
//     <div className="title">
//       <span>{user.firstname} {user.lastname}</span>
//     </div>
//   </div>
// </NavLink>

UserSignature.propTypes = ({
  user: PropTypes.object.isRequired,
  to: PropTypes.string,
})

export default UserSignature
