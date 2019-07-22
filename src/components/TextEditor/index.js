import React, { Fragment, Component } from 'react'
import axios from 'axios'
import EXIF from 'exif-js'
import webConfig from 'config'

import './TextEditor.scss'

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name || 'editor',
            value: this.props.value || ''
        }
    }
    
    componentDidMount() {
        const { name } = this.state

        CKEDITOR.stylesSet.add( 'bodyMargin', [
            {
                name: 'Body Margin',
                element: 'body',
                attributes: {
                    style: 'margin: 0;'
                }
            }
        ])

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
            bodyId: 'editor-body'
        })

        editor.on('change', e => this.onChange(e))

        editor.on('instanceReady', e => {
            const editorInstance = e.editor
            editorInstance.commands.image.exec = editor => this.insertImage()
        })
        
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.state.uploading && nextState.uploaded) {
            return true
        }
        return true
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
        const { name } = this.state
        const { onUpdate } = this.props
        // const filteredImages = images.filter((image, i) => {
        //     const editor = CKEDITOR.instances[name]
        //     return editor.document.getById(`temp-${i}`) !== null
        // })
        
        const value = editor.getData()
        this.setState({ value })

        onUpdate(value)
    }

    dataURItoBlob = dataURI => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1])
        else
            byteString = unescape(dataURI.split(',')[1])
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    
        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length)
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
    
        return new Blob([ia], {type:mimeString})
    }

    onFileLoaded = dataUrl => {
        const self = this
        const resetOrientation = this.resetOrientation
        const reader = new FileReader()
        reader.onload = e => {
            const image = e.target.result
            const exif = EXIF.readFromBinaryFile(image)
            resetOrientation(self, dataUrl, exif.Orientation || null)
        }
        reader.readAsArrayBuffer(this.dataURItoBlob(dataUrl))
    }

    resetOrientation(self, srcBase64, srcOrientation) {
        
        const image = new Image()
        image.onload = () => {
            const width = image.width,
                height = image.height,
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d')
            
            // set proper canvas dimensions before transform & export
            if (4 < srcOrientation && srcOrientation < 9) {
                canvas.width = height;
                canvas.height = width;
            } else {
                canvas.width = width;
                canvas.height = height;
            }
        
            // transform context before drawing image
            switch (srcOrientation) {
                case 2: ctx.transform(-1, 0, 0, 1, width, 0); break
                case 3: ctx.transform(-1, 0, 0, -1, width, height ); break
                case 4: ctx.transform(1, 0, 0, -1, 0, height ); break
                case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
                case 6: ctx.transform(0, 1, -1, 0, height , 0); break
                case 7: ctx.transform(0, -1, -1, 0, height , width); break
                case 8: ctx.transform(0, -1, 1, 0, 0, width); break
                default: break
            }
    
            // draw image
            ctx.drawImage(image, 0, 0)
            
            self.resizeImage(canvas.toDataURL('image/png;base64;'))
            // export base64
            // self.setState({ images: [...self.state.images, canvas.toDataURL('image/png;base64')] })
        }
    
        image.src = srcBase64
    }

    resizeImage = src => {
        const { name } = this.state
        
        const MAX_SIZE = 600
        const image = new Image()
        image.onload = () => {
    
            const canvas = document.createElement('canvas')
        
            if (image.height > MAX_SIZE) {
                image.width *= MAX_SIZE / image.height
                image.height = MAX_SIZE
            }
        
            if (image.width > MAX_SIZE) {
                image.height *= MAX_SIZE / image.width
                image.width = MAX_SIZE
            }
        
            const ctx = canvas.getContext('2d')
            canvas.width = image.width
            canvas.height = image.height
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, image.width, image.height)
        
            const dataUrl = canvas.toDataURL('image/png;base64;')
            const blob = this.dataURItoBlob(dataUrl)
            
            this.uploadImage(blob)
        }

        image.src = src
    }

    uploadImage = blob => {
        
        this.setState({ uploading: true, uploaded: false })
    
        const formData = new FormData()
        formData.append('file', blob)
        
        axios.post('/upload/image', formData)
        .then(({ data: { newFilename } }) => {
            this.setState({ uploading: false, uploaded: true})
            // this.updateProfileImage(newFilename)
            console.log('newFilename', newFilename)
            
            const editor = CKEDITOR.instances[this.state.name]
            const imageContainer = new CKEDITOR.dom.element('div')
            imageContainer.setStyle('text-align', 'center')
            const img = new CKEDITOR.dom.element('img')
            img.setAttribute('src', `${webConfig.bucketUrl}/${webConfig.userImagesPath}/small/${newFilename}`)
            img.setStyle('margin', '0 auto')
            imageContainer.append(img)
            editor.insertElement(imageContainer)
        })
    }

    onInputChanged = e => {
        e.preventDefault()
        const onFileLoaded = this.onFileLoaded
        const input = document.getElementById('file-upload')
        const file = input.files[0]

        const reader = new FileReader()
        reader.onload = e => {
            onFileLoaded(e.target.result)
            
            // const image = new Image()
            
            // image.onload = () => {
            //     const MAX_SIZE = 600
            //     if (image.height > MAX_SIZE) {
            //         image.width *= MAX_SIZE / image.height
            //         image.height = MAX_SIZE
            //     }

            //     if (image.width > MAX_SIZE) {
            //         image.height *= MAX_SIZE / image.width
            //         image.width = MAX_SIZE
            //     }

            //     const canvas = document.createElement('canvas')
            //     const ctx = canvas.getContext('2d')
            //     canvas.width = image.width
            //     canvas.height = image.height
            //     ctx.clearRect(0, 0, canvas.width, canvas.height)
            //     ctx.drawImage(image, 0, 0, image.width, image.height)

            //     const dataURL = canvas.toDataURL('image/png;base64;')
            // }
        }

        reader.readAsDataURL(file)
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