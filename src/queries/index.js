import { gql } from 'apollo-boost'

export const SIGNUP_USER = gql`
  mutation($email: String!, $username: String!, $password: String!){
    signupUser(email: $email, username: $username, password: $password){ token }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      joinDate
      username
      email
      profileImage
      bio
    }
  }
`

export const EDIT_PROFILE = gql`
  mutation($email: String!, $bio: String){
    editProfile(email: $email, bio: $bio) {
      bio
    }
  }
`

export const SET_PROFILE_IMAGE = gql`
  mutation($email: String!, $profileImage: String!){
    setProfileIMG(email: $email, profileImage: $profileImage){
      profileImage
    }
  }
`

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!){
    signinUser(email: $email, password: $password){ token }
  }
`

export const CHANGE_EMAIL = gql`
  mutation($currentEmail: String!, $newEmail: String!){
    changeEmail(currentEmail: $currentEmail, newEmail: $newEmail){
      email
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation($email: String!, $password: String!){
    changePassword(email: $email, password: $password){
      email
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation($email: String!){
    passwordReset(email: $email){
      email
    }
  }
`

export const GET_USER_PROFILE = gql`
  query {
    getUserProfile {
      _id
      bio
      profileImage
    }
  }
`

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      _id
      bio
      profileImage
      username
    }
  }
`

export const PROFILE_PAGE = gql`
  query($username: String!) {
    profilePage(username: $username) {
      _id
      email
      bio
      profileImage
      username
    }
  }
`

export const GET_BOND = gql`
  query($userId: ID!) {
    getBond(userId: $userId) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  }
`

export const GET_MUTUAL_BOND = gql`
  query($user1: ID!, $user2: ID!) {
    getMutualBond(user1: $user1, user2: $user2) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  }
`

export const GET_MUTUAL_BONDS = gql`
  query($username: String!) {
    getMutualBonds(username: $username) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  }
`

export const GET_BONDS = gql`
  query {
    getBonds {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  }
`

export const ADD_BOND = gql`
  mutation($responder: ID!) {
    addBond(responder: $responder) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  }
`

export const CONFIRM_BOND = gql`
  mutation($id: ID!) {
    confirmBond(id: $id) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  }
`

export const REMOVE_BOND = gql`
  mutation($id: ID!) {
    removeBond(id: $id) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  }
`

export const CANCEL_BOND = gql`
  mutation($id: ID!) {
    cancelBond(id: $id) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  }
`

export const  DECLINE_BOND = gql`
  mutation($id: ID!) {
    declineBond(id: $id) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  } 
`

export const  DELETE_BOND = gql`
  mutation($id: ID!) {
    deleteBond(id: $id) {
      _id
      sender
      responder
      confirmed
      declined
      cancelled
      actionerId
    }
  } 
`

