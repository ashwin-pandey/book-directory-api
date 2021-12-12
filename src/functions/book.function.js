/**
 * Book functions
 */

const { mongoose } = require('mongoose');
const { Book } = require('../models/book.model');

const { BadRequestException, NotFoundException } = require('../middleware/error.middleware');

/**LOGS */
const errorLog = require('../config/log-config').errorLogger;
const infoLog = require('../config/log-config').infoLogger;

/**
 * Get all the books in a list
 */
const getBooks = (res) => {
    Book.find({}, (error, books) => {
        if (error) {
            errorLog.error(`Error while fetch the books - ${error}`);
            res.status(400);
            res.send(BadRequestException(`Error when fetching the books`, `${error.message}`));
        } else {
            infoLog.info(`Gel all books = '${books}'`);
            res.status(200);
            res.send(books);
        }
    });
}

/**
 * Get a specific book based on id
 * @param {*} id 
 * @param {*} res 
 */
const getBookById = (id, res) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an invalid ObjectId.
        errorLog.error(`Book id '${id}' is invalid. Please check again.`);
        res.status(400);
        res.send(BadRequestException(`Book id '${id}' is invalid. Please check again.`, `Book id '${id}' is invalid. Please check again.`));
    }

    // fetch the book by id
    Book.findById({ _id: id }, (error, book) => {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            errorLog.error(`Error while fetch the book by id '${id}' - ${error}`);
            res.status(400);
            res.send(BadRequestException(`Error when fetching the book with id '${id}'`, `${error.message}`));
        } else if (book != null) {
            infoLog.info(`book = ${book}`);
            res.status(200);
            res.send(book);
        } else {
            res.status(404);
            res.send(NotFoundException(`Book with id '${id}' not found.`));
        }
    });
}

/**
 * Create a new book
 * @param { Book } payload 
 * @param {*} res 
 */
const createBook = (payload, res) => {
    Book.create(payload, (error, createdBook) => {
        if (error) {
            errorLog.error(`Error occurred while creating the book.`, `${error.message}`);
            res.send(400);
            res.send(BadRequestException(`Error occurred while creating the book.`, `${error.message}`))
        } else {
            infoLog.info(`Book created - ${createdBook}`);
            res.send(createdBook);
        }
    });
}

module.exports = {
    getBooks,
    getBookById,
    createBook
}