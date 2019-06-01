import React from 'react'
import { Heading } from 'components'

import './Module.scss'

const Module = ({ centered, children, fullsize, title }) => (
    <div className={'module' + (fullsize ? ' full-size' : '')}>
        {title && <Heading level={4}>{title}</Heading>}
        <div className={'module-content' + (centered ? ' centered' : '')}>
            {children}
        </div>
    </div>
)

export default Module