import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import {
    GET_CURRENT_USER,
    SET_PROFILE_IMAGE,
    GET_ALL_USERS,
    PROFILE_PAGE,
} from 'queries'
import axios from 'axios'
import toastr from 'toastr'
import ReactAvatarEditor from 'react-avatar-editor'
import webConfig from 'config'
import {
    Dropzone,
    Heading,
    Spinner,
} from 'components'

import './AvatarEditor.scss'

class AvatarEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blob: null,
            size: 300,
            preview: null,
            error: '',
            optimizing: false,
            optimized: false,
            uploading: false,
            uploaded: false,
            updated: false,
        }
    }

    static propTypes = {
        size: PropTypes.number,
        session: PropTypes.object,
    }
    
    componentWillMount() {
        this.updateDimensions = this.updateDimensions.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resetEditor = this.resetEditor.bind(this)
        this.handleDrop = this.handleDrop.bind(this)

        const { size } = this.props
        if (size && size !== this.state.size) {
            this.setState({ size })
        }
    }
    
    componentDidMount() {
    
        window.addEventListener('resize', this.updateDimensions)
        this.updateDimensions()
    
        toastr.options = {
            'closeButton': false,
            'debug': false,
            'newestOnTop': true,
            'progressBar': true,
            'positionClass': 'toast-bottom-right',
            'preventDuplicates': false,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': '5000',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if ((this.state.uploading && !nextState.uploading) &&
            (!this.state.uploaded && nextState.uploaded)) {
            
            this.setState({
                blob: null,
                uploading: false,
                uploaded: true,
                preview: null,
                updated: true,
            })

            return false
        }
        
        if (this.state.uploaded && !this.state.uploading) {
            this.setState({ uploaded: false })
            return false
        }

        if (this.state.updated) {
            const previousImage = this.props.session.getCurrentUser.profileImage
            const updatedImage = nextProps.session.getCurrentUser.profileImage
            if (previousImage === updatedImage) {
                return false
            } else {
                this.setState({ updated: false })
            }
        }

        return true
    }
      
    componentDidUpdate(prevProps, prevState) {
        
        if (!prevState.blob && this.state.blob) {
            this.uploadImage()
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }
    
    updateProfileImage(newFile) {
        const { mutate, session } = this.props
        const currentUser = session.getCurrentUser
        const { username } = currentUser
        
        mutate({
            variables: {
                email: currentUser.email,
                profileImage: newFile
            },
            refetchQueries: [
                { query: GET_CURRENT_USER },
                { query: GET_ALL_USERS },
                { query: PROFILE_PAGE, variables: { username } }
            ],
            update: (cache, { data: { setProfileIMG } }) => {
        
                const { getCurrentUser } = cache.readQuery({
                    query: GET_CURRENT_USER
                })
        
                cache.writeQuery({
                    query: GET_CURRENT_USER,
                    data: {
                        getCurrentUser: { ...getCurrentUser, profileImage: setProfileIMG.profileImage }
                    }
                })
            }
        }).then(({ data }) => {
            toastr.success('We have updated your profile image!', 'Saved!')
        })
    }
    
    optimizeImage = src => {
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
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            canvas.width = image.width
            canvas.height = image.height
            ctx.drawImage(image, 0, 0, image.width, image.height)
        
            const dataURL = canvas.toDataURL('image/png;base64;')
            const blob = this.dataURItoBlob(dataURL)
        
            this.setState({ blob, optimizing: false, optimized: true })
        }
        image.src = src
        this.setState({ optimizing: true, optimized: false })
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
    
    handleDrop = dataUrl => {
        this.setState({ preview: dataUrl })
    }
    
    uploadImage = () => {
        this.setState({ uploading: true, uploaded: false })
    
        const formData = new FormData()
        formData.append('file', this.state.blob)
        
        axios.post('/upload', formData)
        .then(({ data: { newFilename } }) => {
            this.setState({ uploading: false, uploaded: true})
            this.updateProfileImage(newFilename)
        })
    }
    
    setEditorRef = editor => this.editor = editor
    
    validateForm = () => {
        const { uploading, optimizing } = this.state
        const isInvalid = uploading || optimizing
        return isInvalid
    }
    
    handleSubmit = e => {
    
        e.preventDefault()
        if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = this.editor.getImage()
            // const context = canvas.getContext('2d')
            const dataURL = canvas.toDataURL('image/png;base64;')
            this.optimizeImage(dataURL)
        }
    }

    resetEditor = e => {
        e.preventDefault()
        this.setState({
            blob: null,
            preview: null
        })
    }
    
    updateDimensions() {
        const dropzone = document.getElementById('avatar-dropzone-wrapper')
        const maxWidth = this.state.size || 300
        const actualWidth = dropzone.offsetWidth
        this.setState({
            size: (actualWidth > maxWidth) ? maxWidth : actualWidth,
        })
    }
    
    render() {
        const { error, preview, size, uploading } = this.state
        const { session } = this.props
        const { profileImage } = session.getCurrentUser

        return (
            <div>
                <Heading level={2}>Avatar</Heading>
                <div id='avatar-dropzone-wrapper'>
                    
                    <Dropzone
                        id='dropzone'
                        handleDrop={dataUrl => this.handleDrop(dataUrl)}
                        noClick={preview !== null}
                        style={{
                            width: size + 'px',
                            height: size + 'px'
                        }}
                    >
                        <div id='avatar-editor-wrapper'>
                            {!preview ? (
                                <div id='dropzone-prompt' style={{
                                        width: size + 'px',
                                        height: size + 'px',
                                        lineHeight: size + 'px',
                                        background: profileImage ? `url(${webConfig.profileImagesURL}/${webConfig.profileImagesPath}/${profileImage})` : 'none',
                                        backgroundSize: 'cover'
                                    }}
                                >
                                    Drop file here, or click to select file.
                                </div>
                            ) : (
                                <ReactAvatarEditor
                                    image={preview}
                                    width={size - 50}
                                    height={size - 50}
                                    border={25}
                                    color={[0, 0, 0, 0.2]}
                                    scale={1.2}
                                    rotate={0}
                                    ref={this.setEditorRef}
                                />
                            )}
                        </div>
                    </Dropzone>
        
                    <div className='form-buttons'>
                        {uploading ? <Spinner /> : (
                            <Fragment>
                                <button
                                    type='button'
                                    onClick={e => this.resetEditor(e)}
                                    disabled={!preview}
                                    className='btn transparent'
                                >
                                    <i className='fas fa-times-circle fa-3x'></i>
                                </button>
                                <button
                                    type='button'
                                    onClick={e => this.handleSubmit(e)}
                                    disabled={!preview || this.validateForm()}
                                    className='btn transparent'
                                >
                                    <i className='fas fa-arrow-circle-right fa-3x'></i>
                                </button>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const AvatarEditorWithMutation = graphql(
    SET_PROFILE_IMAGE
  )(AvatarEditor)

export default AvatarEditorWithMutation