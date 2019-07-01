import React from 'react'
import PropTypes from 'prop-types'
import webConfig from 'config'

import './ProfileImage.scss'

const ProfileImage = ({ size, src }) => {

  const small = size <= 50
  const url = src
    ? `${webConfig.profileImagesURL}/${webConfig.profileImagesPath}/${small ? 'small/' : ''}${src}`
    : `/${webConfig.assetPath}/graphics/default-avatar${small ? '-small' : ''}.png`
    
  return (
    <img
      className='profile-image'
      src={url}
      style={{
        height: size + 'px',
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
