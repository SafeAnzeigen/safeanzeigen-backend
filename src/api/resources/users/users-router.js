const express = require('express');
const router = express.Router();

const authorizationMiddleware = require('../../middlewares/authorization');
const validationMiddleware = require('../../middlewares/validation');
const controller = require('./users-controller');

router.get(
  '/clerkid/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.getUserByClerkId
);
router.post(
  '/',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.addUser
);
router.put(
  '/',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.updateUser
);
router.post('/emailkontakt', controller.contactViaEmail);
router.get(
  '/visitedchat/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  controller.setUserVisitedChat
);
router.get(
  '/checknotifications/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  controller.getUserHasChatNotification
);

// NOT USED
/* router.get('/', controller.getAllUsers);
router.get('/userid/:user_id', controller.getUserById);
router.get('/email/:email', controller.getUserByEmail);
router.delete('/:user_id', controller.deactivateUser); */

module.exports = router;
