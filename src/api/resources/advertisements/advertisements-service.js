require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const jsQR = require('jsqr');
const jpeg = require('jpeg-js');
const fs = require('fs');
const download = require('image-downloader');
const db = require('../../../database/db');
const verificationImageSecret = process.env.VERIFICATION_IMAGE_SECRET;
const verificationImageSuccessSecret = process.env.VERIFICATION_SUCCESSFUL_SECRET;

const find = () => db('advertisements');

const findAllPublicAdvertisements = () =>
  new Promise((resolve, reject) => {
    db('advertisements as a')
      .select(
        'a.advertisement_id',
        'a.subcategory_id',
        'a.title',
        'a.price',
        'a.description',
        'a.price_type',
        'a.is_verified',
        'a.article_image_1',
        'a.is_published',
        'a.created_at',
        'c.name as category_name',
        'a.location_street as locality'
      )
      .join('categories as c', 'c.category_id', 'a.fk_category_id')
      .where('is_active', true)
      .andWhere('is_published', true)
      .then((publicAdvertisementsArray) => {
        if (publicAdvertisementsArray.length > 0) {
          db('subcategories')
            .then((subcategoriesArray) => {
              let publicAdvertisements = publicAdvertisementsArray.map((publicAdvertisement) => {
                if (publicAdvertisement.subcategory_id) {
                  let subcategory = subcategoriesArray.find(
                    (subcategory) =>
                      subcategory.subcategory_id === publicAdvertisement.subcategory_id
                  );
                  publicAdvertisement.subcategory_name = subcategory.name;
                  return publicAdvertisement;
                }
                return publicAdvertisement;
              });
              resolve(publicAdvertisements);
            })
            .catch((error) => reject(error));
        } else {
          resolve(null);
        }
      })
      .catch((error) => reject(error));
  });

const findById = (advertisement_id) =>
  db('advertisements')
    .where({ advertisement_id })
    .first()
    .then((advertisement) => (advertisement ? advertisement : null));

/* TODO: ADD VIEW TO SCHEMA AND TRIGGER ON FRONTEND */
/*  Contains various checks to provided only necessary data to the outside world */ /* TODO: REDO WITH MULTIPLE JOINS */
const findPublicById = (advertisement_id) =>
  new Promise((resolve, reject) => {
    db('advertisements')
      .where({ advertisement_id })
      .first()
      .then((advertisement) => {
        if (advertisement) {
          let category_id = advertisement.fk_category_id;

          db('categories')
            .where({ category_id })
            .first()
            .then((category) => {
              if (category) {
                let modifiedAdvertisement = advertisement;
                modifiedAdvertisement.category_name = category.name;

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
                  .where('f.fk_advertisement_id', advertisement_id)
                  .then((favoriteArray) => {
                    if (favoriteArray) {
                      modifiedAdvertisement.favorite_count = favoriteArray.length;
                    }

                    if (!modifiedAdvertisement.show_address) {
                      modifiedAdvertisement.location_city = 'Auf Anfrage';
                      modifiedAdvertisement.location_country = 'Auf Anfrage';
                      modifiedAdvertisement.location_county = 'Auf Anfrage';
                      modifiedAdvertisement.location_street = 'Auf Anfrage';
                      modifiedAdvertisement.location_street_number = 'Auf Anfrage';
                      modifiedAdvertisement.location_zip = 'Auf Anfrage';
                    }

                    let user_id = modifiedAdvertisement.fk_user_id;
                    db('users')
                      .where({ user_id })
                      .first()
                      .then((user) => {
                        if (user?.user_id) {
                          modifiedAdvertisement.register_date = user.created_at;
                          modifiedAdvertisement.clerk_user_id = user.clerk_user_id;
                          modifiedAdvertisement.user_photo = user.user_photo;

                          if (!modifiedAdvertisement.show_name) {
                            modifiedAdvertisement.fullname = 'Auf Anfrage';
                          } else {
                            modifiedAdvertisement.fullname = user.firstname + ' ' + user.lastname;
                          }

                          if (!modifiedAdvertisement.show_phone) {
                            modifiedAdvertisement.phone_number = 'Auf Anfrage';
                          } else {
                            modifiedAdvertisement.phone_number = user.phone_number;
                          }

                          if (modifiedAdvertisement.subcategory_id) {
                            let subcategory_id = modifiedAdvertisement.subcategory_id;

                            db('subcategories')
                              .where({ subcategory_id })
                              .first()
                              .then((subcategory) => {
                                if (subcategory) {
                                  modifiedAdvertisement.subcategory_name = subcategory?.name;
                                }
                                resolve(modifiedAdvertisement);
                              });
                          } else {
                            resolve(modifiedAdvertisement);
                          }
                        } else {
                          resolve(null);
                        }
                      });
                  });
              } else {
                resolve(null);
              }
            });
        } else {
          resolve(null);
        }
      });
  });

const findAdvertisementsByUserId = (fk_user_id) =>
  db('advertisements')
    .where({ fk_user_id })
    .then((advertisements) =>
      advertisements.length > 0 ? advertisements : null
    ); /* TODO: TEST WHAT IS RETURNED FOR NOTHING; SINGLE; AND MANY */

const findAdvertisementsByClerkUserId = (clerk_user_id) =>
  new Promise((resolve, reject) => {
    console.log('clerk_user_id HERE', clerk_user_id);
    db('users')
      .where({ clerk_user_id })
      .first()
      .then((user) => {
        console.log('USER FOUND', user);
        console.log('USERID FOUND', user.user_id);
        let fk_user_id = user.user_id;

        return db('advertisements')
          .where({ fk_user_id })
          .then((advertisements) =>
            advertisements.filter((elem) => elem.is_active).length > 0
              ? resolve(advertisements.filter((elem) => elem.is_active))
              : resolve(null)
          ); /* TODO: TEST WHAT IS RETURNED FOR NOTHING; SINGLE; AND MANY */
      })
      .catch((error) => {
        console.log('ERROR FIND ADVERTISEMENTS BY CLERKUSERID', error);
        reject(error);
      });
  });

