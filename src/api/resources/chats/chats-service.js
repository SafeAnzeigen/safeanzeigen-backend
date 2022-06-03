const db = require('../../../database/db');

const findByRoomId = (ad_conversation_room_id) =>
  db('chats')
    .where({ ad_conversation_room_id })
    .first()
    .then((chat) => (chat ? chat : null));

const findChatsByClerkUserId = (room_creator_clerk_user_id) =>
  db('chats')
    .where({ room_creator_clerk_user_id })
    .then((chats) => (chats.length > 0 ? chats : null));

const add = (chatDTO) =>
  db('chats')
    .insert(chatDTO, 'ad_conversation_room_id')
    .then(([ad_conversation_room_id]) => findByRoomId(ad_conversation_room_id));

const remove = (ad_conversation_room_id) =>
  db('chats').where('ad_conversation_room_id', ad_conversation_room_id).del();

module.exports = {
  findChatsByClerkUserId,
  add,
  remove,
};
