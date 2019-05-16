import React, { PureComponent } from 'react'
import { Link } from 'components'

import './IconLink.scss'

class IconLink extends PureComponent {

  render() {
    const { children, iconClass, ...props } = this.props
    return (
      <Link {...props} className='icon-link'>
        {iconClass && <i className={iconClass}></i>}
        <span className='text'>{children}</span>
      </Link>
    )
  }
}

export default IconLink
