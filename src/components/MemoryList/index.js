import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import MemoryItem from './memorylist/MemoryItem'
import { MemoryModal } from 'components'

import './MemoryList.scss'

class MemoryList extends PureComponent {

    static propTypes = {
        context: PropTypes.object.isRequired,
        refetch: PropTypes.func.isRequired,
        userId: PropTypes.string
    }

    onModalClose = () => {
      const { context, refetch } = this.props
      refetch()
      context.closeMemoryModal()
    }

    renderRememberButton = () => (
        <div
            className='remember-button'
            onClick={e => this.props.context.openModal('memory')}
        >
            Remember Something
        </div>
    )

    render() {
        const { context, currentUser, memories, refetch, userId } = this.props
        return (
            <Fragment>
                
                <MemoryModal
                    onClose={this.onModalClose}
                    context={context}
                />
                
                {!userId && this.renderRememberButton()}
                
                {memories && memories.length ? (
                    <ul className='memory-list'>
                        {memories.map((memory, index) => (
                            <li key={index}>
                                <MemoryItem
                                    context={context}
                                    currentUser={currentUser}
                                    memory={memory}
                                    refetch={refetch}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No memories found.</p>
                )}

            </Fragment>
        )
    }
}

export default MemoryList