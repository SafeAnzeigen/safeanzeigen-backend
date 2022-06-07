const express = require('express');
const router = express.Router();

const controller = require('./subcategories-controller');

router.get('/categoryname/:category_name', controller.getAllSubcategoriesByCategoryName);

//Not Used
/* router.get('/', controller.getAllSubcategories);
router.get('/:subcategory_id', controller.getSubcategoryById);
router.get('/categoryid/:category_id', controller.getAllSubcategoriesByCategoryId);
router.post('/', controller.addSubcategory);
router.put('/', controller.updateSubcategory);
router.delete('/:subcategory_id', controller.deleteSubcategoryById); */

module.exports = router;
