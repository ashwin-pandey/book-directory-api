/**
 * Book functions
 */
const { Book } = require('../models/book.model');

const { BadRequestException, NotFoundException } = require('../middleware/error.middleware');

/**LOGS */
const errorLog = require('../config/log-config').errorLogger;
const infoLog = require('../config/log-config').infoLogger;

/**
 * Get all the books in a list
 */
const getBooks = (req, res) => {
    // filters
    const filters = {};
    req.query.title ? filters.title = req.query.title : filters;
    req.query.author ? filters.author = req.query.author : filters;
    req.query.status ? filters.status = req.query.status : filters.status = "active";
    
    // fetch books
    Book.find(filters, (error, books) => {
        if (error) {
            errorLog.error(`Error while fetch the books - ${error}`);
            res.status(400);
            res.send(BadRequestException(`Error when fetching the books`, `${error.message}`));
        } else {
            // return books
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
    // validate the id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an invalid ObjectId.
        errorLog.error(`Book id '${id}' is invalid. Please check again.`);
        res.status(400);
        res.send(BadRequestException(`Book id '${id}' is invalid. Please check again.`, `Book id '${id}' is invalid. Please check again.`));
    }

    // fetch the book by id
    Book.findOne({ "_id": id, "status": "active" }, (error, book) => {
        if (error) {
            errorLog.error(`Error while fetch the book by id '${id}' - ${error}`);
            res.status(400);
            res.send(BadRequestException(`Error when fetching the book with id '${id}'`, `${error.message}`));
        } else if (book != null) {
            // return the book if found
            infoLog.info(`book = ${book}`);
            res.status(200);
            res.send(book);
        } else {
            // return error if book not found
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
    // create book
    Book.create(payload, (error, createdBook) => {
        if (error) {
            errorLog.error(`Error occurred while creating the book.`, `${error.message}`);
            res.send(400);
            res.send(BadRequestException(`Error occurred while creating the book.`, `${error.message}`));
        } else {
            // return the created book
            infoLog.info(`Book created - ${createdBook}`);
            res.status(201);
            res.send(createdBook);
        }
    });
}

/**
 * Update (replace) an existing book.
 * @param {Book} payload 
 * @param {*} id 
 * @param {*} res 
 */
const updateBook = (payload, id, res) => {
    // validate the id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an invalid ObjectId.
        errorLog.error(`Book id '${id}' is invalid. Please check again.`);
        res.status(400);
        res.send(BadRequestException(`Book id '${id}' is invalid. Please check again.`, `Book id '${id}' is invalid. Please check again.`));
    }

    // fetch and update the book
    Book.updateOne({ "_id": id, "status": "active" }, payload, (error, updatedBook) => {
        if (error) {
            errorLog.error(`Error occurred while updating the book.`, `${error.message}`);
            res.status(400);
            res.send(BadRequestException(`Error occurred while updating the book.`, `${error.message}`));
        } else if (updatedBook.modifiedCount) {
            // send message if book is updated
            infoLog.info(`Book updated successfully - id = ${id}`);
            res.status(200);
            res.send({"message": "Updated Successfully"});
        } else {
            // send error if book not found
            res.status(404);
            res.send(NotFoundException(`Book with id '${id}' not found.`));
        }
    });
}

/** 
 * Delete a specific book (soft delete)
 * @param {*} id 
 * @param {*} res 
 */
const deleteBook = (id, res) => {
    // validate the id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an invalid ObjectId.
        errorLog.error(`Book id '${id}' is invalid. Please check again.`);
        res.status(400);
        res.send(BadRequestException(`Book id '${id}' is invalid. Please check again.`, `Book id '${id}' is invalid. Please check again.`));
    }
    // fetch and delete(soft delete) the existing book
    Book.updateOne({ "_id": id, "status": "active" }, {$set: { "status": "deleted" }}, (error, deletedBook) => {
        if (error) {
            errorLog.error(`Error occurred while deleting the book.`, `${error.message}`);
            res.status(400);
            res.send(BadRequestException(`Error occurred while deleting the book.`, `${error.message}`));
        } else if (deletedBook.modifiedCount) {
            // send confirmation if the book is deleted
            infoLog.info(`Book deleted successfully - id = ${id}`);
            res.status(204);
            res.send({ "message": "Book deleted Successfully!" });
        } else {
            // send error if the book was not found
            res.status(404);
            res.send(NotFoundException(`Book with id '${id}' not found or already deleted.`));
        }
    });
}

/**
 * Patch a book.
 * @param {*} req 
 * @param {*} res 
 */
const patchBook = (req, res) => {
    const id = req.params.id;
    // validate the id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an invalid ObjectId.
        errorLog.error(`Book id '${id}' is invalid. Please check again.`);
        res.status(400);
        res.send(BadRequestException(`Book id '${id}' is invalid. Please check again.`, `Book id '${id}' is invalid. Please check again.`));
    }

    // validate status parameter (need to use enum for this)
    if (req.body.status != null && req.body.status != "active") {
        res.status(400);
        res.send(BadRequestException(`Book cannot be deleted using patch request.`, `Book cannot be deleted using patch request.`));
    }

    // fetch and patch the book
    Book.updateOne({ "_id": id }, { $set: req.body }, (error, updatedBook) => {
        if (error) {
            errorLog.error(`Error occurred while updating the book.`, `${error.message}`);
            res.status(400);
            res.send(BadRequestException(`Error occurred while updating the book.`, `${error.message}`));
        } else if (updatedBook.modifiedCount) {
            infoLog.info(`Book updated successfully - id = ${id}`);
            res.status(200);
            res.send({"message": "Updated Successfully"});
        } else {
            res.status(404);
            res.send(NotFoundException(`Book with id '${id}' not found.`));
        }
    });
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    patchBook
}