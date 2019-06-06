import mongoose from 'mongoose'
import { Image, User } from 'models'
import path from 'path'
import fs from 'fs-extra'
import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import gm from 'gm'
import webConfig from 'config'

const im = gm.subClass({ imageMagick: true })

const s3 = new AWS.S3()

// const avatarStorage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, `user-uploads/profile-images/`)
//   },
//   filename: function(req, file, callback) {
//     const { currentUser } = req
//     const { username } = currentUser
//     let ext = path.extname(file.originalname).length ? path.ext(file.originalname) : '.png'
//     callback(null, username + '-' + Date.now() + ext)
//   }
// })

const storage = multerS3({
  s3,
  bucket: 'ezivnuska/user-uploads/profile-images',
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
  uploadAvatar: async (req, res, next) => {
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

    upload(req, res, err => {
      if (err)
        return res.status(400).json({ error: `Error uploading file. ${err}` })
      
      const { file, currentUser } = req
      const { key, bucket } = file
      const thumbPath = `${bucket}/small`

      s3.getObject({
        Bucket: bucket,
        Key: key
      }, (error, data) => {
        if (error)
          return res.json({ error })

        try {
          im(data.Body)
            .resize(50, 50)
            .gravity('Center')
            .extent(50, 50)
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

                User.findOne({ email: currentUser.email }, (err, user) => {
                  if (err) return res.json({ error: `Error finding user with email ${currentUser.email}` })
                  
                  if (!user) return res.json({ error: 'Error: no user found' })
                  
                  // delete old avatar files

                  s3.deleteObject({
                    Bucket: bucket,
                    Key: user.profileImage
                  }, err => {
                    if (err)
                      return res.json({ error: `Error deleting avatar: ${err}` })

                    s3.deleteObject({
                      Bucket: thumbPath,
                      Key: user.profileImage
                    }, err => {
                      if (err)
                        return res.json({ error: `Error deleting thumb: ${err}` })
                      
                      return res.json({
                        newFilename: key
                      })
                    })
                  })
                })
              })
            })
        } catch (error) {
          return res.json({ error })
        }
      })
    })
      

      // try {
      //   fs.pathExists(path)
      //   .then(exists => {
      //     console.log('ensure file exists at path', path, exists)
      //     const writePath = `${webConfig.profileImagesPath}/small/${filename}`
      //     console.log('saving thumbnail at path', writePath)

      //     // if upload successful,
      //     // resize and save thumbnail to disk
          
      //     gm(path)
      //     .resize(50, 50)
      //     .gravity('Center')
      //     .extent(50, 50)
      //     .quality(75)
      //     .noProfile()
      //     .file(filename, err => {
      //     // .write(writePath, err => {
      //       if (err) {
      //         console.log('error writing thumbnail', err)
      //         throw new Error(err)
      //       }
            
      //       console.log('thumbnail saved to disk')
            
      //       // fetch previous avatar info
      //       console.log('\nfetching previous image data')

      //       User.findOne({ email: currentUser.email }, (err, user) => {
      //         if (err) {
      //           console.log('Error finding user with email ', currentUser.email)
      //           throw new Error('Error: finding user', err)
      //         }
              
      //         if (!user) {
      //           throw new Error('Error: no user found')
      //         }
              
      //         // delete old avatar files
      //         console.log('\nattempting to delete old avatar files with filename: ', user.profileImage)

      //         const buildPath = `build/public/${webConfig.assetPath}`,
      //           avatar = `${webConfig.profileImagesPath}/${user.profileImage}`,
      //           thumb = `${webConfig.profileImagesPath}/small/${user.profileImage}`
  
      //         fs.pathExists(avatar)
      //         .then(exists => {
      //           console.log('\navatar exists in user-uploads directory', avatar, exists)
      //           if (exists) {
      //             console.log('deleting file at path', avatar)
      //             fs.unlink(avatar, err => {
      //               if (err) throw err
      //               console.log('avatar deleted from user-uploads', avatar)
      //             })
      //           } else {
      //             console.log('no avatar to delete from user-uploads', avatar)
      //           }
      //         })
  
      //         fs.pathExists(thumb)
      //         .then(exists => {
      //           console.log('\nthumb exists in user-uploads-directory', thumb, exists)
      //           if (exists) {
      //             console.log('deleting file at path', thumb)
      //             fs.unlink(thumb, err => {
      //               if (err) throw err
      //               console.log('thumb deleted from user-uploads:', thumb)
      //             })
      //           } else {
      //             console.log('no thumb to delete from user-uploads', thumb)
      //           }
      //         })
              
      //         const avatarPath = `${buildPath}/${avatar}`
      //         fs.pathExists(avatarPath)
      //         .then(exists => {
      //           console.log('\navatar exists at path', avatarPath, exists)
      //           if (exists) {
      //             console.log('deleting file at path', avatarPath)
      //             fs.unlink(avatarPath, err => {
      //               if (err) throw err
      //               console.log('avatar deleted:', avatarPath)
      //             })
      //           } else {
      //             console.log('no avatar to delete', avatarPath)
      //           }
      //         })

      //         const thumbPath = `${buildPath}/${thumb}`
      //         fs.pathExists(thumbPath)
      //         .then(exists => {
      //           console.log('\nthumb exists at path', thumbPath, exists)
      //           if (exists) {
      //             console.log('deleting file at path', thumbPath)
      //             fs.unlink(thumbPath, err => {
      //               if (err) throw err
      //               console.log('thumb deleted:', thumbPath)
      //             })
      //           } else {
      //             console.log('no thumb to delete', thumbPath)
      //           }
      //         })
  
      //         return res.json({
      //           newFilename: filename
      //         })
      //       })
      //     })
      //   })
      // } catch(err) {
      //   console.log('Error writing file:', err)
      //   return res.status(400).json({
      //     error: `Error writing file. ${err}`
      //   })
      // }
  }
}
