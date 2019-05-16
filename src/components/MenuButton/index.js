import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import './MenuButton.scss'

class MenuButton extends PureComponent {

  render() {
    const { children, iconClass, setActiveItem, ...props } = this.props
    return (
      <NavLink {...props} className='menu-button' activeClassName='active'>
        {iconClass && <i className={iconClass}></i>}
        <span className='text'>{children}</span>
      </NavLink>
    )
  }
}

export default MenuButton
