const db = require('../../../database/db');

const find = () => db('searches');

const findById = (search_id) =>
  db('searches')
    .where({ search_id })
    .first()
    .then((search) => (search ? search : null));

const findSearchesByUserId = (user_id) =>
  db('searches as s')
    .join('users as u', 'u.user_id', 's.fk_user_id')
    .select(
      's.search_id',
      's.fk_user_id',
      's.is_active',
      's.search_term',
      's.created_at',
      's.updated_at',
      'u.user_id',
      'u.email',
      'u.firstname',
      'u.lastname'
    )
    .where('s.fk_user_id', user_id);

const findSearchesByUserEmail = (user_email) =>
  db('searches as s')
    .join('users as u', 'u.user_id', 's.fk_user_id')
    .select(
      's.search_id',
      's.fk_user_id',
      's.is_active',
      's.search_term',
      's.created_at',
      's.updated_at',
      'u.user_id',
      'u.email',
      'u.firstname',
      'u.lastname'
    )
    .where('u.email', user_email);

const add = (search) =>
  db('searches')
    .insert(search, 'search_id')
    .then(([search_id]) => findById(search_id));

const deactivate = (search_id, deactivation) =>
  db('searches').where({ search_id }).update(deactivation);

module.exports = {
  find,
  findById,
  findSearchesByUserId,
  findSearchesByUserEmail,
  add,
  deactivate,
};
