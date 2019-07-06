// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { Field, reduxForm } from 'redux-form'
// import { fulfilled, pending, rejected } from 'redux-saga-thunk'
// import { fromUser, fromMemory, fromResource } from 'store/selectors'
// import {
//   MEMORY_CREATE_REQUEST,
//   memoryCreateRequest,
//   memoryUpdateRequest,
//   memorySavedResetRequest,
// } from 'store/actions'
// import { createValidator, required, oneOf } from 'services/validation'
// import moment from 'moment'

// import './MemoryForm.scss'

// import {
//   Button,
//   ReduxField,
// } from 'components'

// const today = moment()

// const getFormattedMonth = month => {
//   return month.toString().length < 2 ? '0' + month : month
// }

// const getYearOptions = () => {
//   const max = today.year()
//   const min = max - 100
//   const options = []
//   let y = max
//   while (y >= min) {
//     options.push({ value: y, label: y })
//     y--
//   }
//   return options
// }

// const getMonthOptions = () => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//   return months.map((month, index) => {
//     const value = index + 1
//     return { value, label: month }
//   })
// }

// const getDayOptions = (year, month) => {
//   const daysInMonth = moment([year, month - 1]).daysInMonth()
//   let d = 1
//   const options = []
//   while(d <= daysInMonth) {
//     options.push({ value: d, label: d })
//     d++
//   }
//   return options
// }


// class MemoryForm extends Component {

//   constructor(props) {
//     super(props)
//     const { month, day, year } = props.initialValues
//     this.state = {
//       currentDate: {
//         month,
//         day,
//         year,
//       },
//       options: {
//         year: [],
//         month: [],
//         day: [],
//       }
//     }
//     // console.log('constructor state', this.state)
//   }

//   static propTypes = {
//     user: PropTypes.object,
//     detail: PropTypes.object,
//     saved: PropTypes.object,
//     reset: PropTypes.func.isRequired,
//     resetForm: PropTypes.func.isRequired,
//     initialValues: PropTypes.object.isRequired,
//     pending: PropTypes.bool.isRequired,
//     fulfilled: PropTypes.bool.isRequired,
//     rejected: PropTypes.bool.isRequired,
//   }

//   componentWillMount() {
//     const { year, month } = this.props.initialValues
//     this.setState({
//       ...this.state,
//       options: {
//         year: getYearOptions(),
//         month: getMonthOptions(),
//         day: getDayOptions(year, month),
//       }
//     })
//   }

//   componentWillReceiveProps(nextProps) {
//     const { form, fulfilled, saved, reset, resetForm } = nextProps
//     if (!this.props.saved && saved) {
//       resetForm()
//       reset(form)
//     }
//   }

//   renderSelectField = ({ input, options, meta: { touched, error } }) => (
//     <select {...input}>
//       {options && options.length > 0 && options.map((option, index) => {
//         return (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         )
//       })}
//     </select>
//   )

//   handleChangeYear = e => {
//     const dayOptions = getDayOptions(e.target.value, this.state.currentDate.month)
//     this.setState({
//       ...this.state,
//       currentDate: {
//         ...this.state.currentDate,
//         year: e.target.value,
//       },
//       options: {
//         ...this.state.options,
//         day: dayOptions,
//       }
//     })
//   }

//   handleChangeMonth = e => {
//     const dayOptions = getDayOptions(this.state.currentDate.year, e.target.value)
//     const newDay = (Number(this.state.currentDate.day) > dayOptions.length)
//       ? dayOptions.length
//       : null

//     this.setState({
//       ...this.state,
//       currentDate: {
//         ...this.state.currentDate,
//         month: e.target.value,
//         day: newDay || this.state.currentDate.day,
//       },
//       options: {
//         ...this.state.options,
//         day: dayOptions,
//       }
//     })
//   }

//   handleChangeDay = e => {
//     this.setState({
//       ...this.state,
//       currentDate: {
//         ...this.state.currentDate,
//         day: e.target.value,
//       },
//     })
//   }

