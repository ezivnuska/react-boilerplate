import React from 'react'
import { Heading } from 'components'

import './FormCloud.scss'

const FormCloud = ({ children, title }) => (
    <div className='form-cloud'>
        <div className='form-cloud-content'>
            <div className='form-cloud-heading'>
                <Heading level={3}>{title}</Heading>
            </div>
            <div>
                <div>{children}</div>
            </div>
        </div>
        <div className='form-cloud-fragment'></div>
        <div className='form-cloud-fragment'><div></div></div>
    </div>
)

export default FormCloud