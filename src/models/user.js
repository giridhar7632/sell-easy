const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false  },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    refreshToken: { type: String, select: false },
    profileImage: { type: String },
    address: {
      hostel: { type: String },
      room: { type: String },
      branch: { type: String },
    },
    popularity: {
      type: Number,
      default: 0,
    },
    role: { type: String, default: 'user' },
    rating: {
      type: Number,
      default: 0,
    },
    socials: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Wishlist' }],
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
)

// hook to update popularity
// userSchema.pre(/^find/, function (next) {
//   this.updateOne({}, { $inc: { popularity: 1 } }).exec()
//   next()
// })

module.exports = model('User', userSchema)
