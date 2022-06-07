const express = require('express');
const router = express.Router();

const controller = require('./messages-controller');

/* TODO: PROTECT GET  WRITE VALIDATION WHERE CLERK_USER_ID ASKING FOR MESSAGES HAS TO BE ROOM_CREATOR OF CHATROOM (BUYER) OR HAS TO OWN THE AD_ID OF CHATROOM */

router.get('/:ad_conversation_room_id', controller.getAllMessagesByAdConversationRoomId);

// NOT USED
/* router.post('/', controller.addMessage); */

module.exports = router;
