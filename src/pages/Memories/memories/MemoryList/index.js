import React, { PureComponent } from 'react'
import MemoryItem from './memorylist/MemoryItem'

class MemoryList extends PureComponent {

    render() {
        const { currentUser, memories } = this.props
        
        return memories && memories.length ? (
            <ul className='memory-list'>
                {memories.map((memory, index) => (
                    <li key={index}>
                        <MemoryItem
                            currentUser={currentUser}
                            memory={memory}
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