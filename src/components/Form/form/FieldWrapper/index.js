import React from 'react'
import PropTypes from 'prop-types'

import './FieldWrapper.scss'

const FieldWrapper = ({ children }) => (
    <ul className='field-wrapper'>
        {children.map((section, index) => (
            <li key={index} className='form-section'>
                {section}
            </li>
        ))}
    </ul>
)

FieldWrapper.propTypes = ({
    children: PropTypes.array.isRequired
})

export default FieldWrapper