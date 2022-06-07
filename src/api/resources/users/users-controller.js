var getUnixTime = require('date-fns/getUnixTime');

const UsersService = require('./users-service');

const getAllUsers = (req, res) =>
  UsersService.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => {
      console.log('Fehler beim Erhalten von aller Nutzer. ', error);
      return res.status(500).json({
        message: 'Fehler beim Erhalten von aller Nutzer.',
      });
    });

const getUserByClerkId = (req, res) => {
  const { clerk_user_id } = req.params;

  if (clerk_user_id) {
    UsersService.getUserByClerkId(clerk_user_id)
      .then((user) => {
        user
          ? res.status(200).json({ user })
          : res.status(404).json({ message: 'Dieser Nutzer wurde nicht gefunden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von diesem Nutzer. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von diesem Nutzer.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von diesem Nutzer, da Angaben fehlen.',
    });
  }
};

const addUser = (req, res) => {
  const userDTO = ({
    clerk_user_id,
    firstname,
    lastname,
    phone_number,
    phone_verified,
    email,
    email_verified,
  } = req.body);

  if (
    clerk_user_id &&
    firstname &&
    lastname &&
    phone_number &&
    phone_verified &&
    email &&
    email_verified
  ) {
    userDTO.role = 'user';
    userDTO.gender = 'unbekannt';
    userDTO.user_photo = `https://source.boringavatars.com/beam/300/${clerk_user_id}${clerk_user_id}${clerk_user_id}?colors=2f70e9,e76f51,ffc638,f4a261,e97c2f`;

    UsersService.add(userDTO)
      .then((newUser) =>
        res.status(201).json({
          user_id: newUser.user_id,
          clerk_user_id: newUser.clerk_user_id,
          is_active: newUser.is_active,
          email: newUser.email,
          phone_number: newUser.phone_number,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          gender: newUser.gender,
          role: newUser.role,
          user_photo: newUser.user_photo,
          phone_verified: newUser.phone_verified,
          email_verified: newUser.email_verified,
          kyc_verified: newUser.kyc_verified,
          role: newUser.role,
          created_at: newUser.created_at,
          updated_at: newUser.updated_at,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von diesem Nutzer. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von diesem Nutzer.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von diesem Nutzer, da Angaben fehlen.',
    });
  }
};

const updateUser = (req, res) => {
  const updateUserDTO = ({
    firstname,
    lastname,
    phone_number,
    phone_verified,
    email,
    email_verified,
    gender,
    kyc_verified,
  } = req.body);

  if (
    req.body.clerk_user_id &&
    (firstname ||
      lastname ||
      phone_number ||
      phone_verified ||
      email ||
      email_verified ||
      gender ||
      kyc_verified)
  ) {
    UsersService.update(req.body.clerk_user_id, updateUserDTO)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({ message: 'Der Nutzer wurde aktualisiert.' })
          : res.status(500).json({
              message:
                'Fehler bei der Aktualisierung des Nutzers, da Fehler in der Datenbank auftraten.',
            })
      )
      .catch((error) => {
        console.log('Fehler bei der Aktualisierung des Nutzers. ', error);
        return res.status(500).json({
          message: 'Fehler bei der Aktualisierung des Nutzers.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler bei der Aktualisierung des Nutzers, da Angaben fehlen.',
    });
  }
};

const contactViaEmail = (req, res) => {
  const emailContactDTO = ({ firstname, lastname, email, phone, subject, message } = req.body);
  if (firstname && lastname && email && phone && subject && message) {
    UsersService.sendMailContactRequest(emailContactDTO)
      .then(() =>
        res.status(200).json({
          message: 'Kontaktanfrage wurde versandt.',
        })
      )
      .catch((error) => {
        console.log('Fehler beim Senden der Kontaktanfrage. ', error);
        return res.status(500).json({
          message: 'Fehler bei Kontaktanfrage.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Kontaktanfrage konnte nicht versandt werden, da Angaben fehlen.',
    });
  }
};

const setUserVisitedChat = (req, res) => {
  const { clerk_user_id } = req.params;
  let user_visited_chat_timestamp = getUnixTime(new Date());

  if (clerk_user_id && user_visited_chat_timestamp) {
    UsersService.update(clerk_user_id, { user_visited_chat_timestamp })
      .then(() =>
        res.status(200).json({
          message: 'Zeitstempel hinzugefügt.',
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen des Zeitstempels. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen des Zeitstempels.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen des Zeitstempels, da Angaben fehlen.',
    });
  }
};

const getUserHasChatNotification = (req, res) => {
  const { clerk_user_id } = req.params;

  if (clerk_user_id) {
    UsersService.getUserHasChatNotification(clerk_user_id)
      .then((foundMessagesBeforeVisit) => {
        console.log('foundMessagesBeforeVisit', foundMessagesBeforeVisit);
        if (foundMessagesBeforeVisit?.length) {
          res.status(200).json({ message: 'Es gibt neue Chatnachrichten.' });
        } else {
          res.status(404).json({ message: 'Es gibt keine neuen Chatnachrichten.' });
        }
      })
      .catch((error) => {
        console.log('Fehler beim Prüfen nach neuen Chatnachrichten. ', error);
        return res.status(500).json({
          message: 'Fehler beim Prüfen nach neuen Chatnachrichten.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Prüfen nach neuen Chatnachrichten, da Angaben fehlen.',
    });
  }
};

// NOT USED
/* const getUserById = (req, res) => {
  const { user_id } = req.params;

  if (user_id) {
    UsersService.findById(user_id)
      .then((user) => {
        user
          ? res.status(200).json({ user })
          : res.status(404).json({ message: 'Dieser Nutzer wurde nicht gefunden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von diesem Nutzer. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von diesem Nutzer.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von diesem Nutzer, da Angaben fehlen.',
    });
  }
};

const getUserByEmail = (req, res) => {
  const { email } = req.params;

  if (email) {
    UsersService.findByEmail(email)
      .then((user) => {
        user
          ? res.status(200).json({ user })
          : res.status(404).json({ message: 'Dieser Nutzer wurde nicht gefunden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von diesem Nutzer. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von diesem Nutzer.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von diesem Nutzer, da Angaben fehlen.',
    });
  }
};

const deactivateUser = (req, res) => {
  const { user_id } = req.params;

  if (user_id) {
    UsersService.deactivate(user_id, { is_active: false })
      .then(() => res.status(200).json({ message: 'Der Nutzer wurde deaktiviert.' }))
      .catch((error) => {
        console.log('Fehler beim Deaktivieren des Nutzers. ', error);
        return res.status(500).json({
          message: 'Fehler beim Deaktivieren des Nutzers.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Deaktivieren des Nutzers, da Angaben fehlen.',
    });
  }
}; */

module.exports = {
  getAllUsers,
  getUserByClerkId,
  addUser,
  updateUser,
  contactViaEmail,
  setUserVisitedChat,
  getUserHasChatNotification,

  // NOT USED
  /*  getUserById,
  getUserByEmail,
  deactivateUser, */
};
