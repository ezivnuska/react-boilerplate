import React from 'react'
import PropTypes from 'prop-types'

import './Heading.scss'

const Heading = ({ level, children, ...props }) =>
  React.createElement(`h${level}`, props, children)

Heading.propTypes = ({
  children: PropTypes.node.isRequired,
  level: PropTypes.number.isRequired,
})

export default Heading
