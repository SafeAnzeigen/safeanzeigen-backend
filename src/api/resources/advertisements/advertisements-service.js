require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const jsQR = require('jsqr');
const jpeg = require('jpeg-js');
const fs = require('fs');
const https = require('https');
const download = require('image-downloader');
const db = require('../../../database/db');
const verificationImageSecret = process.env.VERIFICATION_IMAGE_SECRET;

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
    /* resolve(true); */

    const options = {
      url: verification_url,
      dest: './../../src/temp/advertisements',
    };
    const path = require('path');
    download
      .image(options)
      .then(({ filename }) => {
        const jpegData = fs.readFileSync(
          path.resolve(__dirname, '../../../xwvnip5cnkjkwax2iwlf.jpg')
        );
        const rawImageData = jpeg.decode(jpegData, { useTArray: true });
        console.log('rawImageData', rawImageData);

        const code = jsQR(rawImageData.data, rawImageData.width, rawImageData.height);

        if (code) {
          console.log('Found QR code', code);
        }

        resolve(); // saved to /path/to/dest/image.jpg
      })
      .catch((err) => {
        console.error(err);
        reject();
      });

    resolve(true);

    /* const token = jsonwebtoken.sign({ clerkuserid: clerk_user_id }, verificationImageSecret, {
      expiresIn: '1h',
    });
    console.log('token: ', token);
    token ? resolve(token) : reject(token); */
  });

module.exports = {
  find,
  findById,
  findAdvertisementsByUserId,
  findAdvertisementsByCategoryId,
  add,
  update,
  deactivate,
  generateVerificationImage,
  validateVerificationImage,
};
