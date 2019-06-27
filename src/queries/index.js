import { gql } from 'apollo-boost'

export const SIGNUP_USER = gql`
  mutation($email: String!, $username: String!, $password: String!){
    signupUser(email: $email, username: $username, password: $password){ token }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
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
      bio
      profileImage
    }
  }
`

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      bio
      profileImage
      username
    }
  }
`

export const PROFILE_PAGE = gql`
  query($username: String!) {
    profilePage(username: $username) {
      email
      bio
      profileImage
      username
    }
  }
`

export const ADD_BOND = gql`
  mutation($sender: String!) {
    addBond(sender: $sender) {
      bond
    }
  }
`

export const GET_BOND = gql`
  query($userId: String!) {
    getBond(userId: $userId) {
      bond
    }
  }
`

export const GET_MUTUAL_BOND = gql`
  query($user1: String!, $user2: String!) {
    getMutualBond(user1: $user1, user2: $user2) {
      bond
    }
  }
`

export const GET_MUTUAL_BONDS = gql`
  query($username: String!) {
    getMutualBonds(username: $username) {
      bonds,
      username
    }
  }
`

export const GET_BONDS = gql`
  query {
    getBonds {
      bonds
    }
  }
`

export const CONFIRM_BOND = gql`
  query($id: String!) {
    confirmBond(id: $id) {
      bond
    }
  }
`

export const REMOVE_BOND = gql`
  mutation($id: String!) {
    removeBond(id: $id) {
      bond,
      actionerId
    }
  }
`

export const CANCEL_BOND = gql`
  mutation($bondId: String!) {
    cancelBond(bondId: $bondId) {
      bond
    }
  }
`

export const  DECLINE_BOND = gql`
  mutation($bondId: String!) {
    declineBond(bondId: $bondId) {
      bond
    }
  } 
`

export const  DELETE_BOND = gql`
  mutation($id: String!) {
    deeteBond(id: $id) {
      bond
    }
  } 
`

