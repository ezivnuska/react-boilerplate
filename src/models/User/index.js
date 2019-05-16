import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String
    },
    profileImage: {
        type: String
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', function(next) {

  if(!this.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if(err) return next(err)
      this.password = hash

      next()
    })
  })
})

export default model('User', UserSchema)