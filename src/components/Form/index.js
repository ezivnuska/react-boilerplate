import React, { Fragment } from 'react'
import FieldWrapper from'./form/FieldWrapper'
import { Heading, SubmitButton } from 'components'

import './Form.scss'

const Form = ({ children, disabled, error, onSubmit, title }) => (
  <form className='form' onSubmit={onSubmit}>
    
    {title && <Heading level={3}>{title}</Heading>}
    
    <div className='form-wrapper'>
      {error && <div className={(error !== '' ? 'error-label' : '')}>{error}</div>}
      
      {(children && children.length) && (
        <Fragment>
          
          <section>
            <ul className='field-wrapper'>
                {children.map((section, index) => (
                    <li key={index} className='form-section'>
                        {section}
                    </li>
                ))}
            </ul>
          </section>

          <aside>
            <SubmitButton disabled={disabled} />
          </aside>
        
        </Fragment>
      )}

    </div>
    
  </form>
)

export default Form
