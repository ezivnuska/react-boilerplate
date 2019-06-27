import { model, Schema } from 'mongoose'

const BondSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responder: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  declined: {
    type: Boolean,
    default: false,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  actionerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},
{
  timestamps: true
})

export default model('Bond', BondSchema)
