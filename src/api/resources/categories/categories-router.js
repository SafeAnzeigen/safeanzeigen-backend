const express = require('express');
const router = express.Router();

const controller = require('./categories-controller');

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', controller.addCategory);
router.put('/', controller.updateCategory);
router.delete('/:id', controller.deleteCategoryById);

module.exports = router;
