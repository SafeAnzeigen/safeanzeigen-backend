require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const jsQR = require('jsqr');
const jpeg = require('jpeg-js');
const fs = require('fs');
const https = require('https');
const download = require('image-downloader');
const db = require('../../../database/db');
const verificationImageSecret = process.env.VERIFICATION_IMAGE_SECRET;
const verificationImageSuccessSecret = process.env.VERIFICATION_SUCCESSFUL_SECRET;

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

        return db('advertisements')
          .insert(advertisementDTO, 'advertisement_id')
          .then(([advertisement_id]) => resolve(findById(advertisement_id)));
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
