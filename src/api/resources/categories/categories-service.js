const db = require('../../../database/db');

const find = () => db('categories');

// NOT USED
/* const findById = (category_id) =>
  db('categories')
    .where({ category_id })
    .first()
    .then((category) => (category ? category : null));

const add = (category) =>
  db('categories')
    .insert(category, 'category_id')
    .then(([category_id]) => findById(category_id));

const update = (category_id, changes) => db('categories').where({ category_id }).update(changes);

const remove = (category_id) => db('categories').where('category_id', category_id).del(); */

module.exports = {
  find,
  // NOT USED
  /*  findById,
  add,
  update,
  remove, */
};
