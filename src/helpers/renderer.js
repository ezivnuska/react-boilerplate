import React from 'react'
import webConfig from 'config'

const HTML = ({ content, state, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()

  return (
    <html lang='en' {...htmlAttrs}>
      <head dangerouslySetInnerHTML={{
        __html: `${helmet.title.toString()}
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <meta http-equiv='X-UA-Compatible' content='ie=edge'>
        ${helmet.meta.toString()}
        <link rel='shortcut icon' href='${webConfig.siteURL}/assets/graphics/favicon.ico' />
        <link href="${webConfig.siteURL}/assets/css/main.css" rel="stylesheet" type="text/css" />
        <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
        `}}>
      </head>
      <body {...bodyAttrs}>
        <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}`
        }} />
        <script src='https:cdn.ckeditor.com/4.6.2/standard/ckeditor.js'></script>
        <script src={`${webConfig.siteURL}/client_bundle.js`}></script>
      </body>
    </html>
  )
}

export default HTML
