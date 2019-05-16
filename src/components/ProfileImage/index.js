import React from 'react'
import PropTypes from 'prop-types'
import webConfig from 'config'

import './ProfileImage.scss'

const ProfileImage = ({ src, size }) => {
  const url = src
    ? `${webConfig.siteURL}/user-uploads/profile-images/small/${src}`
    : `${webConfig.siteURL}/assets/graphics/default-avatar-small.png`
  return (
    <img
      className='profile-image'
      src={url}
      style={{
        height: size ? size + 'px' : 'auto',
        width: 'auto'
      }}
    />
  )
}

ProfileImage.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
}

export default ProfileImage
