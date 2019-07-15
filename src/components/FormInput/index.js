import React from 'react'

import './FormInput.scss'

const FormInput = props => (
    <div className='cloud-input'>
        <input {...props} />
    </div>
)

export default FormInput