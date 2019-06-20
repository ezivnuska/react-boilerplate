import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AvatarEditor from './avatarmodal/AvatarEditor'
import {
  Modal,
} from 'components'

class AvatarModal extends PureComponent {

  static propTypes = {
    context: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired,
  }

  render() {
    const { onComplete, ...props } = this.props
    return (
      <Modal title='Edit Avatar' name='avatar' closeable {...props}>
        <AvatarEditor
          onComplete={onComplete}
          {...props}
        />
      </Modal>
    )
  }
}

export default AvatarModal
