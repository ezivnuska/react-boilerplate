import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ className, height, iconClass, ...props }) => (
  <i
    className={iconClass + (
      className
        ? ` ${className}`
        : ''
      )}
      style={{
        lineHeight: height + 'px'
      }}
      aria-hidden='true'
      {...props}
    ></i>
)

Icon.propTypes = {
  iconClass: PropTypes.string,
}

export default Icon
