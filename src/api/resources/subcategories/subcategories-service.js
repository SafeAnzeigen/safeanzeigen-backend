const db = require('../../../database/db');

const find = () => db('subcategories');

const findById = (subcategory_id) =>
  db('subcategories')
    .where({ subcategory_id })
    .first()
    .then((subcategory) => (subcategory ? subcategory : null));

const findSubcategoriesByCategoryId = (category_id) =>
  db('subcategories as s')
    .join('categories as c', 'c.category_id', 's.fk_category_id')
    .select(
      's.subcategory_id',
      's.fk_category_id',
      's.name',
      's.created_at',
      's.updated_at',
      'c.name as category_name',
      'c.category_id'
    )
    .where('s.fk_category_id', category_id);

const findSubcategoriesByCategoryName = (category_name) =>
  db('subcategories as s')
    .join('categories as c', 'c.category_id', 's.fk_category_id')
    .select(
      's.subcategory_id',
      's.fk_category_id',
      's.name',
      's.created_at',
      's.updated_at',
      'c.name as category_name',
      'c.category_id'
    )
    .where('c.name', category_name);

const add = (subcategory) =>
  db('subcategories')
    .insert(subcategory, 'subcategory_id')
    .then(([subcategory_id]) => findById(subcategory_id));

const update = (subcategory_id, changes) =>
  db('subcategories').where({ subcategory_id }).update(changes);

const remove = (subcategory_id) =>
  db('subcategories').where('subcategory_id', subcategory_id).del();

module.exports = {
  find,
  findById,
  findSubcategoriesByCategoryId,
  findSubcategoriesByCategoryName,
  add,
  update,
  remove,
};
