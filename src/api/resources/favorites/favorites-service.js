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
      'f.fk_advertisement_id',
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

        db('favorites as f')
          .select(
            'f.favorite_id',
            'f.fk_advertisement_id',
            'u.user_id',
            'u.clerk_user_id',
            'a.title',
            'a.price',
            'a.price_type',
            'a.article_image_1',
            'a.is_verified',
            'a.is_published',
            'f.created_at'
          )
          .join('users as u', 'u.user_id', 'f.fk_user_id')
          .join('advertisements as a', 'a.advertisement_id', 'f.fk_advertisement_id')
          .where('f.fk_user_id', '=', fk_user_id)
          .then((favoritesArray) => {
            return resolve(favoritesArray);
          });
      })
      .catch((error) => {
        console.log('ERROR FIND FAVORITES BY CLERKUSERID', error);
        reject(error);
      });
  });

const add = (fk_advertisement_id, clerk_user_id) =>
  new Promise((resolve, reject) =>
    db('users')
      .where({ clerk_user_id })
      .first()
      .then((user) => {
        if (user && user?.user_id) {
          db('favorites')
            .insert({ fk_advertisement_id, fk_user_id: user?.user_id }, 'favorite_id')
            .then(([favorite_id]) =>
              findById(favorite_id).then((favorite) => {
                console.log('NEW FAV', favorite);
                return resolve(findFavoritesByClerkUserId(clerk_user_id));
              })
            );
        } else {
          reject();
        }
      })
  );

/* const remove = (favorite_id) => db('favorites').where({ favorite_id }).del(); */
/* const remove = (favorite_id) =>
  db('favorites').del().where({
    favorite_id: favorite_id,
  }); */

const remove = (advertisement_id, clerk_user_id) =>
  new Promise((resolve, reject) =>
    findFavoritesByClerkUserId(clerk_user_id).then((favoriteArray) => {
      if (favoriteArray.length) {
        let selectedFavorite = favoriteArray.filter(
          (element) => element?.fk_advertisement_id === advertisement_id
        );

        console.log('GOT THIS ', favoriteArray[0]);
        console.log('DELETING THIS NOW', selectedFavorite);

        if (selectedFavorite.length) {
          db('favorites')
            .where('favorite_id', selectedFavorite[0].favorite_id)
            .del()
            .then(() => {
              return resolve(findFavoritesByClerkUserId(clerk_user_id));
            });
        } else {
          reject();
        }
      } else {
        reject();
      }
    })
  );

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
