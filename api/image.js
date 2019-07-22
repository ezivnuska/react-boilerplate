// import mongoose from 'mongoose'
import { User } from 'models'
import path from 'path'
import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import gm from 'gm'

const im = gm.subClass({ imageMagick: true })

const s3 = new AWS.S3()

const storage = multerS3({
  s3,
  bucket: 'ezivnuska/user-uploads/user-images',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, callback) => {
    callback(null, { fieldName: file.fieldname })
  },
  key: (req, file, callback) => {
    const { currentUser } = req
    const { username } = currentUser
    let ext = path.extname(file.originalname).length ? path.ext(file.originalname) : '.png'
    callback(null, `${username}-${Date.now().toString()}${ext}`)
  }
})

export default {
  uploadImage: async (req, res, next) => {
    const upload = multer({
      storage,
      limits: {
        fileSize: 2000000
      },
      onFileSizeLimit: file => {
        res.json({
          message: 'Upload failed. File size too large.',
          status: MARankings.Enums.Status.FILE_TOO_LARGE,
        })
      }
    }).single('file')

    try {
      upload(req, res, err => {
        if (err)
          return res.status(400).json({ error: `Error uploading file. ${err}` })
        
        const { currentUser, file } = req
        const { key, bucket } = file
        const thumbPath = `${bucket}/small`
        
        s3.getObject({
          Bucket: bucket,
          Key: key
        }, (error, data) => {
          if (error)
            return res.json({ error })

          im(data.Body)
            .autoOrient()
            .resize(300, 300)
            .gravity('Center')
            .extent(300, 300)
            .quality(75)
            .noProfile()
            .toBuffer('png', (err, buffer) => {
              if (err)
                return res.json({ error: err })

              s3.putObject({
                Bucket: thumbPath,
                Key: key,
                Body: buffer,
                ContentType: data.contentType
              }, err => {
                if (err) return res.json({
                  error: `Unable to resize ${bucket}/${key} and upload to ${thumbPath}/${key} due to an error: ${err}`
                })
                
                return res.json({
                  newFilename: key
                })

                // User.findOne({ email: currentUser.email }, (err, user) => {
                //   if (err) return res.json({ error: `Error finding user with email ${currentUser.email}` })
                  
                //   if (!user) return res.json({ error: 'Error: no user found' })
                  
                //   // if previous avatar
                //   if (user.profileImage) {

                //     // delete old avatar files
                //     s3.deleteObject({
                //       Bucket: bucket,
                //       Key: user.profileImage
                //     }, err => {
                //       if (err)
                //         return res.json({ error: `Error deleting avatar: ${err}` })
  
                //       s3.deleteObject({
                //         Bucket: thumbPath,
                //         Key: user.profileImage
                //       }, err => {
                //         if (err) return res.json({
                //           error: `Error deleting thumb: ${err}`
                //         })
                        
                //         return res.json({
                //           newFilename: key
                //         })
                //       })
                //     })
                //   } else {
                //     // if no previous avatar exists
                //     // return new avatar key
                //     return res.json({
                //       newFilename: key
                //     })
                //   }
                // })
              })
            })
        })
      })
    } catch (error) {
      return res.json({ error })
    }
  }
}
