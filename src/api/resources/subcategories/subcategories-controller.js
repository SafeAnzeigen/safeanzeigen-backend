const SubcategoriesService = require('./categories-service');

const getAllSubcategories = (req, res) =>
  SubcategoriesService.find()
    .then((subcategories) =>
      res.status(200).json({
        subcategories,
      })
    )
    .catch((error) => {
      console.log('Fehler beim Erhalten von allen Subkategorien. ', error);
      return res.status(500).json({
        message: 'Fehler beim Erhalten von allen Subkategorien.',
      });
    });

const getSubcategoryById = (req, res) => {
  const { subcategory_id } = req.params;

  if (subcategory_id) {
    SubcategoriesService.findById(subcategory_id)
      .then((subcategory) => {
        subcategory
          ? res.status(200).json({
              subcategory,
            })
          : res.status(404).json({
              message: 'Diese Subkategorie wurde nicht gefunden.',
            });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von dieser Subkategorie. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von dieser Subkategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von dieser Subkategorie, da Angaben fehlen.',
    });
  }
};

const getAllSubcategoriesByCategoryId = async (req, res) => {
  const { category_id } = req.params;

  if (category_id) {
    contactInfosService
      .findSubcategoriesByCategoryId(category_id)
      .then((subcategories) => {
        subcategories?.length
          ? res.status(200).json({
              subcategories,
            })
          : res.status(404).json({
              message: 'Es konnten keine Subkategorien gefunden werden.',
            });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Subkategorien. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Subkategorien.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Subkategorien, da Angaben fehlen.',
    });
  }
};

const getAllSubcategoriesByCategoryName = async (req, res) => {
  const { category_name } = req.params;

  if (category_name) {
    contactInfosService
      .findSubcategoriesByCategoryName(category_name)
      .then((subcategories) => {
        subcategories?.length
          ? res.status(200).json({
              subcategories,
            })
          : res.status(404).json({
              message: 'Es konnten keine Subkategorien gefunden werden.',
            });
      })
      .catch((error) => {
        console.log('Fehler beim Erhalten von Subkategorien. ', error);
        return res.status(500).json({
          message: 'Fehler beim Erhalten von Subkategorien.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Erhalten von Subkategorien, da Angaben fehlen.',
    });
  }
};

const addSubcategory = (req, res) => {
  const subcategoryDTO = ({ fk_category_id, name } = req.body);

  if (fk_category_id && name) {
    SubcategoriesService.add(subcategoryDTO)
      .then((newSubcategory) =>
        res.status(201).json({
          subcategory_id: newSubcategory.subcategory_id,
          fk_category_id: newSubcategory.fk_category_id,
          name: newSubcategory.name,
          created_at: newSubcategory.created_at,
          updated_at: newSubcategory.updated_at,
        })
      )
      .catch((error) => {
        console.log('Fehler beim Hinzufügen von dieser Subkategorie. ', error);
        return res.status(500).json({
          message: 'Fehler beim Hinzufügen von dieser Subkategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Hinzufügen von dieser Subkategorie, da Angaben fehlen.',
    });
  }
};

const updateSubcategory = (req, res) => {
  const updateSubcategoryDTO = ({ fk_category_id, name } = req.body);

  if (req.body.subcategory_id && (fk_category_id || name)) {
    SubcategoriesService.update(req.body.subcategory_id, updateSubcategoryDTO)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({
              message: 'Die Subkategorie wurde aktualisiert.',
            })
          : res.status(500).json({
              message:
                'Fehler bei der Aktualisierung der Subkategorie, da Fehler in der Datenbank auftraten.',
            })
      )
      .catch((error) => {
        console.log('Fehler bei der Aktualisierung der Subkategorie. ', error);
        return res.status(500).json({
          message: 'Fehler bei der Aktualisierung der Subkategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler bei der Aktualisierung der Subkategorie, da Angaben fehlen.',
    });
  }
};

const deleteSubcategoryById = (req, res) => {
  const { subcategory_id } = req.params;

  if (subcategory_id) {
    SubcategoriesService.remove(subcategory_id)
      .then(() =>
        res.status(200).json({
          message: 'Die Subkategorie wurde gelöscht.',
        })
      )
      .catch((error) => {
        console.log('Fehler beim Löschen der Subkategorie. ', error);
        return res.status(500).json({
          message: 'Fehler beim Löschen der Subkategorie.',
        });
      });
  } else {
    return res.status(400).json({
      message: 'Fehler beim Löschen der Subkategorie, da Angaben fehlen.',
    });
  }
};

module.exports = {
  getAllSubcategories,
  getSubcategoryById,
  getAllSubcategoriesByCategoryId,
  getAllSubcategoriesByCategoryName,
  addSubcategory,
  updateSubcategory,
  deleteSubcategoryById,
};
