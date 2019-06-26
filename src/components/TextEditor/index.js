import React, { PureComponent } from 'react'

class TextEditor extends PureComponent {
    state = {
        value: this.props.value || ''
    }

    componentDidMount() {
        const editor = CKEDITOR.replace('editor')
        editor.on('change', e => this.onChange(e))
    }

    onChange = ({ editor }) => {
        const { onUpdate } = this.props
        const value = editor.getData()
        this.setState({ value })
        onUpdate(value)
    }

    render() {
        const bio = this.state.value
        return (
            <textarea name='editor' defaultValue={bio}></textarea>
        )
    }
}

export default TextEditor