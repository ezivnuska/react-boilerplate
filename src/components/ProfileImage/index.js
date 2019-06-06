import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import webConfig from 'config'

import './ProfileImage.scss'

class ProfileImage extends PureComponent {

  state = {
    size: null,
    src: null
  }
  
  static propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
  }

  componentWillMount() {
    const { size, src } = this.props
    this.setState({
      size: size || 50,
      src
    })
  }

  componentWillReceiveProps = ({ src }) => {
    console.log('next src', src)
    if (this.state.src !== src) {
      console.log('\nsrc changed')
      this.setState({ src })
    }
  }

  getUrl() {
    const { size, src } = this.state
    const small = size <= 50
    return src
      ? `/${webConfig.assetPath}/${webConfig.profileImagesPath}/${small ? 'small/' : ''}${src}`
      : `/${webConfig.assetPath}/graphics/default-avatar-small.png`
  }

  render() {
    const { size, src } = this.state
    console.log('RENDERING', src)
    const url = this.getUrl()
    console.log(url)
    return (
      <div>
        <p>{src}</p>
        <img
          className='profile-image'
          src={url}
          style={{
            height: size + 'px',
            width: 'auto'
          }}
        />
      </div>
    )
  }
}

export default ProfileImage
