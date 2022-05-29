const express = require('express');
const router = express.Router();

const controller = require('./subcategories-controller');

router.get('/', controller.getAllSubcategories);
router.get('/:subcategory_id', controller.getSubcategoryById);
router.get('/categoryid/:category_id', controller.getAllSubcategoriesByCategoryId);
router.get('/categoryname/:category_name', controller.getAllSubcategoriesByCategoryName);
router.post('/', controller.addSubcategory);
router.put('/', controller.updateSubcategory);
router.delete('/:subcategory_id', controller.deleteSubcategoryById);

module.exports = router;
