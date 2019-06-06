import 'babel-polyfill'
import 'isomorphic-unfetch'
require('dotenv').config({ path: 'variables.env' })
import path from 'path'
import fs from 'fs'
import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { StaticRouter } from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import mongoose from 'mongoose'
import cors from 'cors'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { Helmet } from 'react-helmet'
import AppComponent from './src/app'
import HTML from 'helpers/renderer'
import AWS from 'aws-sdk'
import webConfig from 'config'

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-west-1'
})

import avatarRoutes from 'api/avatar'

import server from './src/graphql'

// Connect MongoDB
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
.then(() => {
  console.log('Connection to DB successful')
})
.catch(err => {
  console.log(`Connection to DB error: ${err}`)
})

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: `${webConfig.siteURL}`,
    credentials: true,
  })
)

app.use(cookieParser())

app.use('/', express.static('build/public'))

// app.get('/user-uploads/profile-images/small/:file', (req, res) => {

//   const file_name = req.params.file
//   const get_file = path.resolve('./user-uploads/profile-images/small/' + req.params.file)
//   const current_files = fs.readdirSync('./user-uploads/profile-images/small/')
//   const fileExists = current_files.includes(file_name)

//   if (fileExists) {
//     res.status(200).sendFile(get_file)
//   } else {
//     res.status(404).send('No file found!')
//   }
// })

// app.get('/user-uploads/profile-images/:file', (req, res) => {

//   const file_name = req.params.file
//   const get_file = path.resolve('./user-uploads/profile-images/' + req.params.file)
//   const current_files = fs.readdirSync('./user-uploads/profile-images/')
//   const fileExists = current_files.includes(file_name)

//   if (fileExists) {
//     res.status(200).sendFile(get_file)
//   } else {
//     res.status(404).send('No file found!')
//   }
// })

// app.get('/user-uploads/:file', (req, res) => {

//   const file_name = req.params.file
//   const get_file = path.resolve('./user-uploads/profile-images/' + req.params.file)
//   const current_files = fs.readdirSync('./user-uploads/profile-images/')
//   const fileExists = current_files.includes(file_name)

//   if (fileExists) {
//     res.status(200).sendFile(get_file)
//   } else {
//     res.status(404).send('No file found!')
//   }
// })

// JWT Middleware
app.use(async (req, res, next) => {
  const token = req.cookies.token ? req.cookies.token : null
  if (token !== null) {
    try {
      const currentUser = await jwt.verify(token, process.env.JWT_SECRET)
      req.currentUser = currentUser
    } catch (err) {
      res.clearCookie('token')
    }
  }
  next()
})

server.applyMiddleware({ app })

app.get(['*/:param', '*'], (req, res) => {

  const URL_Param = req.params.param ? req.params.param : null
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${webConfig.siteURL}/graphql`,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  })

  const context = {
    URL_Param,
  }

  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <AppComponent />
      </StaticRouter>
    </ApolloProvider>
  )

  getDataFromTree(App)
  .then(() => {
    const content = ReactDOM.renderToString(App)
    const helmet = Helmet.renderStatic()

    const initialState = client.extract()
    const html = <HTML content={content} state={initialState} helmet={helmet} />

    res.status(200)
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`)
    res.end()
  })
})

app.post('/password-reset', (req, response) => {
  const mailer = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.  NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PW,
    }
  })

  mailer.use('compile', hbs({
    viewPath: `${webConfig.assetURL}/email_templates`,
    extName: '.hbs',
  }))

  mailer.sendMail({
    from: process.env.NODEMAILER_FROM_EMAIL,
    to: req.body.email,
    subject: 'Annallog - Password Reset',
    template: 'passwordReset',
    context: {
      email: req.body.email,
      password: req.body.generatedPassword,
    },
  }, (err, res) => {
    if (err) {
      return response.status(500).send('500 - Internal Service Error')
    }
    response.status(200).send('200 - The request has succeeded.')
  })
})

// app.use(fileUpload())
app.post('/upload', avatarRoutes.uploadAvatar)
// app.post('/upload', (req, res) => {
//   if (!req.files) return res.status(400).send('No files were uploaded.')
//   const current_files = fs.readdirSync('./user-uploads/profile-images/')
//   let profilePic = req.files.selectedFile
//   console.log('profilePic', profilePic)
//   let file_ext = getFileType(profilePic.mimetype)
//   let tempFilename = randomstring.generate(21) + file_ext
//   const fileExists = current_files.includes(tempFilename)
//   while (fileExists) {
//     let string = randomstring.generate(21)
//     tempFilename = string + file_ext
//
//     if (!current_files.includes(tempFilename)) {
//       break
//     }
//   }
//   let send_filePath = './user-uploads/profile-images/' + tempFilename
//   profilePic.mv(send_filePath, err => {
//     if (err) return res.status(500).send(err)
//     const res_dataObj = {
//       'newFilename': tempFilename
//     }
//     res.send(res_dataObj)
//   })
// })

app.listen(PORT, () => console.log(`App running on port ${PORT}`))
