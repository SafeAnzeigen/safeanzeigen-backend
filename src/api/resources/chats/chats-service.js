const db = require('../../../database/db');

const findByRoomId = (ad_conversation_room_id) =>
  db('chats')
    .where({ ad_conversation_room_id })
    .first()
    .then((chat) => (chat ? chat : null));

const findChatsByClerkUserOwnsAd = (clerk_user_id) =>
  new Promise((resolve, reject) => {
    db('users')
      .where({ clerk_user_id })
      .first()
      .then((user) => {
        console.log('USER FOUND', user);
        let fk_user_id = user.user_id;

        db('advertisements')
          .where({ fk_user_id })
          .then((advertisements) => {
            if (advertisements.length) {
              console.log('ADVERTISEMENTS FOUND', advertisements);
              let ownedAdIdArray = [];
              advertisements.forEach((advertisement) => {
                ownedAdIdArray.push(advertisement.advertisement_id);
              });

              db('chats')
                .whereIn('ad_id', ownedAdIdArray)
                .then((chats) => {
                  if (chats.length) {
                    console.log('CHATS FOUND', chats);
                    resolve(chats);
                  } else {
                    resolve(null);
                  }
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              resolve(null);
            }
          });
      })
      .catch((error) => {
        console.log('ERROR FIND OWNED CHATS BY CLERKUSERID', error);
        reject(error);
      });
  });

const findChatsByClerkUserId = (room_creator_clerk_user_id) =>
  db('chats')
    .where({ room_creator_clerk_user_id })
    .then((chats) => (chats.length ? chats : null));

const add = (chatDTO) =>
  db('chats')
    .insert(chatDTO, 'ad_conversation_room_id')
    .then(([ad_conversation_room_id]) => findByRoomId(ad_conversation_room_id));

const remove = (ad_conversation_room_id) =>
  db('chats')
    .where('ad_conversation_room_id', ad_conversation_room_id)
    .del()
    .then(() => db('messages').where('ad_conversation_room_id', ad_conversation_room_id).del());

module.exports = {
  findChatsByClerkUserId,
  findChatsByClerkUserOwnsAd,
  add,
  remove,
};
