import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import { Heading, IconLink } from 'components'

import './Modal.scss'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
        name: props.name || null,
    }
  }

  componentDidMount() {
    ReactModal.setAppElement('body')
  }

  render() {
    const { children, className, title, closeable, context, ...props } = this.props
    const hasHeader = title || closeable
    
    return (
      <ReactModal
        className='modal'
        overlayClassName='modal-overlay'
        contentLabel={title || 'Modal'}
        closeTimeoutMS={250}
        onRequestClose={() => context.closeModal()}
        hasHeader={hasHeader}
        isOpen={context.modal === this.state.name}
        {...props}
      >
        {hasHeader && (
          <header className='modal-header'>
            
            <Heading
              className='modal-heading'
              level={2}
            >
              {title}
            </Heading>

            {closeable &&
              <IconLink
                iconClass='fas fa-window-close fa-2x'
                height={40}
                onClick={() => context.closeModal()}
              />}
          </header>
        )}
        <div className='modal-content'>
          {children}
        </div>
      </ReactModal>
    )
  }
}

Modal.propTypes = ({
  children: PropTypes.node,
  title: PropTypes.string,
  closeable: PropTypes.bool,
  context: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
})

export default Modal
