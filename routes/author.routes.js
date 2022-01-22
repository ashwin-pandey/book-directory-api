const express = require('express');
const router = express.Router();
const authorController = require('../controller/author.controller');

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getSpecificAuthor);
router.post('/', authorController.createAuthor);

const AuthorRouter = router;
module.exports = { AuthorRouter };
