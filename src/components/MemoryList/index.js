import React, { Fragment, PureComponent } from 'react'
import MemoryItem from './memorylist/MemoryItem'
import { MemoryModal } from 'components'

import './MemoryList.scss'

class MemoryList extends PureComponent {

    onModalClose = () => {
      const { context, refetch } = this.props
      refetch()
      context.closeMemoryModal()
    }

    render() {
        const { context, currentUser, memories, refetch } = this.props
        return memories && memories.length ? (
            <Fragment>
                <MemoryModal
                    onClose={this.onModalClose}
                    context={context}
                />
                <ul className='memory-list'>
                    {memories.map((memory, index) => (
                        <li key={index}>
                            <MemoryItem
                                currentUser={currentUser}
                                memory={memory}
                                refetch={refetch}
                                context={context}
                            />
                        </li>
                    ))}
                </ul>
            </Fragment>
        ) : (
            <div>No memories found.</div>
        )
    }
}

export default MemoryList