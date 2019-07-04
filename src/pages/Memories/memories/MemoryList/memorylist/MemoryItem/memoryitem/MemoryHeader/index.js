import React from 'react'
import PropTypes from 'prop-types'

import {
  Heading,
  IconLink,
} from 'components'

import './MemoryHeader.scss'

const MemoryHeader = ({ memory, mine, bodyShown, optionsShown, showBody, showOptions }) => (
  <div className='memory-header'>
    <Heading className='memory-heading' level={3}>{memory.title}</Heading>
    {mine && <IconLink icon='arrow-down' height={30} transparent onClick={showOptions} className={'arrow-button' + (optionsShown ? ' right' : ' left')} />}
  </div>
)

MemoryHeader.propTypes = {
  memory: PropTypes.object.isRequired,
  mine: PropTypes.bool,
  showOptions: PropTypes.func,
}

export default MemoryHeader
