import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

import './MenuItem.scss'

const MenuItem = ({ children, ...props }) => (
  <li>
    <NavLink {...props} exact className='menu-item' activeClassName='active'>
      {children}
    </NavLink>
  </li>
)

MenuItem.propTypes = ({
  onClick: PropTypes.func,
  to: PropTypes.string
})

export default MenuItem
