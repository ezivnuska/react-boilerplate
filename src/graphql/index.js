import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import User from './../models/User'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    User,
    currentUser: req.currentUser
  }),
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  }
})

export default server
