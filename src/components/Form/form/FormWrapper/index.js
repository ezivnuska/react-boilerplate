import React from 'react'
import { Heading } from 'components'

import './FormWrapper.scss'

const FormWrapper = ({ children, error, title, ...props }) => (
  <div className='form-wrapper' {...props}>
    {title && <Heading level={3}>{title}</Heading>}
    {error && <div className={(error !== '' ? 'error-label' : '')}>
      {error}
    </div>}
    {(children && children.length) && <ul>
      {children.map((section, i) => (
        <li key={i} className='form-section'>{section}</li>
      ))}
    </ul>}
  </div>
)

export default FormWrapper
