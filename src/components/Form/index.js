import React from 'react'
import { Heading } from 'components'

import './Form.scss'

const Form = ({ children, error, onSubmit, title, ...props }) => (
  <form className='form' onSubmit={onSubmit}>
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
  </form>
)

export default Form
