import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  hostel: {
    type: String,
  },
  roomNumber: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false
  },
  refreshtoken: String,
  // products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  // orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  // reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
  timestamps: true
})

export User = model('User', userSchema)