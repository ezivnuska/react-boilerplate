import React, { PureComponent } from 'react'

class TextEditor extends PureComponent {
    state = {
        value: this.props.value || ''
    }

    componentDidMount() {
        const editor = CKEDITOR.replace('editor')
        editor.on('change', e => this.onChange(e))
    }

    componentWillReceiveProps = ({ value }) => {
        this.setState({ value })
    }

    onChange = ({ editor }) => {
        const { onUpdate } = this.props
        const value = editor.getData()
        this.setState({ value })
        onUpdate(value)
    }

    render() {
        return <textarea name='editor' defaultValue={this.state.value}></textarea>
    }
}

export default TextEditor