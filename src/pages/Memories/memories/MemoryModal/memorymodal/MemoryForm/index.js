import React, { PureComponent } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import moment from 'moment'

import { Form, TextEditor } from 'components'

import './MemoryForm.scss'

const initialState = {
    title: '',
    body: ''
}

const today = moment()

const getFormattedMonth = month => {
    return month.toString().length < 2 ? '0' + month : month
}

const getYearOptions = () => {
    const max = today.year()
    const min = max - 100
    const options = []
    let y = max
    while (y >= min) {
        options.push({ value: y, label: y })
        y--
    }
    return options
}

const getMonthOptions = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map((month, index) => {
        const value = index + 1
        return { value, label: month }
    })
}

const getDayOptions = (year, month) => {
    const daysInMonth = moment([year, month - 1]).daysInMonth()
    let d = 1
    const options = []
    while(d <= daysInMonth) {
        options.push({ value: d, label: d })
        d++
    }
    return options
}

class MemoryForm extends PureComponent {
    
    state = {
        ...initialState
    }

    clearState = () => {
        this.stateState({ ...initialState })
    }
    
    renderSelectField = ({ input, options, meta: { touched, error } }) => (
        <select {...input}>
          {options && options.length > 0 && options.map((option, index) => {
            return (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            )
          })}
        </select>
    )

    handleChangeYear = e => {
        const dayOptions = getDayOptions(e.target.value, this.state.currentDate.month)
        this.setState({
            ...this.state,
            currentDate: {
                ...this.state.currentDate,
                year: e.target.value,
            },
            options: {
                ...this.state.options,
                day: dayOptions,
            }
        })
    }

    handleChangeMonth = e => {
        const dayOptions = getDayOptions(this.state.currentDate.year, e.target.value)
        const newDay = (Number(this.state.currentDate.day) > dayOptions.length)
            ? dayOptions.length
            : null

        this.setState({
            ...this.state,
            currentDate: {
                ...this.state.currentDate,
                month: e.target.value,
                day: newDay || this.state.currentDate.day,
            },
            options: {
                ...this.state.options,
                day: dayOptions,
            }
        })
    }

    handleChangeDay = e => {
        this.setState({
            ...this.state,
            currentDate: {
                ...this.state.currentDate,
                day: e.target.value,
            },
        })
    }

    handleSubmit = e => {
        console.log('handleSubmit', e)
    }

    render() {
        const { title, body } = this.state
        return (
            <Form
                title='Add Memory'
                onSubmit={e => this.handleSubmit(e)}
            >
                <div className='form-input'>
                    <input type='text' name='title' placeholder='Untitled' value={title || ''} onChange={e => this.handleChange(e)} />
                </div>
                
                <div className='form-input'>
                    <div className='select-wrapper'>
                        <Field
                            name="month"
                            type="select"
                            component={this.renderSelectField}
                            options={options.month}
                            onChange={e => this.handleChangeMonth(e)}
                        />
                    </div>
                    <div className='select-wrapper'>
                        <Field
                            name="day"
                            type="select"
                            component={this.renderSelectField}
                            options={options.day}
                            onChange={e => this.handleChangeDay(e)}
                        />
                    </div>
                    <div className='select-wrapper'>
                        <Field
                            name="year"
                            type="select"
                            component={this.renderSelectField}
                            options={options.year}
                            onChange={e => this.handleChangeYear(e)}
                        />
                    </div>
                </div>

                <div className='form-input'>
                    <TextEditor value={body} name='body' placeholder='I remember...' />
                </div>

                <div className='form-input'>
                    <input type='checkbox' name='shared' label='Shared' />
                </div>
            </Form>
        )
    }
}

const MemoryFormWithMutations = compose(
    withApollo(),
    graphql(ADD_MEMORY, { name: 'addMemory' })
)(MemoryForm)

export default MemoryFormWithMutations