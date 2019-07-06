import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { GET_AUTHOR } from 'queries'
import { NavLink } from 'react-router-dom'

// import {
//   memoryDetailReadRequest,
//   memoryDeleteRequest
// } from 'store/actions'
// import {
//   fromUser,
//   fromMemory
// } from 'store/selectors'

import MemoryHeader from './memoryitem/MemoryHeader'
import MemoryBody from './memoryitem/MemoryBody'

import {
  Spinner,
  UserSignature
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

  render = () => {
    const { currentUser, memory } = this.props
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
          const isMine = author._id === currentUser._id

          return (
            <div className={'memory-item show' + (isMine ? ' mine' : '')}>
              <div className={'memory-item-container' + (showOptions ? ' show' : '') + (memory.shared ? ' shared' : '')}>
                {data.getAuthor
                  ? <UserSignature user={author} size={50} linked />
                  : <Spinner />
                }
                <MemoryHeader
                  memory={memory}
                  mine={isMine}
                  showOptions={() => this.toggleOptions()}
                  optionsShown={showOptions}
                  
                />
                <MemoryBody body={memory.body} />
              </div>
              {/*<div className='options'>
                <NavLink to={`/memories/view/${memory._id}`}>
                  <label>Edit</label>
                </NavLink>
              </div>*/}
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
