import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './SelectorYear.scss'

const today = moment()
const currentYear = today.year()

const min = currentYear - 100
const max = currentYear

const getYears = () => {
  const years = []
  let y = min
  while(y <= max) {
    years.push(y)
    y++
  }
  return years.reverse()
}

const renderOptions = () => {
  const years = getYears()
  return years.map((year) => {
    return (
      <option key={year} value={year}>{year}</option>
    )
  })
}

const SelectorYear = ({ meta, input, ...props }) => {
  console.log('Year', props)
  return (
    <Select {...{ ...props, ...input, invalid: meta.touched && !!meta.error, error: meta.error }}>
      {renderOptions()}
    </Select>
  )
}

export default SelectorYear
