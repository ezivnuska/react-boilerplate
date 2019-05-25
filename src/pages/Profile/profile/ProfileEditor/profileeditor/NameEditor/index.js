import React, { PureComponent } from 'react'
import NameForm from './nameeditor/NameForm'
import NamePreview from './nameeditor/NamePreview'
import { Heading, SplitScreen } from 'components'

import './NameEditor.scss'

class NameEditor extends PureComponent {
  
  state = {
    firstname: '',
    lastname: ''
  }

  componentWillMount() {
    const user = this.props.session.getCurrentUser
    this.setState({
      firstname: user.firstname,
      lastname: user.lastname
    })
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { firstname, lastname } = this.state

    return (
      <div id='name-editor'>
        <Heading level={2}>Name</Heading>
        <SplitScreen>
          
          <NamePreview
            firstname={firstname}
            lastname={lastname}
          />

          <NameForm
            {...this.props}
            onChange={(name, value) => this.onChange(name, value)}
          />

        </SplitScreen>
      </div>
    )
  }
}

export default NameEditor
