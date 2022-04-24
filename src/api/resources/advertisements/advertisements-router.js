const express = require('express');
const router = express.Router();

const controller = require('./advertisements-controller');

router.get('/', controller.getAllAdvertisements);
router.get(':advertisement_id', controller.getAdvertisementById);
router.get('/userid/:user_id', controller.getAllAdvertisementsByUserId);
router.get('/categoryid/:category_id', controller.getAllAdvertisementsByCategoryId);
router.post('/', controller.addAdvertisement);
router.put('/', controller.updateAdvertisement);
router.delete('/:advertisement_id', controller.deactivateAdvertisement);

/* Generate verification image */
/* validate verification image */

module.exports = router;
