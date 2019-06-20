import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BioEditor from './biomodal/BioEditor'
import {
  Modal,
} from 'components'

class BioModal extends PureComponent {

  static propTypes = {
    context: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired,
  }

  render() {
    const { bio, onComplete, ...props } = this.props
    return (
      <Modal title='Edit Bio' name='bio' closeable {...props}>
        <BioEditor
          bio={bio}
          onComplete={onComplete}
          {...props}
        />
      </Modal>
    )
  }
}

export default BioModal
