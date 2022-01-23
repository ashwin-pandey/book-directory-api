const express = require('express');
const router = express.Router();
const authorController = require('../controller/author.controller');

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getSpecificAuthor);
router.post('/', authorController.createAuthor);
// router.put('/:id', authorController.updateAuthor);
// router.patch('/:id', authorController.patchAuthor);

const AuthorRouter = router;
module.exports = { AuthorRouter };
