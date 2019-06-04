import React from 'react'
import PropTypes from 'prop-types'
import webConfig from 'config'

import './ProfileImage.scss'

const ProfileImage = ({ src, size }) => {
  const imageSize = size || 50
  const small = imageSize <= 50
  const url = src
    ? `${webConfig.profileImagesURL}/${small ? 'small/' : ''}${src}`
    : `${webConfig.assetURL}/graphics/default-avatar-small.png`
  return (
    <img
      className='profile-image'
      src={url}
      style={{
        height: imageSize + 'px',
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