//   render() {
//     const {
//       dirty,
//       form,
//       submitting,
//       handleSubmit,
//       // initialValues: {
//       //   _id,
//       //   author,
//       //   title,
//       //   body,
//       //   shared
//       // },
//       reset,
//       resetForm,
//     } = this.props

//     const {
//       currentDate: {
//         month,
//         day,
//         year
//       },
//       options
//     } = this.state

//     return (
//       <form
//         id='memory-form'
//         autoComplete='off'
//         onSubmit={handleSubmit}
//       >
//         <Field name="title" placeholder="Title" type="text" autoComplete='off' component={ReduxField} />
//         <div className='control-group field'>
//           <div className='select-wrapper'>
//             <Field
//               name="month"
//               type="select"
//               component={this.renderSelectField}
//               options={options.month}
//               onChange={e => this.handleChangeMonth(e)}
//             />
//           </div>
//           <div className='select-wrapper'>
//             <Field
//               name="day"
//               type="select"
//               component={this.renderSelectField}
//               options={options.day}
//               onChange={e => this.handleChangeDay(e)}
//             />
//           </div>
//           <div className='select-wrapper'>
//             <Field
//               name="year"
//               type="select"
//               component={this.renderSelectField}
//               options={options.year}
//               onChange={e => this.handleChangeYear(e)}
//             />
//           </div>
//         </div>
//         <Field name="body" placeholder={'I remember...'} type="textarea" rows='10' component={ReduxField} />
//         <Field type='checkbox' name='shared' label='Shared' component={ReduxField} />
//         <Button type="submit" disabled={!dirty || submitting}>Save</Button>
//         <Button onClick={reset} disabled={!dirty || submitting}>Cancel</Button>
//       </form>
//     )
//   }
// }

// const onSubmit = (data, dispatch) => {
//   const { author, year, month, day, title, body, shared } = data
//   const newData = {
//     author,
//     year,
//     month,
//     day,
//     title,
//     body,
//     shared,
//   }
//   if (data._id !== null) {
//     return dispatch(memoryUpdateRequest(data._id, newData))
//   } else {
//     return dispatch(memoryCreateRequest(newData))
//   }
// }

// const validate = createValidator({
//   year: [required],
//   month: [required],
//   day: [required],
//   author: [required],
//   // title: [required],
//   body: [required],
// })

// const MemoryReduxForm = reduxForm({
//   form: 'MemoryForm',
//   fields: ['_id', 'year', 'month', 'day', 'author', 'title', 'body', 'shared'],
//   destroyOnUnmount: false,
//   onSubmit,
//   validate,
//   enableReinitialize: true,
// })(MemoryForm)

// const mapStateToProps = state => ({
//   user: fromUser.getUser(state),
//   detail: fromMemory.getMemoryDetail(state),
//   saved: fromMemory.getSavedMemory(state),
//   pending: pending(state, 'MEMORY_CREATE_REQUEST'),
//   fulfilled: fulfilled(state, 'MEMORY_CREATE_REQUEST'),
//   rejected: rejected(state, 'MEMORY_CREATE_REQUEST'),
// })

// const mapDispatchToProps = dispatch => ({
//   resetForm: () => dispatch(memorySavedResetRequest()),
// })

// const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, {
//   user: stateProps.user,
//   detail: stateProps.detail,
//   saved: stateProps.saved,
//   resetForm: dispatchProps.resetForm,
//   initialValues: {
//     _id: stateProps.detail ? stateProps.detail._id : null,
//     author: stateProps.detail ? stateProps.detail.author._id : stateProps.user._id,
//     year: stateProps.detail ? stateProps.detail.year : today.year(),
//     month: stateProps.detail ? stateProps.detail.month : today.month() + 1,
//     day: stateProps.detail ? stateProps.detail.day : today.date(),
//     title: stateProps.detail ? stateProps.detail.title : '',
//     body: stateProps.detail ? stateProps.detail.body : '',
//     shared: stateProps.detail ? stateProps.detail.shared : false,
//   },
//   pending: stateProps.pending,
//   fulfilled: stateProps.fulfilled,
//   rejected: stateProps.rejected,
// })

// export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MemoryReduxForm)