const findAdvertisementsByCategoryId = (fk_category_id) =>
  db('advertisements')
    .where({ fk_category_id })
    .then((advertisements) =>
      advertisements.length > 0 ? advertisements : null
    ); /* TODO: TEST WHAT IS RETURNED FOR NOTHING; SINGLE; AND MANY */

const add = (advertisementDTO) =>
  new Promise((resolve, reject) => {
    const { clerk_user_id } = advertisementDTO;
    db('users')
      .where({ clerk_user_id })
      .first()
      .then((user) => {
        console.log('USER FOUND', user);
        console.log('USERID FOUND', user.user_id);

        advertisementDTO.fk_user_id = user.user_id;
        delete advertisementDTO.clerk_user_id;
        advertisementDTO.is_published = true;

        db('categories')
          .where({ name: advertisementDTO.category_name })
          .first()
          .then((category) => {
            console.log('FOUND CATEGORY', category);
            if (category) {
              advertisementDTO.fk_category_id = category.category_id;
              delete advertisementDTO.category_name;

              if (advertisementDTO.subcategory_name) {
                db('subcategories')
                  .where({ name: advertisementDTO.subcategory_name })
                  .first()
                  .then((subcategory) => {
                    console.log('FOUND SUBCATEGORY', subcategory);
                    if (subcategory) {
                      advertisementDTO.subcategory_id = subcategory.subcategory_id;
                      delete advertisementDTO.subcategory_name;

                      return db('advertisements')
                        .insert(advertisementDTO, 'advertisement_id')
                        .then(([advertisement_id]) => resolve(findById(advertisement_id)));
                    } else {
                      reject();
                    }
                  });
              } else {
                delete advertisementDTO.subcategory_name;
                return db('advertisements')
                  .insert(advertisementDTO, 'advertisement_id')
                  .then(([advertisement_id]) => resolve(findById(advertisement_id)));
              }
            } else {
              reject();
            }
          });

        /* return db('advertisements')
          .insert(advertisementDTO, 'advertisement_id')
          .then(([advertisement_id]) => resolve(findById(advertisement_id))); */
      })
      .catch((error) => {
        console.log('ERROR DURING ADD', error);
        reject(error);
      });
  });

const update = (advertisement_id, changes) =>
  db('advertisements').where({ advertisement_id }).update(changes);

const deactivate = (advertisement_id, deactivation) =>
  db('advertisements').where({ advertisement_id }).update(deactivation);

const toggleReservation = (advertisement_id) =>
  findById(advertisement_id).then((advertisement) =>
    advertisement
      ? db('advertisements')
          .where({ advertisement_id })
          .update({ is_published: !advertisement?.is_published })
      : null
  );

const generateVerificationImage = (clerk_user_id) =>
  new Promise((resolve, reject) => {
    const token = jsonwebtoken.sign({ clerkuserid: clerk_user_id }, verificationImageSecret, {
      expiresIn: '1h',
    });
    console.log('token: ', token);
    token ? resolve(token) : reject(token);
  });

const validateVerificationImage = (clerk_user_id, verification_url, verification_code) =>
  new Promise((resolve, reject) => {
    const options = {
      url: verification_url,
      dest: './../../src/temp/',
    };
    const path = require('path');
    download
      .image(options)
      .then(({ filename }) => {
        const jpegData = fs.readFileSync(
          path.resolve(__dirname, '../../../temp/' + path.basename(filename))
        );
        const rawImageData = jpeg.decode(jpegData, { useTArray: true });
        const code = jsQR(rawImageData.data, rawImageData.width, rawImageData.height);
        fs.unlinkSync(path.resolve(__dirname, '../../../temp/' + path.basename(filename)));

        if (code?.data) {
          console.log('QR Code gefunden!', code);

          jsonwebtoken.verify(code?.data, verificationImageSecret, (error, decodedToken) => {
            if (
              decodedToken &&
              decodedToken.clerkuserid === clerk_user_id &&
              code?.data === verification_code
            ) {
              const validationsuccesstoken = jsonwebtoken.sign(
                { clerkuserid: clerk_user_id },
                verificationImageSuccessSecret,
                {
                  expiresIn: '1h',
                }
              );
              console.log('validationsuccesstoken', validationsuccesstoken);
              resolve([code?.data, validationsuccesstoken]);
            }
            if (error) {
              console.log('error', error);
            }
            resolve(['invalid', '']);
          });
        } else {
          resolve(['notfound', '']);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

/* TODO: This would be better with a database trigger */
const increaseViewCount = (advertisement_id) =>
  new Promise((resolve, reject) => {
    db('advertisements')
      .where({ advertisement_id })
      .first()
      .then((advertisement) => {
        if (advertisement) {
          update(advertisement_id, { view_count: advertisement.view_count + 1 }).then(() => {
            resolve('done');
          });
        } else {
          resolve(null);
        }
      });
  });

module.exports = {
  find,
  findAllPublicAdvertisements,
  findById,
  findPublicById,
  findAdvertisementsByUserId,
  findAdvertisementsByClerkUserId,
  findAdvertisementsByCategoryId,
  add,
  update,
  deactivate,
  toggleReservation,
  generateVerificationImage,
  validateVerificationImage,
  increaseViewCount,
};
