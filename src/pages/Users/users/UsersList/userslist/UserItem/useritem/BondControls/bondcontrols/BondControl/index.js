import React from 'react'
import PropTypes from 'prop-types'

import './BondControl.scss'

const BondControl = ({ children, onClick, type, ...rest }) => {
  if (onClick) {
    return (
      <button
        className={`bond-control ${type}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    )
  }

  return <button {...rest}>{children}</button>
}

BondControl.propTypes = ({
  onClick: PropTypes.func,
})

export default BondControl
