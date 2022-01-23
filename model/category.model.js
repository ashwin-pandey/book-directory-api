const mongoose = require('mongoose');

const CategoryModel = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: String
});

module.exports = mongoose.model('Category', CategoryModel);