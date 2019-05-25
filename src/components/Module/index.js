import React from 'react'
import { Heading } from 'components'

import './Module.scss'

const Module = ({ centered, children, title }) => (
    <div className='module'>
        {title && <Heading level={4}>{title}</Heading>}
        <div className={'module-content' + (centered ? ' centered' : '')}>
            {children}
        </div>
    </div>
)

export default Module