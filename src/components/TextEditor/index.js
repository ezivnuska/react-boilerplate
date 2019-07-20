import React, { PureComponent } from 'react'

import './TextEditor.scss'

class TextEditor extends PureComponent {
    state = {
        name: this.props.name || 'editor',
        value: this.props.value || ''
    }
    
    componentDidMount() {
        const { name } = this.state

        const editor = CKEDITOR.replace(name, {
            toolbarGroups: [
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'insert', groups: [ 'insert' ] },
                { name: 'editing', groups: [ 'find', 'selection', 'editing' ] },
                { name: 'paragraph', groups: [ 'list', 'blocks', 'indent', 'align', 'bidi', 'paragraph' ] }
            ],
            removeButtons: 'Underline,Subscript,Superscript,Cut,Copy,Paste,PasteText,PasteFromWord,Link,Unlink,Anchor,SpecialChar,Table,Maximize,Source,About,Styles,Format,Outdent,Indent',
            format_tags: 'p;h1;h2;h3;pre',
            removeDialogTabs: 'image:advanced;link:advanced',
            removePlugins: 'elementspath,floatingspace,maximize,resize',
            resize_enabled: false
        })

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
        const { onUpdate, value, ...props } = this.props
        return (
            <textarea
                id={this.state.name}
                name={this.state.name}
                defaultValue={this.state.value}
                {...props}
            ></textarea>
        )
    }
}

export default TextEditor