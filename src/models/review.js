const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
  target: {
    type: {
      type: String,
      enum: ['Product', 'Seller'],
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = model('Review', reviewSchema)
