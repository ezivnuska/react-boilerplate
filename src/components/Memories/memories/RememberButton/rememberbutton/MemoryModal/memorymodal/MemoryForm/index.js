import React, { PureComponent } from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import { ADD_MEMORY } from 'queries'
import moment from 'moment'

import { Form, Switch, TextEditor } from 'components'

import './MemoryForm.scss'

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

const initialState = {
    options: {
        year: [],
        month: [],
        day: []
    },
    formData: {
        year: today.year(),
        month: today.month() + 1,
        day: today.date(),
    },
}

class MemoryForm extends PureComponent {
    
    state = {
        ...initialState
    }

    componentWillMount() {
        const { memory, currentUser } = this.props
        const { formData } = this.state
        const { year, month, day } = formData
        
        this.setState({
            options: {
                year: getYearOptions(),
                month: getMonthOptions(),
                day: getDayOptions(year, month),
            },
            currentDate: {
                year,
                month,
                day,
            },
            memory: memory || null,
            formData: {
                author: memory ? memory.author._id : currentUser._id,
                title: memory ? memory.title : '',
                body: memory ? memory.body : '',
                shared: memory ? memory.shared : false,
                month: month.toString(),
                day: day.toString(),
                year: year.toString(),
            },
        })
    }

    clearState = () => {
        this.stateState({ ...initialState })
    }

    handleChangeYear = e => {
        const { currentDate, options } = this.state
        const dayOptions = getDayOptions(e.target.value, currentDate.month)
        const formData = {
            ...this.state.formData,
            year: e.target.value,
        }
        this.setState({
            ...this.state,
            currentDate: {
                ...currentDate,
                year: e.target.value,
            },
            formData,
            options: {
                ...options,
                day: dayOptions,
            }
        })
    }

    handleChangeMonth = e => {
        const { currentDate, options } = this.state
        const dayOptions = getDayOptions(currentDate.year, e.target.value)
        const newDay = (Number(currentDate.day) > dayOptions.length)
            ? dayOptions.length
            : null
        const formData = {
            ...this.state.formData,
            month: e.target.value,
            day: newDay || currentDate.day
        }
        this.setState({
            ...this.state,
            currentDate: {
                ...currentDate,
                month: e.target.value,
                day: newDay || currentDate.day,
            },
            formData,
            options: {
                ...options,
                day: dayOptions,
            }
        })
    }

    handleChangeDay = e => {
        const { currentDate } = this.state
        const formData = {
            ...this.state.formData,
            day: e.target.value,
        }
        this.setState({
            ...this.state,
            formData,
            currentDate: {
                ...currentDate,
                day: e.target.value,
            },
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { addMemory, onComplete } = this.props
        addMemory({ variables: this.state.formData })
        .then(() => onComplete())
    }

    toggleShared = () => {
        const formData = {
            ...this.state.formData,
            shared: !this.state.formData.shared
        }
        this.setState({ formData })
    }

    onChange = e => {
        const name = e.target.name
        const value = e.target.value
        const formData = {
            ...this.state.formData,
            [name]: value,
        }
        this.setState({ formData })
    }

    onChangeBody = value => {
        const formData = {
            ...this.state.formData,
            body: value
        }
        this.setState({ formData })
    }

    render() {
        const { currentDate, formData, options } = this.state
        const { title, body, shared } = formData
        const { day, month, year } = currentDate
        
        return (
            <Form
                id='memory-form'
                // title='Add Memory'
                onSubmit={e => this.handleSubmit(e)}
            >
                <div className='form-input'>
                    <input
                        type='text'
                        name='title'
                        placeholder='Untitled'
                        defaultValue={title || ''}
                        onChange={e => this.onChange(e)}
                    />
                </div>
                
                <div className='form-input-group'>
                    <div className='select-wrapper'>
                        <select
                            name='year'
                            type='select'
                            defaultValue={year}
                            onChange={e => this.handleChangeYear(e)}
                        >
                            {options.year.map(({ value, label }, index) => 
                                <option value={value} key={index}>{label}</option>)}
                        </select>
                    </div>
                    <div className='select-wrapper'>
                        <select
                            name='month'
                            type='select'
                            defaultValue={month}
                            onChange={e => this.handleChangeMonth(e)}
                        >
                            {options.month.map(({ value, label }, index) =>
                                <option value={value} key={index}>{label}</option>)}
                        </select>
                    </div>
                    <div className='select-wrapper'>
                        <select
                            name='day'
                            type='select'
                            defaultValue={day}
                            onChange={e => this.handleChangeDay(e)}
                        >
                            {options.day.map(({ value, label }, index) =>
                                <option value={value} key={index}>{label}</option>)}
                        </select>
                    </div>
                </div>

                <div className='form-input'>
                    <TextEditor value={body} name='body' placeholder='I remember...' onUpdate={value => this.onChangeBody(value)} />
                </div>

                <Switch
                    name='shared'
                    labels={['Private', 'Shared']}
                    checked={shared}
                    onClick={e => this.toggleShared(e)}
                />
            </Form>
        )
    }
}

const MemoryFormWithMutations = compose(
    withApollo,
    graphql(ADD_MEMORY, { name: 'addMemory' })
)(MemoryForm)

export default MemoryFormWithMutations