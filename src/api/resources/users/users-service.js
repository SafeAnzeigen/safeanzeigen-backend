const nodemailer = require('nodemailer');
const format = require('date-fns/format');

const db = require('../../../database/db');
const safeanzeigenTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});
const safeanzeigenSender = '"Safeanzeigen" <hallo@safeanzeigen.de>';

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

const update = (clerk_user_id, changes) => db('users').where({ clerk_user_id }).update(changes);

const deactivate = (user_id, deactivation) => db('users').where({ user_id }).update(deactivation);

const sendMailContactRequest = async (emailContactDTO) =>
  new Promise((resolve, reject) => {
    safeanzeigenTransporter
      .sendMail({
        from: safeanzeigenSender,
        to:
          emailContactDTO.firstname +
          ' ' +
          emailContactDTO.lastname +
          ' <' +
          emailContactDTO.email +
          '>',
        bcc: safeanzeigenSender,
        subject:
          'Wir haben Ihre Safeanzeigen Kontaktanfrage vom ' +
          format(new Date(Date.now()), 'dd.MM.yyyy') +
          'erhalten.',
        text: 'Ihre Nachricht: ' + emailContactDTO.message,
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });

module.exports = {
  find,
  findById,
  getUserByClerkId,
  findByEmail,
  add,
  update,
  deactivate,
  sendMailContactRequest,
};
