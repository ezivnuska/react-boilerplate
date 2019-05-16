import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Heading } from 'components'

const head = () => (
  <Helmet bodyAttributes={{class: 'notFound404ErrorPage'}}>
    <title>404 Not Found</title>
  </Helmet>
)

const NotFound = () => (
  <>
    {head()}
    <div className='container'>
      <Heading level={1}>404 Not Found</Heading>
      404 Not Found
    </div>
  </>
)

export default NotFound
