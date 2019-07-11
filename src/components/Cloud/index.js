import React from 'react'
import { Heading, Html } from 'components'
import './Cloud.scss'

const Cloud = ({ body, title }) => (
    <div className='cloud'>
        <div className='cloud-content'>
            <div className='cloud-heading'>
                <Heading level={3}>{title}</Heading>
            </div>
            <div>
                <Html html={body}></Html>
            </div>
        </div>
        <div className='cloud-controls'>
            <div className='main-controls'>
                <div></div>
            </div>
        </div>
        <div className='cloud-fragment'></div>
        <div className='cloud-fragment'><div></div></div>
    </div>
)

export default Cloud