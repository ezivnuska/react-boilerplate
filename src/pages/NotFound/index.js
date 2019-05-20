import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Heading } from 'components'

const head = () => (
  <Helmet bodyAttributes={{class: 'notFound404ErrorPage'}}>
    <title>404 Not Found</title>
  </Helmet>
)

const NotFound = () => (
  <Fragment>
    {head()}
    <Heading level={1}>404 Not Found</Heading>
  </Fragment>
)

export default NotFound
