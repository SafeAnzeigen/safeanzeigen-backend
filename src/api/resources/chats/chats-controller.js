const ChatsService = require('./chats-service');

const getAllChatsByClerkUserId = (req, res) => {
  const { clerk_user_id } = req.params;

  if (clerk_user_id) {
    ChatsService.findChatsByClerkUserId(clerk_user_id)
      .then((chats) => {
        chats?.length
          ? res.status(200).json({ chats })
          : res.status(404).json({ message: 'Es konnten keine Chats gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Chats. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Chats.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Chats, da Angaben fehlen.',
    });
  }
};

const getAllChatsWhereAdOwnerIsClerkUserId = (req, res) => {
  const { clerk_user_id } = req.params;

  if (clerk_user_id) {
    ChatsService.findChatsByClerkUserOwnsAd(clerk_user_id)
      .then((chats) => {
        chats?.length
          ? res.status(200).json({ chats })
          : res.status(404).json({ message: 'Es konnten keine Chats gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Chats. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Chats.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Chats, da Angaben fehlen.',
    });
  }
};

const addChat = (req, res) => {
  const chatDTO = ({
    ad_conversation_room_id,
    ad_id,
    ad_title,
    ad_price_type,
    ad_price,
    room_creator_clerk_user_id,
    created_at_timestamp,
  } = req.body);

  console.log('REQ.BODY: ', req.body);

  if (
    ad_conversation_room_id &&
    ad_id &&
    ad_title &&
    ad_price &&
    ad_price_type &&
    room_creator_clerk_user_id &&
    created_at_timestamp
  ) {
    ChatsService.add(chatDTO)
      .then((newChat) =>
        res.status(201).json({
          chat_id: newChat.chat_id,
          ad_conversation_room_id: newChat.ad_conversation_room_id,
          ad_id: newChat.ad_id,
          ad_title: newChat.ad_title,
          ad_price_type: newChat.ad_price_type,
          ad_price: newChat.ad_price,
          room_creator_clerk_user_id: newChat.room_creator_clerk_user_id,
          created_at_timestamp: newChat.created_at_timestamp,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von dieses Chats. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von dieses Chats.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von dieses Chats, da Angaben fehlen.',
    });
  }
};

const deleteChatByRoomId = (req, res) => {
  const { ad_conversation_room_id } = req.params;

  if (ad_conversation_room_id) {
    ChatsService.remove(ad_conversation_room_id)
      .then(() => res.status(200).json({ message: 'Dieser Chat wurde gelöscht.' }))
      .catch((error) => {
        console.log('Fehler beim Löschen des Chats. ', error);
        return res.status(500).json({
          message: 'Fehler beim Löschen des Chats.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Löschen des Chats, da Angaben fehlen.',
    });
  }
};

module.exports = {
  getAllChatsByClerkUserId,
  getAllChatsWhereAdOwnerIsClerkUserId,
  addChat,
  deleteChatByRoomId,
};
