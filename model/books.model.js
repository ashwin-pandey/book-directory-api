const mongoose = require('mongoose');
const statusEnum = require('./status.enum');

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
  category: {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    categoryName: String
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
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  modifiedAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String
  }
});

module.exports = mongoose.model('Books', BooksModel);