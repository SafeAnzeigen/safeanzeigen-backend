const express = require('express');
const router = express.Router();

const authorizationMiddleware = require('../../middlewares/authorization');
const controller = require('./messages-controller');

router.get(
  '/:ad_conversation_room_id',
  authorizationMiddleware.validateAuthorization,
  controller.getAllMessagesByAdConversationRoomId
);

// NOT USED
/* router.post('/', controller.addMessage); */

module.exports = router;
