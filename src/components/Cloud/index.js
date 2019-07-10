import React from 'react'

import './Cloud.scss'

const Cloud = ({ children }) => (
    <div className='cloud'>
        <div className='cloud-content'>{children}</div>
        <div className='cloud-fragment'></div>
        <div className='cloud-fragment'></div>
    </div>
)

export default Cloud