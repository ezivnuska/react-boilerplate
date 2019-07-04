import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MemoryForm from './memorymodal/MemoryForm/indexOld'
import { Modal } from 'components'

class MemoryModal extends PureComponent {

  static propTypes = {
    context: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired,
  }

  render() {
    const { memory, onComplete, ...props } = this.props
    return (
        <Modal title='Add Memory' name='memory' closeable {...props}>
            <MemoryForm />
        </Modal>
    )
  }
}

export default MemoryModal