import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import webConfig from 'config'

import './ProfileImage.scss'

class ProfileImage extends PureComponent {
  
  static propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
  }

  componentWillMount() {
    console.log('src', this.props.src)
  }

  componentWillReceiveProps = nextProps => {
    console.log('nextProps', nextProps)
  }

  render() {
    const { src, size } = this.props

    const imageSize = size || 50
    const small = imageSize <= 50
    const url = src
      ? `/${webConfig.assetPath}/${webConfig.profileImagesPath}/${small ? 'small/' : ''}${src}`
      : `/${webConfig.assetPath}/graphics/default-avatar-small.png`
    
      return (
      <div>
        <p>{src}</p>
        <img
          className='profile-image'
          src={url}
          style={{
            height: imageSize + 'px',
            width: 'auto'
          }}
        />
      </div>
    )
  }
}

export default ProfileImage
