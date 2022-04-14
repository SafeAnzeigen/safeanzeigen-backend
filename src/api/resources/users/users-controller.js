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

const getUserById = (req, res) => {
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

const addUser = (req, res) => {
  const userDTO = ({ email, phone_number, firstname, lastname, gender, role } = req.body);

  if (email && phone_number && firstname && lastname && gender && role) {
    UsersService.add(userDTO)
      .then((newUser) =>
        res.status(201).json({
          user_id: newUser.user_id,
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
    email,
    phone_number,
    firstname,
    lastname,
    gender,
    role,
    user_photo,
    phone_verified,
    email_verified,
    kyc_verified,
  } = req.body);

  if (
    req.body.user_id &&
    (email ||
      phone_number ||
      firstname ||
      lastname ||
      gender ||
      role ||
      user_photo ||
      phone_verified ||
      email_verified ||
      kyc_verified)
  ) {
    UsersService.update(req.body.user_id, updateUserDTO)
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
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deactivateUser,
};
