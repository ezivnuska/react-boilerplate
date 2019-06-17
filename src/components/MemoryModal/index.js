import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { fromMemory } from 'store/selectors'
// import { fulfilled, pending, rejected } from 'redux-saga-thunk'
// import {
//   MEMORY_CREATE_REQUEST,
//   modalHide
// } from 'store/actions'

import {
  Modal,
  // MemoryForm
} from 'components'

class MemoryModal extends PureComponent {

  static propTypes = {
    hideModal: PropTypes.func.isRequired,
  } 

  componentWillReceiveProps(nextProps) {
    // if (this.props.pending && nextProps.fulfilled) {
    //   nextProps.hideModal()
    // }
  }

  render() {
    return (
      <Modal title='Remember' name='remember' closeable {...this.props}>
        <MemoryForm />
      </Modal>
    )
  }
}

// const mapStateToProps = state => ({
//   pending: pending(state, 'MEMORY_CREATE_REQUEST'),
//   fulfilled: fulfilled(state, 'MEMORY_CREATE_REQUEST'),
//   rejected: rejected(state, 'MEMORY_CREATE_REQUEST'),
// })

// const mapDispatchToProps = dispatch => ({
//   hideModal: () => dispatch(modalHide('remember')),
// })

export default MemoryModal
