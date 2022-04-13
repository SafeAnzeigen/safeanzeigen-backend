const searchesService = require('./searches-service');

const getAllSearches = (req, res) =>
  searchesService
    .find()
    .then((searches) =>
      res.status(200).json({
        searches,
      })
    )
    .catch((error) => {
      console.log('Fehler beim Erhalten von allen Suchebegriffen. ', error);
      return res.status(500).json({
        message: 'Fehler beim Erhalten von allen Suchebegriffen.',
      });
    });

const getSearchById = (req, res) => {
  const { search_id } = req.params;

  if (search_id) {
    searchesService
      .findById(search_id)
      .then((search) => {
        search
          ? res.status(200).json({
              search,
            })
          : res.status(404).json({
              message: 'Dieser Suchebegriff wurde nicht gefunden.',
            });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von diesem Suchebegriff. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von diesem Suchebegriff.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von diesem Suchebegriff, da Angaben fehlen.',
    });
  }
};

const getAllSearchesByUserId = async (req, res) => {
  const { user_id } = req.params;

  if (user_id) {
    searchesService
      .findSearchesByUserId(user_id)
      .then((searches) => {
        searches && searches.length /* TODO: Optional .? */
          ? res.status(200).json({
              searches,
            })
          : res.status(404).json({
              message: 'Es konnten keine Suchebegriffe gefunden werden.',
            });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Suchebegriffen. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Suchebegriffen.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Suchebegriffen, da Angaben fehlen.',
    });
  }
};

const addSearch = (req, res) => {
  const searchDTO = ({ user_id, search_term } = req.body);

  if (user_id && search_term) {
    searchesService
      .add(searchDTO)
      .then((newSearch) =>
        res.status(201).json({
          search_id: newSearch.search_id,
          user_id: newSearch.fk_user_id,
          is_active: newSearch.is_active,
          search_term: newSearch.search_term,
          created_at: newSearch.created_at,
          updated_at: newSearch.updated_at,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von diesem Suchebegriff. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von diesem Suchebegriff.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von diesem Suchebegriff, da Angaben fehlen.',
    });
  }
};

const deactivateSearch = (req, res) => {
  const { search_id } = req.params;

  if (search_id) {
    searchesService
      .deactivate(search_id, { is_active: false })
      .then(() =>
        res.status(200).json({
          message: 'Der Suchebegriff wurde deaktiviert.',
        })
      )
      .catch((error) => {
        console.log('Fehler beim Deaktivieren des Suchebegriffs. ', error);
        return res.status(500).json({
          message: 'Fehler beim Deaktivieren des Suchebegriffs.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Deaktivieren des Suchebegriffs, da Angaben fehlen.',
    });
  }
};

module.exports = {
  getAllSearches,
  getSearchById,
  getAllSearchesByUserId,
  addSearch,
  deactivateSearch,
};
