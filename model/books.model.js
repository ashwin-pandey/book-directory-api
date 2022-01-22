const mongoose = require('mongoose');

const BooksModel = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  author: {
    authorId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Author"
    },
    authorName: String
  },
  affiliateLinks : [
    {
      linkName: String,
      linkUrl: String
    }
  ],
  reviewLinks: [
    {
      websiteName: String,
      websiteLink: String
    }
  ]
});

module.exports = mongoose.model('Books', BooksModel);