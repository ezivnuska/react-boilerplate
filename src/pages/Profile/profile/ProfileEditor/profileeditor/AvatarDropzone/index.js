import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import {
  GET_CURRENT_USER,
  SET_PROFILE_IMAGE,
  GET_ALL_USERS,
  PROFILE_PAGE,
} from 'queries'
import axios from 'axios'
import toastr from 'toastr'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from './avatardropzone/Dropzone'
import {
  Heading,
  Module,
  ProfileImage,
  SplitScreen
} from 'components'

import './AvatarDropzone.scss'

class AvatarDropzone extends PureComponent {

  state = {
    blob: null,
    size: 263,
    preview: null,
    newFile: null,
    error: '',
    optimizing: false,
    optimized: false,
    uploading: false,
    uploaded: false
  }

  componentWillMount() {
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.newFile && this.state.newFile) {
      this.updateProfileImage()
    }

    if (!prevState.blob && this.state.blob) {
      this.uploadImage()
    }

    if (!prevState.uploaded && this.state.uploaded) {
      this.setState({ preview: null, uploaded: false })
    }

    if (prevState.preview && !this.state.preview) {
      toastr.success('We have updated your profile image!', 'Saved!')
    }
  }

  updateProfileImage() {
    const { mutate, session } = this.props
    const currentUser = session.getCurrentUser
    const { username } = currentUser
    const { newFile } = this.state

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
    }).then(async ({ data }) => {
      // console.log('profile image updated')
    }).catch(err => console.log(err))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
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

    axios.post('/upload', formData).then(({ data: { newFilename } }) => {

      this.setState({
        blob: null,
        newFile: newFilename,
        uploading: false,
        uploaded: true
      })

    }).catch(err => console.log(err))
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

  updateDimensions() {
    const dropzone = document.getElementById('avatar-dropzone-wrapper')
    const maxWidth = this.state.size || 300
    const actualWidth = dropzone.offsetWidth
    this.setState({
      size: (actualWidth > maxWidth) ? maxWidth : actualWidth,
    })
  }

  render() {
    const { error, preview, size } = this.state
    const { session } = this.props
    const { profileImage } = session.getCurrentUser

    return (
      <div id='avatar-editor'>
        <Heading level={2}>Avatar</Heading>
        <SplitScreen>
          <Module title='Current Avatar' centered>
            <ProfileImage
              src={profileImage}
              size={size}
            />
          </Module>
          <div id='avatar-dropzone-wrapper'>
            <Heading level={4}>Upload Avatar</Heading>
            <Dropzone
              id='dropzone'
              handleDrop={dataUrl => this.handleDrop(dataUrl)}
              noClick={preview !== null}
              size={size}
            >
              <div id='avatar-editor-wrapper'>
                {preview ? (
                  <AvatarEditor
                    id='avatar-editor'
                    image={preview}
                    width={size ? (size - 50) : 263}
                    height={size ? (size - 50) : 263}
                    border={25}
                    color={[0, 0, 0, 0.2]}
                    scale={1.2}
                    rotate={0}
                    ref={this.setEditorRef}
                  />
                ) : (
                  <div style={{ lineHeight: size + 'px' }}>
                    Drop file here, or click to select file.
                  </div>
                )}
              </div>
            </Dropzone>

            <div className='form-buttons'>
              <button
                type='button'
                onClick={e => this.handleSubmit(e)}
                disabled={!preview || this.validateForm()}
                className='btn transparent'
              >
                <i className='fas fa-arrow-circle-right fa-3x'></i>
              </button>
            </div>

          </div>
        </SplitScreen>
      </div>
    )
  }
}

const AvatarDropzoneWithMutation = graphql(
  SET_PROFILE_IMAGE
)(AvatarDropzone)

export default AvatarDropzoneWithMutation
