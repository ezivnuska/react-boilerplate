import mongoose from 'mongoose'
import { Image, User } from 'models'
import path from 'path'
import fs from 'fs-extra'
import multer from 'multer'
import gm from 'gm'
import webConfig from '../config'

const avatarStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, `user-uploads/profile-images/`)
  },
  filename: function(req, file, callback) {
    const { currentUser } = req
    const { username } = currentUser
    let ext = path.extname(file.originalname).length ? path.ext(file.originalname) : '.png'
    callback(null, username + '-' + Date.now() + ext)
  }
})

export default {
  uploadAvatar: async (req, res, next) => {
    const upload = multer({
      storage: avatarStorage,
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
      if (err) {
        return res.status(400).json({
          error: `Error uploading file. ${err}`
        })
      }

      const { file, currentUser } = req
      const { filename, path } = file

      fs.pathExists(path)
      .then(exists => {

        gm(path)
        .resize(50, 50)
        .gravity('Center')
        .extent(50, 50)
        .quality(75)
        .noProfile()
        .write(`user-uploads/profile-images/small/${filename}`, err => {
          if (err) {
            console.log('error writing thumbnail', err)
            throw err
          }

          User.findOne({ email: currentUser.email }, (err, user) => {
            if (err) {
              console.log('Error finding user with email ', currentUser.email)
              throw(err)
            }
            if (!user) throw('no user found')

            const buildPath = 'build/public/assets/',
              avatar = `user-uploads/profile-images/${user.profileImage}`,
              thumb = `user-uploads/profile-images/small/${user.profileImage}`

            fs.pathExists(`${buildPath}${avatar}`)
            .then(exists => {
              if (exists) {
                fs.unlink(`${buildPath}${avatar}`, err => {
                  if (err) throw err
                  console.log('avatar deleted from build:', `${buildPath}${avatar}`)
                })
              } else {
                console.log('no avatar to delete from build at path', `${buildPath}${avatar}`)
              }
            })

            fs.pathExists(`${buildPath}${thumb}`)
            .then(exists => {
              if (exists) {
                fs.unlink(`${buildPath}${thumb}`, err => {
                  if (err) throw err
                  console.log('thumb deleted from build:', `${buildPath}${thumb}`)
                })
              } else {
                console.log('no thumb to delete from build at path', `${buildPath}${thumb}`)
              }
            })

            fs.pathExists(avatar)
            .then(exists => {
              if (exists) {
                fs.unlink(avatar, err => {
                  if (err) throw err
                  console.log('avatar deleted:', avatar)
                })
              } else {
                console.log('no avatar to delete at path', avatar)
              }
            })

            fs.pathExists(thumb)
            .then(exists => {
              if (exists) {
                fs.unlink(thumb, err => {
                  if (err) throw err
                  console.log('thumb deleted:', thumb)
                })
              } else {
                console.log('no thumb to delete at path', thumb)
              }
            })

            return res.json({
              newFilename: filename
            })
          })
        })
      })
    })
  },
}
