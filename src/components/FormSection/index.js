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

  componentDidUpdate = prevProps => {
    const oldUser = prevProps.form.props.session.getCurrentUser
    const newUser = this.props.form.props.session.getCurrentUser
    if (oldUser !== newUser) {
      this.setState({ editing: false })
    }
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
          <button onClick={e => this.toggleEdit(e)} className='btn transparent'>
            <i className='fas fa-window-close fa-lg'></i>
          </button>
        ) : (
          <button onClick={e => this.toggleEdit(e)} className='btn transparent'>
            <i className='fas fa-edit fa-lg'></i>
          </button>
        )}
      </div>
    )
  }

  render() {
    const { editing } = this.state
    const { form, preview, title, ...props } = this.props

    return (
      <section className='form-section' {...props}>
        <div className='header'>
          <div className='title'>
            {title && <Heading level={3}>{title}</Heading>}
          </div>
          {this.renderControls()}
        </div>
        {editing ? form : preview ? preview : null}
      </section>
    )
  }
}

export default FormSection
