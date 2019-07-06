import React, { PureComponent } from 'react'


class TextEditor extends PureComponent {
    state = {
        name: this.props.name || 'editor',
        value: this.props.value || ''
    }

    componentDidMount() {
        const { name } = this.state
        const editor = CKEDITOR.replace(name)
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
        return <textarea name={this.state.name} defaultValue={this.state.value}></textarea>
    }
}

export default TextEditor