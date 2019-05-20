import React from 'react'

import './SubmitButton.scss'

const SubmitButton = ({ disabled, label }) => (
    <button type='submit' disabled={disabled} className={(label ? '' : 'transparent')}>
        {label ? label : <i className='fas fa-arrow-circle-right fa-2x'></i>}
    </button>
)

export default SubmitButton