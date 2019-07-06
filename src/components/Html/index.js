import React from 'react'
import './Html.scss'

const Html = ({ html }) => (
    <div
        className='html'
        dangerouslySetInnerHTML={{ __html: html }}
    />
)

export default Html