// book model
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    imageUrl: {
        type: String,
        default: null,
        required: false
    },
    description: {
        type: String,
        default: null,
        trim: true
    },
    status: {
        type: String,
        default: "active",
        trim: true
    },
    createdDate: {
        type: Date,
        default: () => Date.now() + 7*24*60*60*1000
    },
    modifiedDate: {
        type: Date,
        default: () => Date.now() + 7*24*60*60*1000
    }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = { Book };