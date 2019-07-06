import React from 'react'
import PropTypes from 'prop-types'
import withSession from 'hoc/withSession'
import MemoryForm from './memorymodal/MemoryForm'
import { Modal } from 'components'

const MemoryModal = ({ memory, onComplete, session, ...props }) => (
    <Modal title='Add Memory' name='memory' closeable {...props}>
        <MemoryForm
          currentUser={session.getCurrentUser}
          memory={memory}
          onComplete={onComplete}
        />
    </Modal>
)

MemoryModal.propTypes = {
  context: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
}

export default withSession(MemoryModal)