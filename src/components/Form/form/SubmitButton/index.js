import React from 'react'

import './SubmitButton.scss'

const SubmitButton = ({ disabled, label }) => (
    <button type='submit' className={'btn' + (label ? ' borderless' : '')} disabled={disabled}>
        {label ? label : <i className='fas fa-arrow-circle-right fa-2x'></i>}
    </button>
)

export default SubmitButton