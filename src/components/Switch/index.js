import React from 'react'
import PropTypes from 'prop-types'

import './Switch.scss'

const Switch = ({labels, ...props}) => (
  <label className='checkbox'>
    <div className='labels'>
      {labels.map((label, i) => <span key={i}>{label}</span>)}
    </div>
    <input type='checkbox' {...props} />
    <div className='control-indicator'></div>
  </label>
)

Switch.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Switch
