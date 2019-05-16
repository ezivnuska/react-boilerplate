import mongoose from 'mongoose'

const Schema = mongoose.Schema

const imageSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  memoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Memory',
    default: null,
  },
  filename: {
    type: Schema.Types.String,
    default: null,
    required: true,
  },
},
{
  timestamps: true,
})

export default mongoose.model('Image', imageSchema)
