import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AvatarEditor from './avatarModal/AvatarEditor'
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
        <AvatarEditor {...this.props} onComplete={() => {
          console.log('onComplete')
          this.props.context.closeModal()}} />
      </Modal>
    )
  }
}

export default AvatarModal
