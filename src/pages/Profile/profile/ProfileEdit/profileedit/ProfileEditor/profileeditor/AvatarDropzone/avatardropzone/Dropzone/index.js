import React, { useCallback } from 'react'
// import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ children, handleDrop, noClick, size, ...props }) => {
  const onDrop = useCallback(acceptedFiles => {

    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading failed')
    reader.onload = e => {
      const filedata = e.target.result
      const image = new Image()
      image.src = filedata
      handleDrop(filedata)
    }

    reader.readAsDataURL(acceptedFiles[0])
  }, [])

  const styles = {
    height: size,
    width: size
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
    noClick
  })

  return (
    <div {...getRootProps()} style={styles} {...props}>
      <input {...getInputProps()} />
      {children}
    </div>
  )
}

// Dropzone.propTypes = {
//   image: PropTypes.string,
//   onDrop: PropTypes.func.isRequired,
//   size: PropTypes.number
// }

export default Dropzone
