import React, { PureComponent } from 'react'
import MemoryItem from './memorylist/MemoryItem'

class MemoryList extends PureComponent {

    render() {
        const { memories } = this.props
        return memories && memories.length ? (
            <ul className='memory-list'>
                {memories.map((memory, index) => (
                    <li key={index}>
                        <MemoryItem memory={memory} />)
                    </li>
                ))}
            </ul>
        ) : (
            <div>No memories found.</div>
        )
    }
}

export default MemoryList