import React from 'react'
import PropTypes from 'prop-types'

import './Link.scss'

const Link = ({ active, block, children, link, onClick, to, transparent, ...props }) => {
  return onClick
    ? (
      <a
        className={(
          'link' + (
            active
              ? ' active'
              : ''
          ) + (
            block
              ? ' block'
              : ''
          )
        )}
        href='#'
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    ) : to ? (
      <a href={to} {...props}>{children}</a>
    ) : (
      <a {...props}>{children}</a>
    )
}

Link.propTypes = ({
  onClick: PropTypes.func,
  active: PropTypes.bool,
})

export default Link
