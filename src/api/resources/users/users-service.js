const nodemailer = require('nodemailer');
const format = require('date-fns/format');
const isBefore = require('date-fns/isBefore');
const fromUnixTime = require('date-fns/fromUnixTime');

const db = require('../../../database/db');
const ChatService = require('../chats/chats-service');

const safeanzeigenTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});
const safeanzeigenSender = '"Safeanzeigen" <hallo@safeanzeigen.de>';

const find = () => db('users');

const findById = (user_id) =>
  db('users')
    .where({ user_id })
    .first()
    .then((user) => (user ? user : null));

const getUserByClerkId = (clerk_user_id) =>
  db('users')
    .where({ clerk_user_id })
    .first()
    .then((user) => (user ? user : null));

const findByEmail = (email) =>
  db('users')
    .where({ email })
    .first()
    .then((user) => (user ? user : null));

const add = (user) =>
  db('users')
    .insert(user, 'user_id')
    .then(([user_id]) => findById(user_id));

const update = (clerk_user_id, changes) => db('users').where({ clerk_user_id }).update(changes);

const deactivate = (user_id, deactivation) => db('users').where({ user_id }).update(deactivation);

const sendMailContactRequest = async (emailContactDTO) =>
  new Promise((resolve, reject) => {
    safeanzeigenTransporter
      .sendMail({
        from: safeanzeigenSender,
        to:
          emailContactDTO.firstname +
          ' ' +
          emailContactDTO.lastname +
          ' <' +
          emailContactDTO.email +
          '>',
        bcc: safeanzeigenSender,
        subject:
          'Wir haben Ihre Safeanzeigen Kontaktanfrage vom ' +
          format(new Date(Date.now()), 'dd.MM.yyyy') +
          'erhalten.',
        text: 'Ihre Nachricht: ' + emailContactDTO.message,
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });

const getUserHasChatNotification = (clerk_user_id) =>
  new Promise((resolve, reject) => {
    getUserByClerkId(clerk_user_id).then((foundUser) => {
      if (foundUser) {
        if (foundUser.user_visited_chat_timestamp) {
          let tempUserChatsArray = [];
          let userLastCheckedChatTimestamp = foundUser.user_visited_chat_timestamp;

          ChatService.findChatsByClerkUserOwnsAd(clerk_user_id).then((chats) => {
            console.log('NOTIFICATION CHATS OWNED BY USER', chats);
            if (chats?.length) {
              tempUserChatsArray = tempUserChatsArray.concat(chats);
            }
            ChatService.findChatsByClerkUserId(clerk_user_id)
              .then((chats) => {
                console.log('NOTIFICATION CHATS BUY AS USER', chats);
                if (chats?.length) {
                  tempUserChatsArray = tempUserChatsArray.concat(chats);
                }

                if (tempUserChatsArray.length) {
                  console.log('I HAVE FOUND CONVERSATIONS', tempUserChatsArray);

                  let tempRelevantAdConversationRoomIdArray = tempUserChatsArray.map(
                    (element) => element?.ad_conversation_room_id
                  );

                  console.log(
                    'I HAVE FOUND tempRelevantAdConversationRoomIdArray',
                    tempRelevantAdConversationRoomIdArray
                  );

                  db('messages')
                    .whereIn('ad_conversation_room_id', tempRelevantAdConversationRoomIdArray)
                    .then((messages) => {
                      if (messages.length) {
                        console.log('I HAVE FOUND MESSAGES', messages);
                        console.log(
                          'I HAVE userLastCheckedChatTimestamp',
                          userLastCheckedChatTimestamp
                        );
                        resolve(
                          messages.filter((messageElement) =>
                            isBefore(
                              fromUnixTime(userLastCheckedChatTimestamp.toString()),
                              fromUnixTime(messageElement.message_sent_timestamp.toString())
                            )
                          )
                        );
                      } else {
                        resolve(null);
                      }
                    })
                    .catch((error) => {
                      console.log('ERROR NOTIFICATION FETCHING MESSAGES', error);
                      reject(error);
                    });
                } else {
                  console.log('USER HAS NOT CHATS');
                  resolve(null);
                }
              })
              .catch((error) => {
                console.log('ERROR NOTIFICATION CHATS BUY AS USER', error);
                reject(error);
              })
              .catch((error) => {
                console.log('ERROR NOTIFICATION CHATS OWNED BY USER', error);
                reject(error);
              });
          });
        } else {
          console.log('USER HAS NO TIMESTAMP FOR CHAT NOTIFICATION');
          resolve(null);
        }
      } else {
        console.log('USER NOT FOUND FOR CHAT NOTIFICATION');
        resolve(null);
      }
    });
  });

// GET ALL CHATROOM WHERE CLERK_USER_ID IS OWNER
// GET ALL CHATROOM WHERE CLERK_USER_ID IS BUYER
// GET ALL MESSAGES THAT ARE IN THESE CHATROOMS
// CHECK IF ANY MESSAGE IS YOUNGER THAN LAST VISITED CHAT TIMESTAMP
//RETURN TRUE
//ELSE
//RETURN FALSE

module.exports = {
  find,
  findById,
  getUserByClerkId,
  findByEmail,
  add,
  update,
  deactivate,
  sendMailContactRequest,
  getUserHasChatNotification,
};
