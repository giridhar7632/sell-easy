const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    profileImage: { type: String },
    address: {
      hostel: { type: String },
      room: { type: String },
      branch: { type: String },
    },
    role: { type: String, default: 'user' },
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
