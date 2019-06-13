import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import generator from 'generate-password'
import axios from 'axios'
import webConfig from 'config'
import { AuthenticationError } from 'apollo-server'

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({
    username, email
  }, secret, { expiresIn })
}

const resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null
      }
      try {
        const user = await User.findOne({ email: currentUser.email })
        return user
      } catch(err) {
        console.log(err)
      }
    },
    getUserProfile: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null
      }
      const user = await User.findOne({ email: currentUser.email })
      return user
    },
    getAllUsers: async (root, args, { User }) => {
      const users = await User.find().sort({
        joinDate: 'desc'
      })
      return users
    },
    profilePage: async (root, { username }, { User }) => {
      const profile = await User.findOne({ username })
      return profile
    }
  },
  Mutation: {
    signupUser: async (root, { email, username, password }, { User }) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new AuthenticationError('User already exists')
      }
      const newUser = await new User({
        email,
        username,
        password,
      }).save()
      
      return { token: createToken(newUser, process.env.JWT_SECRET, '24hr')}
    },
    signinUser: async (root, { email, password }, { User }) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw new AuthenticationError('User not found')
      }
      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        throw new AuthenticationError('Invalid password')
      }

      return { token: createToken(user, process.env.JWT_SECRET, '24hr')}
    },
    editProfile: async (root, { email, bio }, { User }) => {
      const user = await User.findOneAndUpdate({ email }, { $set: { bio }}, { new: true })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    },
    setProfileIMG: async (root, { email, profileImage }, { User }) => {
      const user = await User.findOneAndUpdate({ email }, { $set: { profileImage }}, { new: true })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    },
    changeEmail: async (root, { currentEmail, newEmail }, { User }) => {
      if (!user) {
        throw new Error('User not found')
      }
      return user
    },
    changePassword: (root, { email, password }, { User }) => {
      const saltRounds = 10
      return bcrypt.hash(password, saltRounds).then(async hash => {
        const user = await User.findOneAndUpdate({ email }, { $set: { password: hash }}, { new: true })
        if (!user) {
          throw new Error('User not found')
        }
        return user
      })
    },
    passwordReset: async (root, { email }, { User }) => {
      const saltRounds = 10
      const generatedPassword = generator.generate({ length: 10, numbers: true })
      return bcrypt.hash(heneratedPassword, saltRounds).then(async hash => {
        const user = await User.findOneAndUpdate({ email }, { $set: { password: hash }}, { new: true })
        if (!user) {
          throw new Error('User not found')
        } else {
          const data = {
            email,
            generatedPassword,
          }

          axios.post(`${webConfig.siteURL}/password-reset`, data)
          .then(response => {
            console.log('Email sent!')
          })
          .catch(e => {
            console.log(e)
          })
        }
        return user
      })
    }
  }
}

export default resolvers