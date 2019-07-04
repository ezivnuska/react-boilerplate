import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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

import MemoryHeader from './memoryitem/MemoryHeader'
import MemoryBody from './memoryitem/MemoryBody'

import {
  Heading,
  IconButton,
  UserSignature
} from 'components'

// import './MemoryItem.scss';

class MemoryItem extends PureComponent {

  state = {
    showOptions: false,
  }

  formatDate = (month, day, year) =>
    moment([year, month - 1, day]).format('MMM Do YYYY')

  renderSignature = memory => {
    return (
      <div className='memory-signature'>
        <UserSignature user={memory.author} linked />
        <div className='date' level={5}>{this.formatDate(memory.month, memory.day, memory.year)}</div>
      </div>
    )
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
    const { isMine, memory } = this.props
    const { showOptions } = this.state
    return (
      <div className={'memory-item show' + (isMine ? ' mine' : '')}>
        <div className={'memory-item-container' + (showOptions ? ' show' : '') + (memory.shared ? ' shared' : '')}>
          {this.renderSignature(memory)}
          <MemoryHeader
            memory={memory}
            mine={isMine}
            showOptions={() => this.toggleOptions()}
            optionsShown={showOptions}
          />
          <MemoryBody body={memory.body} />
        </div>
        {0 && <div className='options'>
          <NavLink to={`/memories/view/${memory._id}`}>
            <label>Edit</label>
          </NavLink>
        </div>}
      </div>
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
