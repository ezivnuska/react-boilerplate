import React, { Fragment } from 'react'
import FieldWrapper from'./form/FieldWrapper'
import { AbortButton, Heading, SubmitButton } from 'components'

import './Form.scss'

const Form = ({ abort, children, disabled, error, onSubmit, reverse, split, title, ...props }) => (
  <form className={'form' + (reverse ? ' reverse' : '') + (split ? ' split' : '')} onSubmit={onSubmit}>
    
    {title && <Heading level={3}>{title}</Heading>}
    
    <div className='form-wrapper'>
      {error && <div className={(error !== '' ? 'error-label' : '')}>{error}</div>}
      
      {(children && children.length) && (
        <Fragment>
          <FieldWrapper>{children}</FieldWrapper>
          <aside>
            <SubmitButton disabled={disabled} />
            {abort && <AbortButton abort={abort}>Cancel</AbortButton>}
          </aside>
        </Fragment>
      )}

    </div>
    
  </form>
)

export default Form
