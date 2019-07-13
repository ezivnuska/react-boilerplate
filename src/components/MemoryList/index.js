import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import MemoryItem from './memorylist/MemoryItem'
import { MemoryModal } from 'components'

import './MemoryList.scss'

class MemoryList extends PureComponent {

    static propTypes = {
        context: PropTypes.object.isRequired,
        refetch: PropTypes.func.isRequired,
    }

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
                                context={context}
                                currentUser={currentUser}
                                memory={memory}
                                refetch={refetch}
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