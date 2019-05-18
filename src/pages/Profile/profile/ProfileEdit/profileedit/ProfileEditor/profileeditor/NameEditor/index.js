import React, { PureComponent } from 'react'
import NameForm from './nameeditor/NameForm'
import { Heading, SplitForm } from 'components'

import './NameEditor.scss'

class NameEditor extends PureComponent {
  
  state = {
    editing: false
  }

  componentWillMount() {
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit = e => {
    e.preventDefault()
    this.setState({ editing: !this.state.editing })
  }

  render() {
    const { editing } = this.state
    const { firstname, lastname } = this.props.session.getCurrentUser
    
    return (
      <div className='name-editor'>
        <SplitForm editing={editing}>
          <div className='preview'>
            <Heading level={4}>Current Name:</Heading>
            <p>{firstname} {lastname}</p>
          </div>
          {editing && <NameForm split abort={this.toggleEdit} {...this.props} />}
          {!editing && <div>
            <button onClick={e => this.toggleEdit(e)}>
              <i className='fas fa-edit fa-3x'></i>
            </button>
          </div>}
        </SplitForm>
      </div>
    )
  }
}

export default NameEditor
