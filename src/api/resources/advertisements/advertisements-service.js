const db = require('../../../database/db');

const find = () => db('advertisements');

const findById = (advertisement_id) =>
  db('advertisements')
    .where({ advertisement_id })
    .first()
    .then((advertisement) => (advertisement ? advertisement : null));

const findAdvertisementsByUserId = (fk_user_id) =>
  db('advertisements')
    .where({ fk_user_id })
    .then((advertisements) =>
      advertisements.length > 0 ? advertisements : null
    ); /* TODO: TEST WHAT IS RETURNED FOR NOTHING; SINGLE; AND MANY */

const findAdvertisementsByCategoryId = (fk_category_id) =>
  db('advertisements')
    .where({ fk_category_id })
    .then((advertisements) =>
      advertisements.length > 0 ? advertisements : null
    ); /* TODO: TEST WHAT IS RETURNED FOR NOTHING; SINGLE; AND MANY */

const add = (user) =>
  db('advertisements')
    .insert(advertisement, 'advertisement_id')
    .then(([advertisement_id]) => findById(advertisement_id));

const update = (advertisement_id, changes) =>
  db('advertisements').where({ advertisement_id }).update(changes);

const deactivate = (advertisement_id, deactivation) =>
  db('advertisements').where({ advertisement_id }).update(deactivation);

module.exports = {
  find,
  findById,
  findAdvertisementsByUserId,
  findAdvertisementsByCategoryId,
  add,
  update,
  deactivate,
};
