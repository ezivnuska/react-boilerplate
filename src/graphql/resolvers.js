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
    },
    getBond: async (root, args, { userId }, { Bond }) => {
      const bond = await Bond.findOne({
        $or: [
          { $and: [{ sender: userId }, { responder: _id }] },
          { $and: [{ sender: _id }, { responder: userId }] },
        ]
      })
      .select('_id sender responder')
      .populate('sender responder', '_id username')
      
      console.log('booooond', bond)
      
      return res.json({
        bond
      })
    },
    getMutualBond: async (root, { user1, user2 }, { Bond }) => {
      const bond = await Bond.findOne({
        $or: [
          { $and: [{ sender: user1 }, { responder: user2 }] },
          { $and: [{ sender: user2 }, { responder: user1 }] },
        ]
      })

      return res.json({
        bond,
      })
    },
    getMutualBonds: async (root, { username }, { Bond, User }) => {
      const user = await User.findOne({ username }).select('_id')
      const bonds = await Bond.find({
        $or: [{ sender: user._id }, { responder: user._id }],
        confirmed: true,
      })
      .select('_id sender responder confirmed declined')
      .populate('sender responder', '_id username')

      return res.json({
        bonds
      })
    },
    getBonds: async (root, args, { currentUser, Bond }) => {
      const bonds = await Bond.find({
        $or: [{ sender: currentUser._id }, { responder: currentUser._id }]
      })
      .select('_id sender responder confirmed declined')
      
      return res.json({
        bonds,
      })
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
    },
    addBond: async (root, { responder }, { currentUser, Bond }) => {
      const existingBond = await Bond.findOne({
        $or: [
          { $and: [{ sender }, { responder }] },
          { $and: [{ sender: responder }, { responder: sender }] },
        ]
      })

      if (!existingBond) {
        let newBond = new Bond({
          sender,
          responder,
          confirmed: false,
          declined: false,
          actionerId: sender,
        })

        const savedBond = await newBond.save()

        const bond = await Bond.findById(savedBond._id)
        .select('_id sender responder confirmed declined actionerId')

        return res.json({ bond })
      }
    },
    confirmBond: async (root, { id }, { Bond, currentUser }) => {
      const existingBond = await Bond.findByIdAndUpdate(id, {
        confirmed: true,
        declined: false,
        actionerId: currentUser._id,
      })

      const bond = await Bond.findOne({ _id: existingBond._id })
      .select('_id sender responder confirmed declined actionerId')

      return res.json({ bond })
    },
    removeBond: async (root, { id }, { Bond, currentUser }) => {
      const bondToRemove = await Bond.findByIdAndUpdate(id, {
        confirmed: false,
        declined: true,
        actionerId: currentUser._id,
      })

      const bond = await Bond.findOne({ _id: bondToRemove._id })
      .select('_id sender responder confirmed declined actionerId')

      return res.json({
        bond
      })
    },
    cancelBond: async (root, { id }, { Bond, currentUser }) => {
      const bondToCancel = await Bond.findByIdAndUpdate(id, {
        confirmed: false,
        declined: false,
        actionerId: currentUser._id,
      })

      const bond = Bond.findOne({ _id: bondToCancel._id })
      .select('_id sender responder confirmed declined actionerId')

      return res.json({ bond })
    },
    declineBond: async (root, { bondId }, { Bond, currentUser }) => {
      const existingBond = await Bond.findById(bondId)
      .select('_id sender responder updater confirmed declined actionerId')

      const updatedBond = await Bond.update({ _id: existingBond._id }, {
          declined: true,
          confirmed: false,
          actionerId: currentUser._id,
      })

      const bond = await Bond.findById(updatedBond._id)
      .select('_id sender responder confirmed declined actionerId')

      return res.json({ bond })
    },
    deleteBond: async (root, { id }, { Bond }) => {
      const bond = await Bond.findOneAndRemove({ _id: id })
      .select('_id sender responder updatedAt actionerId')

      return res.json({ bond })
    }
  }
}

export default resolvers