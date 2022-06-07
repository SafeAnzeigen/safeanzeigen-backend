const express = require('express');
const router = express.Router();

const authorizationMiddleware = require('../../middlewares/authorization');
const validationMiddleware = require('../../middlewares/validation');
const controller = require('./chats-controller');

router.get(
  '/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.getAllChatsByClerkUserId
);
router.get(
  '/ownerofad/:clerk_user_id',
  authorizationMiddleware.validateAuthorization,
  validationMiddleware.clerkUserOwnsThisResource,
  controller.getAllChatsWhereAdOwnerIsClerkUserId
);
router.post('/', authorizationMiddleware.validateAuthorization, controller.addChat);
router.delete(
  '/:ad_conversation_room_id',
  authorizationMiddleware.validateAuthorization,
  controller.deleteChatByRoomId
);

module.exports = router;
