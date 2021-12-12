/**
 * Book Controller
 */
const express = require('express');
const router = express.Router();

const { Book } = require('../models/book.model');

const { BadRequestException, NotFoundException } = require('../middleware/error.middleware');

/**LOGS */
const errorLog = require('../config/log-config').errorLogger;
const infoLog = require('../config/log-config').infoLogger;

/** FUNCTION */
const bookFunctions = require('../functions/book.function');

/**
 * GET /books
 * Purpose - Get all the books 
 */
router.get('/books', (req, res) => {
    return bookFunctions.getBooks(res);
});

/**
 * GET /books/:id
 * Purpose - Get a particular book by id
 */
router.get('/books/:id', (req, res) => {
    return bookFunctions.getBookById(req.params.id, res);
});

/**
 * POST /books
 * Purpose - Create a new book
 */
router.post('/books', (req, res) => {
    const payload = new Book({
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    });
    return bookFunctions.createBook(payload, res);
});

const BookRoutes = router;
module.exports = { BookRoutes };