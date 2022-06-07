const express = require('express');
const router = express.Router();

const authorizationMiddleware = require('../../middlewares/authorization');
const controller = require('./favorites-controller');

router.get('/', controller.getAllFavorites);
router.get('/:favorite_id', controller.getFavoriteById);
router.get('/advertisementid/:advertisement_id', controller.getAllFavoritesByAdvertisementId);
router.get('/userid/:user_id', controller.getAllFavoritesByUserId);
router.get(
  '/clerkuserid/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  controller.getAllFavoritesByClerkUserId
);
router.post('/', authorizationMiddleware.validateAuthorization, controller.addFavorite);
router.delete(
  '/:advertisement_id',
  authorizationMiddleware.validateAuthorization,
  controller.deleteFavoriteByAdvertisementIdForUser
);

module.exports = router;
