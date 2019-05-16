import React, { PureComponent } from 'react'
import { Heading } from 'components'

import './FormSection.scss'

class FormSection extends PureComponent {

  render() {
    const { children, title, ...props } = this.props
    return (
      <section className='form-section' {...props}>
        {title && <Heading level={2}>{title}</Heading>}
        {children}
      </section>
    )
  }
}

export default FormSection
