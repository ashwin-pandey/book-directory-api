const express = require('express');
const router = express.Router();
const booksController = require('../controller/books.controller');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSpecificBook);

const BooksRouter = router;
module.exports = { BooksRouter };
