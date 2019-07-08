import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { GET_AUTHOR } from 'queries'
import { NavLink } from 'react-router-dom'
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

  render = () => {
    const { currentUser, memory, refetch } = this.props
    const { body, title } = memory
    const { showOptions } = this.state
    
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

          return (
            <div className={'memory-item'}>
              {author
                ? <MemorySignature
                    user={author}
                    title={title}
                    date={this.formatDate(memory.month, memory.day, memory.year)}
                    size={50}
                    linked
                  />
                : <Spinner />
              }
              <MemoryHeader
                memory={memory}
                mine={isMine}
                refetch={refetch}
              />
              <MemoryBody body={body} />
            </div>
          )
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

export default MemoryItem
