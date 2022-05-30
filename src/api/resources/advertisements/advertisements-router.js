const express = require('express');
const router = express.Router();

const authorizationMiddleware = require('../../middlewares/authorization');
const validationMiddleware = require('../../middlewares/validation');
const controller = require('./advertisements-controller');

router.get('/', controller.getAllAdvertisements);
router.get('/:advertisement_id', controller.getAdvertisementById);
router.get('/userid/:user_id', controller.getAllAdvertisementsByUserId);
router.get('/categoryid/:category_id', controller.getAllAdvertisementsByCategoryId);
router.post(
  '/',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  authorizationMiddleware.validateValidationSuccessToken,
  controller.addAdvertisement
);
router.put('/', controller.updateAdvertisement);
router.delete('/:advertisement_id', controller.deactivateAdvertisement);

router.get(
  '/verificationimage/generate/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.generateVerificationImage
);

router.post(
  '/verificationimage/validate/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.validateVerificationImage
);

module.exports = router;
