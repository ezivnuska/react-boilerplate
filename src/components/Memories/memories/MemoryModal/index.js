import React from 'react'
import PropTypes from 'prop-types'
import withSession from 'hoc/withSession'
import MemoryForm from './memorymodal/MemoryForm'
import { Modal } from 'components'

const MemoryModal = ({ context, onComplete, session, ...props }) => (
    <Modal
      title='Add Memory'
      name='memory'
      context={context}
      closeable
      {...props}
    >
        <MemoryForm
          currentUser={session.getCurrentUser}
          memory={context.memory}
          onComplete={onComplete}
        />
    </Modal>
)

MemoryModal.propTypes = {
  context: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
}

export default withSession(MemoryModal)