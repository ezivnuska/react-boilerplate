import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ className, iconClass, ...props }) => (
  <i className={iconClass + (className ? ` ${className}` : '')} aria-hidden='true' {...props}></i>
)

Icon.propTypes = {
  iconClass: PropTypes.string,
}

export default Icon
