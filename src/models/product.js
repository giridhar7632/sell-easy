const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    media: [
      {
        type: String,
      },
    ],
    popularity: {
      type: Number,
      default: 0,
    },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true }
)

// hook to update popularity
productSchema.pre('find', function (next) {
  this.model.updateMany(this.getFilter(), { $inc: { popularity: 1 } }).exec()
  next()
})

module.exports = model('Product', productSchema)
