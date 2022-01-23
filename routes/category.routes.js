const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getSpecificCategory);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
// router.patch('/:id', categoryController.patchAuthor);

const CategoryRouter = router;
module.exports = { CategoryRouter };
