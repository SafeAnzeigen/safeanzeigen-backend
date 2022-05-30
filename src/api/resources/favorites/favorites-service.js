const db = require('../../../database/db');

const find = () => db('favorites');

const findById = (favorite_id) =>
  db('favorites')
    .where({ favorite_id })
    .first()
    .then((favorite) => (favorite ? favorite : null));

const findFavoritesByAdvertisementId = (fk_advertisement_id) =>
  db('favorites as f')
    .join('advertisements as a', 'a.advertisement_id', 'f.fk_advertisement_id')
    .select(
      'f.favorite_id',
      'f.fk_advertisement_id',
      'f.fk_user_id',
      'f.created_at',
      'f.updated_at',
      'a.advertisement_id',
      'a.fk_user_id',
      'a.fk_category_id',
      'a.is_active'
    )
    .where('f.fk_advertisement_id', fk_advertisement_id);

const findFavoritesByUserId = (fk_user_id) =>
  db('favorites as f')
    .join('users as u', 'u.user_id', 'f.fk_user_id')
    .select(
      'f.favorite_id',
      'f.advertisement_id',
      'f.fk_user_id',
      'f.created_at',
      'f.updated_at',
      'u.user_id',
      'u.email',
      'u.firstname',
      'u.lastname'
    )
    .where('f.fk_user_id', fk_user_id);

const findFavoritesByClerkUserId = (clerk_user_id) =>
  new Promise((resolve, reject) => {
    db('users')
      .where({ clerk_user_id })
      .first()
      .then((user) => {
        console.log('USER FOUND', user);
        console.log('USERID FOUND', user.user_id);
        let fk_user_id = user.user_id;

        return resolve(
          db('favorites as f')
            .join('users as u', 'u.user_id', 'f.fk_user_id')
            .select(
              'f.favorite_id',
              'f.fk_advertisement_id',
              'f.fk_user_id',
              'f.created_at',
              'f.updated_at',
              'u.user_id',
              'u.email',
              'u.firstname',
              'u.lastname'
            )
            .where('f.fk_user_id', fk_user_id)
        );
      })
      .catch((error) => {
        console.log('ERROR FIND FAVORITES BY CLERKUSERID', error);
        reject(error);
      });
  });

const add = (favorite) =>
  db('favorites')
    .insert(favorite, 'favorite_id')
    .then(([favorite_id]) => findById(favorite_id));

const remove = (favorite_id) => db('favorites').where('favorite_id', favorite_id).del();

module.exports = {
  find,
  findById,
  /* findFavoritesByUserEmail, */
  findFavoritesByAdvertisementId,
  findFavoritesByUserId,
  findFavoritesByClerkUserId,
  add,
  remove,
};
