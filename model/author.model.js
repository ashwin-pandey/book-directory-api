const mongoose = require('mongoose');

const AuthorModel = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  status: String
});

module.exports = mongoose.model('Author', AuthorModel);