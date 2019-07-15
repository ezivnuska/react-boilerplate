import React from 'react'
import { Heading } from 'components'
import SubmitButton from './form/SubmitButton'

import './Form.scss'

const Form = ({ children, disabled, error, fullwidth, label, onSubmit, title, ...props }) => {
  return (
    <form className={'form' + (fullwidth ? ' full-width' : '')} onSubmit={onSubmit} {...props}>
      
      {title && <Heading level={4}>{title}</Heading>}
      
      <div className='form-wrapper'>
        {error && <div className={(error !== '' ? 'error-label' : '')}>{error}</div>}
        
        {children.length ? (
          <ul className='field-wrapper'>
              {children.map((section, index) => (
                  <li key={index} className='form-section'>
                      {section}
                  </li>
              ))}
          </ul>
        ) : (
          <div className='field-wrapper'>
            <div className='form-section'>
              {children}
            </div>
          </div>
        )}
          
        <div className='form-buttons'>
          <SubmitButton label={label} disabled={disabled} />
        </div>
  
      </div>
      
    </form>
  )
}

export default Form
