import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import generator from 'generate-password'
import axios from 'axios'
import webConfig from 'config'
import { AuthenticationError } from 'apollo-server'

const createToken = (user, secret, expiresIn) => {
  const { _id, email, username } = user
  return jwt.sign({
    _id, email, username
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
    getBond: async (root, args, { userId }, { Bond, currentUser }) => {
      if (!currentUser) return null
      try {
        const bond = await Bond.findOne({
          $or: [
            { $and: [{ sender: userId }, { responder: currentUser._id }] },
            { $and: [{ sender: currentUser._id }, { responder: userId }] },
          ]
        })
        .select('_id sender responder confirmed declined cancelled actionerId')
        .populate('sender responder', '_id username')
        
        return bond
      } catch (e) {
        console.log('Error getting bond', e)
        return null
      }
    },
    getMutualBond: async (root, { user1, user2 }, { Bond }) => {
      const bond = await Bond.findOne({
        $or: [
          { $and: [{ sender: user1 }, { responder: user2 }] },
          { $and: [{ sender: user2 }, { responder: user1 }] },
        ]
      })

      return bond
    },
    getMutualBonds: async (root, { username }, { Bond, User }) => {
      const user = await User.findOne({ username }).select('_id')
      const bonds = await Bond.find({
        $or: [{ sender: user._id }, { responder: user._id }],
        confirmed: true,
      })
      .select('_id sender responder confirmed declined cancelled actionerId')
      .populate('sender responder', '_id username')

      return bonds
    },
    getBonds: async (root, args, { currentUser, Bond }) => {
      if (!currentUser) return null
      try {
        const bonds = await Bond.find({
          $or: [{ sender: currentUser._id }, { responder: currentUser._id }]
        })
        // .select('_id sender responder confirmed declined')
        
        return bonds
      } catch(e) {
        throw new Error(e)
      }
    },
    getAllSharedMemories: async (root, args, { Memory }) => {
      try {
        const memories = await Memory.find({ shared: true })
        .sort({ year: -1, month: -1, day: -1 })
        // .select('_id author year month day title body shared')
        // .populate('author', '_id username profileImage')

        return memories
      } catch(e) {
        throw new Error('Error: ', e)
      }
    },
    getBondedMemories: async (root, args, { Bond, currentUser, Memory }) => {
      
      if (!currentUser)
        throw new Error('Error fetching bonded memories. currentUser not found.')
      
      try {
        const bonds = await Bond.find({
          confirmed: true,
          $or: [
            { sender: currentUser._id },
            { responder: currentUser._id },
          ],
        })
        .select('sender responder')

        const authors = bonds.map(bond => {
          return (bond.sender == currentUser._id) ? bond.responder : bond.sender;
        })

        const memories = await Memory.find({
          $and: [
            {
              $or: [
                { author: { $in: authors }, shared: true },
                { author: currentUser._id },
              ]
            }
          ]
        })
        .sort({ year: -1, month: -1, day: -1, createdAt: -1, updatedAt: -1 })
        
        return memories

      } catch (e) {
        throw new Error('Error fetching bonded memories', e)
      }
    },
    getUserMemories: async (root, { userId }, { currentUser, Memory }) => {
      try {
        const userIsCurrentUser = userId === currentUser._id
        let memories
        if (userIsCurrentUser)
          memories = await Memory.find({ author: userId })
          .sort({ year: -1, month: -1, day: -1 })
        else {
          memories = await Memory.find({ author: userId, shared: true })
          .sort({ year: -1, month: -1, day: -1 })
        }
        // .select('_id author year month day title body shared')
        // .populate('author', '_id username profileImage')

        return memories
      } catch(e) {
        throw new Error('Error: ', e)
      }
    },
    getAuthor: async (root, { userId }, { User }) => {
      try {
        const author = await User.findOne({ _id: userId })
        .select('_id username profileImage')
        
        return author
      } catch (e) {
        throw new Error('Error getting author info', e)
      }
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
        connected: true
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

      const connectedUser = await User.findOneAndUpdate({ _id: user._id }, { $set: { connected: true } })

      return { token: createToken(connectedUser, process.env.JWT_SECRET, '24hr')}
    },
    signoutUser: async (root, args, { currentUser, User }) => {
      try {
        const user = await User.findOneAndUpdate({ _id: currentUser._id }, { $set: { connected: false } })
        return user
      } catch (e) {
        throw new Error('Error signing out', e)
      }
    },
    editProfile: async (root, { email, bio }, { User }) => {
      const user = await User.findOneAndUpdate({ email }, { $set: { bio } }, { new: true })
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
      if (!currentUser) return null
      try {

        const existingBond = await Bond.findOne({
          $or: [
            { $and: [{ sender: currentUser._id }, { responder }] },
            { $and: [{ sender: responder }, { responder: currentUser._id }] },
          ]
        })

        if (!existingBond) {
          let newBond = new Bond({
            sender: currentUser._id,
            responder,
            confirmed: false,
            declined: false,
            actionerId: currentUser._id,
          })
          
          const savedBond = await newBond.save()
          
          const bond = await Bond.findById(savedBond._id)
          .select('_id sender responder confirmed declined cancelled actionerId')
          
          return bond
        }
      } catch (e) {
        console.error('Error adding bond', e)
      }
    },
    confirmBond: async (root, { id }, { Bond, currentUser }) => {
      if (!currentUser) return null
      try {
        const existingBond = await Bond.findByIdAndUpdate(id, {
          confirmed: true,
          declined: false,
          actionerId: currentUser._id,
        })
  
        const bond = await Bond.findOne({ _id: existingBond._id })
        .select('_id sender responder confirmed declined cancelled actionerId')
  
        return bond
      } catch (e) {
        console.error('Error confirming bond', e)
        return null
      }
    },
    removeBond: async (root, { id }, { Bond, currentUser }) => {
      if (!currentUser) return null
      const bondToRemove = await Bond.findByIdAndUpdate(id, {
        confirmed: false,
        declined: true,
        cancelled: true,
        actionerId: currentUser._id,
      })

      const bond = await Bond.findOne({ _id: bondToRemove._id })
      .select('_id sender responder confirmed declined cancelled actionerId')

      return bond
    },
    cancelBond: async (root, { id }, { Bond, currentUser }) => {
      if (!currentUser) return null
      const bondToCancel = await Bond.findByIdAndUpdate(id, {
        confirmed: false,
        declined: false,
        cancelled: true,
        actionerId: currentUser._id,
      })

      const bond = Bond.findOne({ _id: bondToCancel._id })
      .select('_id sender responder confirmed declined cancelled actionerId')

      return bond
    },
    declineBond: async (root, { id }, { Bond, currentUser }) => {
      if (!currentUser) return null
      const existingBond = await Bond.findById(id)
      .select('_id sender responder confirmed declined cancelled actionerId')

      const updatedBond = await Bond.update({ _id: existingBond._id }, {
          declined: true,
          confirmed: false,
          actionerId: currentUser._id,
      })

      const bond = await Bond.findById(updatedBond._id)
      .select('_id sender responder confirmed declined cancelled actionerId')

      return bond
    },
    deleteBond: async (root, { id }, { Bond }) => {
      const bond = await Bond.findOneAndRemove({ _id: id })
      .select('_id sender responder confirmed declined cancelled actionerId')

      return bond
    },
    addMemory: async (root, { id, author, day, month, year, title, body, shared }, { currentUser, Memory }) => {
      
      if (currentUser._id !== author) return null

      try {
        let savedMemory
        if (id) {
          savedMemory = await Memory.findOneAndUpdate({ _id: id }, { $set: { day, month, year, title, body, shared } })
        } else {
          const newMemory = new Memory({
            author,
            day,
            month,
            year,
            title,
            body,
            shared,
          })
          savedMemory = await newMemory.save()
        }
        
        const memory = await Memory.findOne({ _id: savedMemory._id })
        .select('_id author year month day title body shared')
        // .populate('author', '_id username profileImage')
        
        return memory
      } catch(e) {
        throw new Error(e)
      }
    },
    deleteMemory: async (root, { id }, { Memory }) => {
      try {
        const deletedMemory = Memory.findOneAndRemove({ _id: id })
        .select('_id')

        return deletedMemory
      } catch (e) {
        throw new Error('Error deleting memory', e)
      }
    }
  }
}

export default resolvers