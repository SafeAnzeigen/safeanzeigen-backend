const db = require('../../../database/db');

const findById = (message_id) =>
  db('messages')
    .where({ message_id })
    .first()
    .then((message) => (message ? message : null));

const findMessagesByAdConversationRoomId = (ad_conversation_room_id) =>
  db('messages')
    .where({ ad_conversation_room_id })
    .then((messages) => (messages.length ? messages : null));

const add = (messageDTO) =>
  db('messages')
    .insert(messageDTO, 'message_id')
    .then(([message_id]) => findById(message_id));

module.exports = {
  findMessagesByAdConversationRoomId,
  add,
};
