import React, { Fragment, PureComponent } from 'react'
import NameForm from './nameeditor/NameForm'
import { Heading } from 'components'

import './NameEditor.scss'

class NameEditor extends PureComponent {
  
  state = {
    editing: false
  }

  componentWillMount() {
    this.resetForm = this.resetForm.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  resetForm = () => {
    this.setState({
      editing: false
    })
  }

  toggleEdit = e => {
    e.preventDefault()
    this.setState({ editing: !this.state.editing })
  }

  render() {
    const { editing } = this.state
    const { firstname, lastname } = this.props.session.getCurrentUser

    return (
      <div id='name-editor'>
        <Heading level={4}>{firstname} {lastname}</Heading>
        {editing && <NameForm {...this.props} cancel={this.resetForm} />}
      </div>
    )
  }
}

export default NameEditor
