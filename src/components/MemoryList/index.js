import React, { PureComponent } from 'react'
import MemoryItem from './memorylist/MemoryItem'

import './MemoryList.scss'

class MemoryList extends PureComponent {

    render() {
        const { currentUser, onEdit, memories, refetch } = this.props
        return memories && memories.length ? (
            <ul className='memory-list'>
                {memories.map((memory, index) => (
                    <li key={index}>
                        <MemoryItem
                            currentUser={currentUser}
                            memory={memory}
                            refetch={refetch}
                            onEdit={onEdit}
                        />
                    </li>
                ))}
            </ul>
        ) : (
            <div>No memories found.</div>
        )
    }
}

export default MemoryList