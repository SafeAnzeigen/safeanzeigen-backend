const express = require('express');
const router = express.Router();

const controller = require('./chats-controller');

router.get('/:clerk_user_id', controller.getAllChatsByClerkUserId);
router.get('/ownerofad/:clerk_user_id', controller.getAllChatsWhereAdOwnerIsClerkUserId);
router.post('/', controller.addChat);
router.delete('/:ad_conversation_room_id', controller.deleteChatByRoomId);

module.exports = router;
