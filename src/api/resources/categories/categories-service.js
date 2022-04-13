const db = require('../../../database/db');

function find() {
  return db('categories');
}

const findById = (category_id) =>
  db('categories')
    .where({ category_id })
    .first()
    .then((category) => (category ? category : null));

const add = (category) =>
  db('categories')
    .insert(category, 'category_id')
    .then(([category_id]) => findById(category_id));

const remove = (category_id) => db('categories').where('category_id', category_id).del();

module.exports = {
  find,
  findById,
  findContactInfoByUserId,
  add,
  remove,
};
