import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'

import AppComponent from './app'

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector('#root')
)
