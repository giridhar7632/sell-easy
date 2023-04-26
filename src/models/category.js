const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = model('Category', categorySchema);
