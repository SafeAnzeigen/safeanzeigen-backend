const CategoriesService = require('./categories-service');

const getAllCategories = (req, res) =>
  CategoriesService.find()
    .then((categories) => res.status(200).json({ categories }))
    .catch((error) => {
      console.log('Fehler beim Erhalten von allen Kategorien. ', error);
      return res.status(500).json({
        message: 'Fehler beim Erhalten von allen Kategorien.',
      });
    });

//NOT USED
/* 
const getCategoryById = (req, res) => {
  const { category_id } = req.params;

  if (category_id) {
    CategoriesService.findById(category_id)
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

const addCategory = (req, res) => {
  const { name } = req.body;

  if (name) {
    CategoriesService.add(name)
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

const updateCategory = (req, res) => {
  const { name } = req.body;

  if (req.body.category_id && name) {
    CategoriesService.update(req.body.category_id, { name })
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

const deleteCategoryById = (req, res) => {
  const { category_id } = req.params;

  if (category_id) {
    CategoriesService.remove(category_id)
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
}; */

module.exports = {
  getAllCategories,
  // NOT USED
  /* getCategoryById,
  addCategory,
  updateCategory,
  deleteCategoryById, */
};
