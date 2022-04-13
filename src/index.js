require('dotenv').config();

const server = require('./server');
const db = require('./database/db');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 's.majewsky93@gmail.com', // Change to your recipient
  from: process.env.SENDGRID_VERIFIED_SENDER_EMAIL, // Change to your verified sender
  subject: 'My first mail',
  text: 'my mail',
  html: '<strong>This is my mail</strong>',
};

server.listen(process.env.PORT || 5000, () =>
  db
    .raw('select 1')
    .then(() => {
      console.log('Connection to database successful.');
      console.log(
        `\n *** safeanzeigen API server ${process.env.DEPLOYMENT} environment running on ${process.env.SERVER_URL} ***\n`
      );
      /*  sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.error(error);
        }); */
    })
    .catch((error) => {
      console.log('Connection to database failed. ', error);
      process.exit(1);
    })
);
