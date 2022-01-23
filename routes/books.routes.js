const express = require('express');
const router = express.Router();
const booksController = require('../controller/books.controller');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSpecificBook);
router.post('/', booksController.createBook);
// router.put('/:id', booksController.patchBook);
router.patch('/:id', booksController.patchBook);
router.delete('/:id', booksController.deleteBook);


const BooksRouter = router;
module.exports = { BooksRouter };
