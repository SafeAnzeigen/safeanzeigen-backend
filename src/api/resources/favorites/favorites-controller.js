const FavoritesService = require('./favorites-service');

const getAllFavorites = (req, res) =>
  FavoritesService.find()
    .then((favorites) => res.status(200).json({ favorites }))
    .catch((error) => {
      console.log('Fehler beim Erhalten von allen Favoriten. ', error);
      return res.status(500).json({
        message: 'Fehler beim Erhalten von allen Favoriten.',
      });
    });

const getFavoriteById = (req, res) => {
  const { favorite_id } = req.params;

  if (favorite_id) {
    FavoritesService.findById(favorite_id)
      .then((favorite) => {
        favorite
          ? res.status(200).json({ favorite })
          : res.status(404).json({ message: 'Dieser Favorit wurde nicht gefunden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von diesem Favorit. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von diesem Favorit.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von diesem Favorit, da Angaben fehlen.',
    });
  }
};

/* const getAllFavoritesByUserEmail = async (req, res) => {
  const { user_email } = req.params;

  if (user_email) {
    FavoritesService
      .findFavoritesByUserEmail(user_email)
      .then((favorites) => {
        favorites?.length
          ? res.status(200).json({ favorites })
          : res.status(404).json({ message: 'Es konnten keine Favoriten gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Favoriten. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Favoriten.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Favoriten, da Angaben fehlen.',
    });
  }
}; */

const getAllFavoritesByAdvertisementId = (req, res) => {
  const { advertisement_id } = req.params;

  if (advertisement_id) {
    FavoritesService.findFavoritesByAdvertisementId(advertisement_id)
      .then((favorites) => {
        favorites?.length
          ? res.status(200).json({ favorites })
          : res.status(404).json({ message: 'Es konnten keine Favoriten gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Favoriten. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Favoriten.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Favoriten, da Angaben fehlen.',
    });
  }
};

const getAllFavoritesByUserId = (req, res) => {
  const { user_id } = req.params;

  if (user_id) {
    FavoritesService.findFavoritesByUserId(user_id)
      .then((favorites) => {
        favorites?.length
          ? res.status(200).json({ favorites })
          : res.status(404).json({ message: 'Es konnten keine Favoriten gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Favoriten. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Favoriten.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Favoriten, da Angaben fehlen.',
    });
  }
};

const getAllFavoritesByClerkUserId = (req, res) => {
  const { clerk_user_id } = req.params;

  if (clerk_user_id) {
    FavoritesService.findFavoritesByClerkUserId(clerk_user_id)
      .then((favorites) => {
        favorites?.length
          ? res.status(200).json({ favorites })
          : res.status(404).json({ message: 'Es konnten keine Favoriten gefunden werden.' });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Favoriten. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Favoriten.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Favoriten, da Angaben fehlen.',
    });
  }
};

const addFavorite = (req, res) => {
  const favoriteDTO = ({ fk_advertisement_id, fk_user_id } = req.body);

  if (fk_advertisement_id && fk_user_id) {
    FavoritesService.add(favoriteDTO)
      .then((newFavorite) =>
        res.status(201).json({
          favorite_id: newFavorite.favorite_id,
          fk_advertisement_id: newFavorite.fk_advertisement_id,
          fk_user_id: newFavorite.fk_user_id,
          created_at: newFavorite.created_at,
          updated_at: newFavorite.updated_at,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von diesem Favoriten. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von diesem Favoriten.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von diesem Favoriten, da Angaben fehlen.',
    });
  }
};

const deleteFavorite = (req, res) => {
  const { favorite_id } = req.params;

  if (favorite_id) {
    FavoritesService.remove(favorite_id)
      .then(() => res.status(200).json({ message: 'Der Favoriten wurde gelöscht.' }))
      .catch((error) => {
        console.log('Fehler beim Löschen des Favoriten. ', error);
        return res.status(500).json({
          message: 'Fehler beim Löschen des Favoriten.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Löschen des Favoriten, da Angaben fehlen.',
    });
  }
};

module.exports = {
  getAllFavorites,
  getFavoriteById,
  /* getAllFavoritesByUserEmail, */
  getAllFavoritesByAdvertisementId,
  getAllFavoritesByUserId,
  getAllFavoritesByClerkUserId,
  addFavorite,
  deleteFavorite,
};
