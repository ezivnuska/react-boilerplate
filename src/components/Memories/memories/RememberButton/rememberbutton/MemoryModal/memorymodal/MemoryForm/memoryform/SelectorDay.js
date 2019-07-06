import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './SelectorDay.scss'

class SelectorDay extends Component {

  constructor(props) {
    super(props)

    const today = moment()
    const currentYear = today.year()
    const month = today.month() + 1
    const currentDay = today.date()
    const currentMonth = month.toString().length < 2 ? '0' + month : month
    const currentMoment = moment(currentYear + '-' + currentMonth, 'YYYY-MM')
    const daysInMonth = currentMoment.daysInMonth()

    this.state = ({
      currentDay,
      daysInMonth,
    })
  }

  getDays(daysInMonth) {
    const days = []
    let d = 1
    while(d <= daysInMonth) {
      days.push(d)
      d++
    }
    return days
  }

  renderOptions() {
    const { daysInMonth } = this.state
    return this.getDays(daysInMonth).map(day => <option key={day} value={day}>{day}</option>)
  }

  render() {
    const { meta, input } = this.props
    const { currentDay } = this.state
    return (
      <Select {...{ ...this.props, ...input, invalid: meta.touched && !!meta.error, error: meta.error }}>
        {this.renderOptions()}
      </Select>
    )
  }
}

export default SelectorDay
