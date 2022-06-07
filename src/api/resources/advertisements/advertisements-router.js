const express = require('express');
const router = express.Router();

const authorizationMiddleware = require('../../middlewares/authorization');
const validationMiddleware = require('../../middlewares/validation');
const controller = require('./advertisements-controller');

router.get(
  '/clerkuserid/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.getAllAdvertisementsByClerkUserId
);
router.post(
  '/togglereservation/:advertisement_id',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.toggleReservationAdvertisement
);
router.post(
  '/delete/:advertisement_id',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.deactivateAdvertisement
);
router.get('/public/', controller.getAllPublicAdvertisements);
router.post(
  '/',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  authorizationMiddleware.validateValidationSuccessToken,
  controller.addAdvertisement
);
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
router.get('/public/:advertisement_id', controller.getPublicAdvertisementById);

router.get('/increaseviewcount/:advertisement_id', controller.increaseViewCount);

// NOT USED
/* 
router.get('/', controller.getAllAdvertisements);
router.get('/:advertisement_id', controller.getAdvertisementById);
router.get('/userid/:user_id', controller.getAllAdvertisementsByUserId);
router.get('/categoryid/:category_id', controller.getAllAdvertisementsByCategoryId);
router.put(
  '/',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.updateAdvertisement
);
 */

module.exports = router;
