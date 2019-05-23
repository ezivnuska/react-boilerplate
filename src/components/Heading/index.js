import React from 'react'
import PropTypes from 'prop-types'

import './Heading.scss'

const Heading = ({ children, level, ...props }) =>
  React.createElement(`h${level}`, props, children)

Heading.propTypes = ({
  children: PropTypes.node.isRequired,
  level: PropTypes.number.isRequired,
})

export default Heading
