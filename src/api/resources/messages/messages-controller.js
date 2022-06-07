const MessagesService = require('./messages-service');

const getAllMessagesByAdConversationRoomId = (req, res) => {
  const { ad_conversation_room_id } = req.params;

  if (ad_conversation_room_id) {
    MessagesService.findMessagesByAdConversationRoomId(ad_conversation_room_id)
      .then((messages) => {
        messages?.length
          ? res.status(200).json({ messages })
          : res.status(404).json({ message: 'Es konnten keine Nachrichten gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Nachrichten. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Nachrichten.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Nachrichten, da Angaben fehlen.',
    });
  }
};

// NOT USED
/* 
const addMessage = (req, res) => {
  const messagesDTO = ({
    ad_conversation_room_id,
    from_clerk_user_id,
    text,
    message_sent_timestamp,
  } = req.body);

  if (
    ad_conversation_room_id &&
    from_clerk_user_id &&
    text?.length &&
    text?.length <= 1500 &&
    message_sent_timestamp
  ) {
    MessagesService.add(messagesDTO)
      .then((newMessage) =>
        res.status(201).json({
          message_id: newMessage.message_id,
          ad_conversation_room_id: newMessage.ad_conversation_room_id,
          from_clerk_user_id: newMessage.from_clerk_user_id,
          message_sent_timestamp: newMessage.message_sent_timestamp,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von dieser Nachricht. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von dieser Nachricht.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von dieser Nachricht, da Angaben fehlen.',
    });
  }
}; */

module.exports = {
  getAllMessagesByAdConversationRoomId,
  // NOT USED
  /* addMessage, */
};
