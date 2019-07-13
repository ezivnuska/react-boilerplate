import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './MonthSelector.scss'

const today = moment()
const currentMonth = today.month()

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const renderOptions = () => {
  return months.map((month, index) => {
    const value = index + 1
    return (
      <option key={index} value={value}>{month}</option>
    )
  })
}

const MonthSelector = ({ meta, input, ...props }) => {
  console.log('Month', props)
  return (
    <Select defaultValue={currentMonth} {...{...props, ...input, invalid: meta.touched && !!meta.error, error: meta.error}}>
      {renderOptions()}
    </Select>
  )
}

export default MonthSelector
