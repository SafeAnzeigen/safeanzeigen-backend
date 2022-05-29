const db = require('../../../database/db');

const find = () => db('contact_infos');

const findById = (contact_info_id) =>
  db('contact_infos')
    .where({ contact_info_id })
    .first()
    .then((contactInfo) => (contactInfo ? contactInfo : null));

const findContactInfoByUserId = (user_id) =>
  db('contact_infos as c')
    .join('users as u', 'u.user_id', 'c.fk_user_id')
    .select(
      'c.contact_info_id',
      'c.fk_user_id',
      'c.is_active',
      'c.street',
      'c.street_number',
      'c.city',
      'c.zip',
      'c.county',
      'c.country',
      'c.created_at',
      'c.updated_at',
      'u.user_id',
      'u.email',
      'u.firstname',
      'u.lastname'
    )
    .where('c.fk_user_id', user_id);

const findContactInfoByUserEmail = (user_email) =>
  db('contact_infos as c')
    .join('users as u', 'u.user_id', 'c.fk_user_id')
    .select(
      'c.contact_info_id',
      'c.fk_user_id',
      'c.is_active',
      'c.street',
      'c.street_number',
      'c.city',
      'c.zip',
      'c.county',
      'c.country',
      'c.created_at',
      'c.updated_at',
      'u.user_id',
      'u.email',
      'u.firstname',
      'u.lastname'
    )
    .where('u.email', user_email);

const add = (contactInfo) =>
  db('contact_infos')
    .insert(contactInfo, 'contact_info_id')
    .then(([contact_info_id]) => findById(contact_info_id));

const update = (contact_info_id, changes) =>
  db('contact_infos').where({ contact_info_id }).update(changes);

const deactivate = (contact_info_id, deactivation) =>
  db('contact_infos').where({ contact_info_id }).update(deactivation);

module.exports = {
  find,
  findById,
  findContactInfoByUserId,
  findContactInfoByUserEmail,
  add,
  update,
  deactivate,
};
