import React from 'react'

import './SubmitButton.scss'

const SubmitButton = ({ disabled }) => (
    <button type='submit' className='btn submit-button' disabled={disabled}>
        <i className='fas fa-arrow-circle-right fa-2x'></i>
    </button>
)

export default SubmitButton