const express = require('express');
const router = express.Router();

const controller = require('./contact-infos-controller');

router.get('/', controller.getAllContactInfos);
router.get('/:id', controller.getContactInfoById);
router.get('/userid/:user_id', controller.getAllContactInfosByUserId);
router.post('/', controller.addContactInfo);
router.put('/', controller.updateContactInfo);
router.delete('/:id', controller.deactivateContactInfo);

module.exports = router;
