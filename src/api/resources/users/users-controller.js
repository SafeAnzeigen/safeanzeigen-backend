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
        console.log('Fehler beim Erhalten von dieser Kategorie. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von dieser Kategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von dieser Kategorie, da Angaben fehlen.',
    });
  }
};

const getUserByEmail = (req, res) => {
  const { category_id } = req.params;

  if (category_id) {
    UsersService.findById(category_id)
      .then((category) => {
        category
          ? res.status(200).json({ category })
          : res.status(404).json({ message: 'Diese Kategorie wurde nicht gefunden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von dieser Kategorie. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von dieser Kategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von dieser Kategorie, da Angaben fehlen.',
    });
  }
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (name) {
    UsersService.add(name)
      .then((newCategory) =>
        res.status(201).json({
          category_id: newCategory.category_id,
          name: newCategory.name,
          created_at: newCategory.created_at,
          updated_at: newCategory.updated_at,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von dieser Kategorie. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von dieser Kategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von dieser Kategorie, da Angaben fehlen.',
    });
  }
};

const updateUser = (req, res) => {
  const { name } = req.body;

  if (req.body.category_id && name) {
    UsersService.update(req.body.category_id, { name })
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({ message: 'Die Kategorie wurde aktualisiert.' })
          : res.status(500).json({
              message:
                'Fehler bei der Aktualisierung der Kategorie, da Fehler in der Datenbank auftraten.',
            })
      )
      .catch((error) => {
        console.log('Fehler bei der Aktualisierung der Kategorie. ', error);
        return res.status(500).json({
          message: 'Fehler bei der Aktualisierung der Kategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler bei der Aktualisierung der Kategorie, da Angaben fehlen.',
    });
  }
};

const deactivateUser = (req, res) => {
  const { category_id } = req.params;

  if (category_id) {
    UsersService.remove(category_id)
      .then(() => res.status(200).json({ message: 'Die Kategorie wurde gelöscht.' }))
      .catch((error) => {
        console.log('Fehler beim Löschen der Kategorie. ', error);
        return res.status(500).json({
          message: 'Fehler beim Löschen der Kategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Löschen der Kategorie, da Angaben fehlen.',
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
