import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AvatarEditor from './avatarmodal/AvatarEditor'
import {
  Modal,
} from 'components'

class AvatarModal extends PureComponent {

  static propTypes = {
    context: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Modal title='Edit Avatar' name='avatar' closeable {...this.props}>
        <AvatarEditor
          onComplete={() => 
            this.props.context.closeModal()}
          {...this.props}
        />
      </Modal>
    )
  }
}

export default AvatarModal
