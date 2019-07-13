import React from 'react'
import './Html.scss'

const Html = ({ html, ...props }) => (
    <div
        className='html'
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
    />
)

export default Html