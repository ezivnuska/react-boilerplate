import React, { PureComponent } from 'react'
import { Link } from 'components'

import './IconLink.scss'

class IconLink extends PureComponent {

  render() {
    const { children, className, iconClass, ...props } = this.props
    return (
      <Link {...props} className={'icon-link' + (className ? ` ${className}` : '')}>
        {iconClass && <i className={iconClass}></i>}
        {children && <span className='text'>{children}</span>}
      </Link>
    )
  }
}

export default IconLink
