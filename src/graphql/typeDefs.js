import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    _id: ID,
    firstname: String
    lastname: String
    password: String!
    bio: String
    profileImage: String
    email: String!
    username: String!
    joinDate: String
  }

  type Token {
    token: String!
  }

  type Query {
    getCurrentUser: User
    getUserProfile: User
    getAllUsers: [User]
    profilePage(username: String!): User
  }

  type Mutation {
    signupUser(email: String!, username: String!, password: String!): Token
    signinUser(email: String!, password: String!): Token
    editProfile(email: String!, bio: String, firstname: String, lastname: String): User
    setProfileIMG(email: String!, profileImage: String!): User
    changeEmail(currentEmail: String!, newEmail: String!): User
    changePassword(email: String!, password: String!): User
    passwordReset(email: String!): User
  }
`

export default typeDefs
