import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BioEditor from './biomodal/BioEditor'
import {
  Modal,
} from 'components'

class BioModal extends PureComponent {

  static propTypes = {
    context: PropTypes.object.isRequired,
  }

  render() {
    const { bio, context } = this.props
    return (
      <Modal title='Edit Bio' name='bio' closeable {...this.props}>
        <BioEditor
          bio={bio}
          onComplete={() => context.closeModal()}
          {...this.props}
        />
      </Modal>
    )
  }
}

export default BioModal
