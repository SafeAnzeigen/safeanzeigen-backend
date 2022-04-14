const express = require('express');
const router = express.Router();

const controller = require('./searches-controller');

router.get('/', controller.getAllSearches);
router.get('/:search_id', controller.getSearchById);
router.get('/userid/:user_id', controller.getAllSearchesByUserId);
router.post('/', controller.addSearch);
router.delete('/:search_id', controller.deactivateSearch);

module.exports = router;
