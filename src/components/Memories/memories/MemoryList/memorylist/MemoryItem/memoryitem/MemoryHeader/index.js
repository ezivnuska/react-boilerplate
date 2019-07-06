import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  Heading,
  IconLink,
} from 'components'

import './MemoryHeader.scss'

const formatDate = (month, day, year) =>
  moment([year, month - 1, day]).format('MMM Do YYYY')

const MemoryHeader = ({ memory, mine, bodyShown, optionsShown, showBody, showOptions }) => (
  <div className='memory-header'>
    <Heading className='memory-heading' level={3}>{memory.title}</Heading>
    <div className='date' level={5}>{formatDate(memory.month, memory.day, memory.year)}</div>
    {mine && <IconLink icon='arrow-down' height={30} transparent onClick={showOptions} className={'arrow-button' + (optionsShown ? ' right' : ' left')} />}
  </div>
)

MemoryHeader.propTypes = {
  memory: PropTypes.object.isRequired,
  mine: PropTypes.bool,
  showOptions: PropTypes.func,
}

export default MemoryHeader
