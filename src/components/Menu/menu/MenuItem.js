import React from 'react'
import PropTypes from 'prop-types'

import './MenuItem.scss'

const MenuItem = ({ children, active, ...props }) => (
  <li>
    <a {...props} className={'menu-item' + (active ? ' active' : '')}>
      {children}
    </a>
  </li>
)

MenuItem.propTypes = ({
  onClick: PropTypes.func,
  to: PropTypes.string
})

export default MenuItem
