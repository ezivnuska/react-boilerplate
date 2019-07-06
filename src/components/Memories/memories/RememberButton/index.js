import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import MemoryModal from './rememberbutton/MemoryModal'

import './RememberButton.scss'

class RememberButton extends PureComponent {
  
  static propTypes = {
    context: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
  }

  onMemoryAdded = () => {
    const { context, refetch } = this.props
    refetch()
    context.closeModal('memory')
  }

  render() {
    const { context } = this.props
    
    return (
      <div>
        <div
          className='remember-button'
          onClick={e => context.openModal('memory')}
        >
          Remember
        </div>
        <MemoryModal
          onComplete={this.onMemoryAdded}
          context={context}
        />
      </div>
    )
  }
}

export default RememberButton
