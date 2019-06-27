import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    _id: ID,
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

  type Bond {
    _id: ID!,
    sender: ID!,
    responder: ID!,
    confirmed: Boolean,
    declined: Boolean,
    cancelled: Boolean
  }

  type Query {
    getCurrentUser: User
    getUserProfile: User
    getAllUsers: [User]
    profilePage(username: String!): User
    getBond(userId: ID!): Bond
    getMutualBond(user1: ID!, user2: ID!): Bond
    getMutualBonds(username: String!): [Bond]
    getBonds: [Bond]
  }

  type Mutation {
    signupUser(email: String!, username: String!, password: String!): Token
    signinUser(email: String!, password: String!): Token
    editProfile(email: String!, bio: String): User
    setProfileIMG(email: String!, profileImage: String!): User
    changeEmail(currentEmail: String!, newEmail: String!): User
    changePassword(email: String!, password: String!): User
    passwordReset(email: String!): User
    addBond(responder: ID!): Bond
    confirmBond(id: ID!): Bond
    removeBond(id: ID!): Bond
    cancelBond(id: ID!): Bond
    declineBond(bondId: ID!): Bond
    deleteBond(id: ID!): Bond
  }
`

export default typeDefs
