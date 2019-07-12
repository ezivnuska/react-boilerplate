import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql, Query } from 'react-apollo'
import { DELETE_MEMORY, GET_AUTHOR } from 'queries'
import { NavLink } from 'react-router-dom'
import toastr from 'toastr'
import moment from 'moment'
// import {
//   memoryDetailReadRequest,
//   memoryDeleteRequest
// } from 'store/actions'
// import {
//   fromUser,
//   fromMemory
// } from 'store/selectors'

import MemorySignature from './memoryitem/MemorySignature'
import MemoryHeader from './memoryitem/MemoryHeader'
import MemoryBody from './memoryitem/MemoryBody'

import {
  Cloud,
  Heading,
  IconLink,
  Spinner
} from 'components'

import './MemoryItem.scss';

class MemoryItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showOptions: false,
      author: null,
      memory: props.memory,
    }
  }

  componentDidMount() {
    toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': true,
      'progressBar': true,
      'positionClass': 'toast-bottom-right',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }
  }

  toggleOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions,
    })
  }

  onEdit = memoryId => {
    this.toggleOptions()
    // this.props.edit(memoryId)
  }

  formatDate = (month, day, year) =>
    moment([year, month - 1, day]).format('MMM Do YYYY')

  onDeleteClicked = e => {
    e.preventDefault()
    const { deleteMemory, memory, refetch } = this.props
    deleteMemory({ variables: { id: memory._id } })
    .then(() => {
      refetch()
      toastr.success('Memory deleted.', 'Success!')
    })
  }

  render = () => {
    const { currentUser, memory } = this.props
    const { body, title } = memory
    
    return (
      <Query
        query={GET_AUTHOR}
        variables={{userId: memory.author}}
      >
        {({ data, loading, error }) => {
          
          if (error) return <div className='error'>{error}</div>
          if (loading) return <Spinner />

          const author = data.getAuthor
          const isMine = (currentUser !== null) && (author._id === currentUser._id)

          return author ? (
            <div className='memory-item'>
              <aside>
                <MemorySignature
                  user={author}
                  title={title}
                  date={this.formatDate(memory.month, memory.day, memory.year)}
                  size={40}
                  linked
                />
              </aside>

              <div className='bubbles'>
                <div className='bubble' />
                <div className='bubble' />
              </div>

              <div className='memory-content'>
                <Cloud
                  title={title}
                  body={body}
                  onClick={e => this.onDeleteClicked(e)}
                />
              </div>
            </div>
          ) : <Spinner />
        }}
      </Query>
    )
  }
}

// MemoryItem.propTypes = {
//   memory: PropTypes.object.isRequired,
//   filter: PropTypes.string.isRequired,
//   edit: PropTypes.func.isRequired,
//   delete: PropTypes.func.isRequired,
//   isMine: PropTypes.bool.isRequired,
// }

// const mapStateToProps = state => ({
//   user: fromUser.getUser(state),
//   filter: fromMemory.getMemoryFilter(state),
// })

// const mapDispatchToProps = dispatch => ({
//   edit: id => dispatch(memoryDetailReadRequest(id)),
//   delete: id => dispatch(memoryDeleteRequest(id)),
// })

// const mergeProps = (stateProps, dispatchProps, ownProps) => ({
//   memory: ownProps.memory,
//   filter: stateProps.filter,
//   isMine: stateProps.user ? stateProps.user._id === ownProps.memory.author._id : null,
//   edit: dispatchProps.edit,
//   delete: dispatchProps.delete,
// })

const MemoryItemWithMutation = compose(
  graphql(DELETE_MEMORY, { name: 'deleteMemory' })
)(MemoryItem)

export default MemoryItemWithMutation
