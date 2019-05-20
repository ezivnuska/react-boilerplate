import React, { PureComponent } from 'react'
import { Heading } from 'components'

import './FormSection.scss'

const initialState = {
  editing: false
}

class FormSection extends PureComponent {
  
  state = {
    ...initialState
  }

  toggleEdit = e => {
    e.preventDefault()
    this.setState({ editing: !this.state.editing })
  }
  
  renderControls() {
    const { editing } = this.state
    return (
      <div className='controls'>
        {editing ? (
          <button onClick={e => this.toggleEdit(e)} className='transparent'>
            <i className='fas fa-window-close'></i>
          </button>
        ) : (
          <button onClick={e => this.toggleEdit(e)} className='transparent'>
            <i className='fas fa-edit'></i>
          </button>
        )}
      </div>
    )
  }

  render() {
    const { editing } = this.state
    const { form, title, ...props } = this.props

    return (
      <section className='form-section' {...props}>
        <div className='header'>
          <div className='title'>
            {title && <Heading level={3}>{title}</Heading>}
          </div>
          {this.renderControls()}
        </div>
        {editing && form}
      </section>
    )
  }
}

export default FormSection
