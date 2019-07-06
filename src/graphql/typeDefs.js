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
    _id: ID!
    sender: ID!
    responder: ID!
    confirmed: Boolean
    declined: Boolean
    cancelled: Boolean
    actionerId: ID
  }

  type Image {
    _id: ID!
    userId: ID!
    memoryId: ID!
    filename: String!
  }

  type Memory {
    _id: ID!
    author: ID!
    day: Int!
    month: Int!
    year: Int!
    title: String
    body: String!
    shared: Boolean
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
    getAllSharedMemories: [Memory]
    getAuthor(userId: ID!): User
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
    declineBond(id: ID!): Bond
    deleteBond(id: ID!): Bond
    addMemory(author: ID!, day: Int!, month: Int!, year: Int!, title: String, body: String!, shared: Boolean): Memory
  }
`

export default typeDefs
