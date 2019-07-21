import React, { Fragment, PureComponent } from 'react'

import './TextEditor.scss'

class TextEditor extends PureComponent {
    state = {
        name: this.props.name || 'editor',
        value: this.props.value || '',
        images: []
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
            extraPlugins: 'filebrowser',
            removePlugins: 'elementspath,floatingspace,maximize,resize',
            resize_enabled: false,
            filebrowserBrowseUrl: 'javascript:void(0)',
        })

        editor.on('change', e => this.onChange(e))

        CKEDITOR.on('dialogDefinition', e => {
            CKEDITOR.tools.callFunction(15)
            
            console.log('dialogDefinition', e)
            //dialogDefinition is a ckeditor event it's fired when ckeditor dialog instance is called  
            const dialogName = e.data.name;  
            const dialogDefinition = e.data.definition;  
            if (dialogName == 'image') { //dialogName is name of dialog and identify which dialog is fired.
                console.log('dialogName', dialogName)
                this.insertImage()
            }
        })
    }

    insertImage = () => {
        const element = document.getElementById('file-upload')
        if (element && document.createEvent) {
            const event = document.createEvent('MouseEvents')
            event.initEvent('click', true, false)
            element.dispatchEvent(event)
        }
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

    onInputChanged = e => {
        e.preventDefault()
        console.log('onInputChanged', e)
    }

    render() {
        const { onUpdate, value, ...props } = this.props
        return (
            <Fragment>
                <textarea
                    id={this.state.name}
                    name={this.state.name}
                    defaultValue={this.state.value}
                    {...props}
                ></textarea>
                <input
                    type='file'
                    id='file-upload'
                    onChange={e => this.onInputChanged(e)}
                />
            </Fragment>
        )
    }
}

export default TextEditor