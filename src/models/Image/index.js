import { model, Schema } from 'mongoose'

const ImageSchema = new Schema({
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

export default model('Image', ImageSchema)
