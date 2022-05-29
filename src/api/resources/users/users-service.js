const db = require('../../../database/db');

const find = () => db('users');

const findById = (user_id) =>
  db('users')
    .where({ user_id })
    .first()
    .then((user) => (user ? user : null));

const getUserByClerkId = (clerk_user_id) =>
  db('users')
    .where({ clerk_user_id })
    .first()
    .then((user) => (user ? user : null));

const findByEmail = (email) =>
  db('users')
    .where({ email })
    .first()
    .then((user) => (user ? user : null));

const add = (user) =>
  db('users')
    .insert(user, 'user_id')
    .then(([user_id]) => findById(user_id));

const update = (user_id, changes) => db('users').where({ user_id }).update(changes);

const deactivate = (user_id, deactivation) => db('users').where({ user_id }).update(deactivation);

module.exports = {
  find,
  findById,
  getUserByClerkId,
  findByEmail,
  add,
  update,
  deactivate,
};
