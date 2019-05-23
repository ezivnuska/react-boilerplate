import React, { Fragment } from 'react'
import { Heading } from 'components'
import SubmitButton from './form/SubmitButton'

import './Form.scss'

const Form = ({ children, disabled, error, label, onSubmit, title }) => (
  <form className='form' onSubmit={onSubmit}>
    
    {title && <Heading level={3}>{title}</Heading>}
    
    <div className='form-wrapper'>
      {error && <div className={(error !== '' ? 'error-label' : '')}>{error}</div>}
      
      {(children && children.length) && (
        <Fragment>
          
          <ul className='field-wrapper'>
              {children.map((section, index) => (
                  <li key={index} className='form-section'>
                      {section}
                  </li>
              ))}
          </ul>
          
          <div className='form-buttons'>
            <SubmitButton label={label} disabled={disabled} />
          </div>
        
        </Fragment>
      )}

    </div>
    
  </form>
)

export default Form
