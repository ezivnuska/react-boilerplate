import { gql } from 'apollo-boost'

export const SIGNUP_USER = gql`
  mutation($email: String!, $username: String!, $password: String!){
    signupUser(email: $email, username: $username, password: $password){ token }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      firstname
      lastname
      joinDate
      username
      email
      profileImage
    }
  }
`

export const EDIT_PROFILE = gql`
  mutation($email: String!, $bio: String, $firstname: String, $lastname: String){
    editProfile(email: $email, bio: $bio, firstname: $firstname, lastname: $lastname) {
      bio
      firstname
      lastname
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
      firstname
      lastname
      bio
      profileImage
      username
    }
  }
`

export const PROFILE_PAGE = gql`
  query($username: String!) {
    profilePage(username: $username) {
      firstname
      lastname
      bio
      profileImage
      username
    }
  }
`
