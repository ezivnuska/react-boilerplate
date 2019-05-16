import React from 'react'
import FormWrapper from './form/FormWrapper'

import './Form.scss'

const Form = ({ children, onSubmit, ...props }) => (
  <form className='form' onSubmit={onSubmit}>
    <FormWrapper {...props}>
      {children}
    </FormWrapper>
  </form>
)

export default Form
