import React from 'react'

import './SplitScreen.scss'

const SplitScreen = ({ children, ...props }) => {
    const left = children[0],
        right = children[1]
    
    return (
        <div className='split-screen' {...props}>
            <div>
                {left}
            </div>
            <div>
                {right}
            </div>
        </div>
    )
}

export default SplitScreen