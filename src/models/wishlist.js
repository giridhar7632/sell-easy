const { Schema, model } = require('mongoose')

const wishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
})

module.exports = model('Wishlist', wishlistSchema)
