require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const server = express();
/* const nodemailer = require('nodemailer'); */

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://safeanzeigen.de',
  'https://www.safeanzeigen.de',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(console.log('Blocked by CORS rules: ', origin));
    }
  },
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(logger('dev'));
server.disable('etag');
server.set('json spaces', 4);

server.get('/', function rootHandler(req, res) {
  res.status(200).json({
    message: `Welcome to the ${process.env.DEPLOYMENT} environment API of safeanzeigen!`,
  });
});

const SearchesRouter = require('./api/resources/searches/searches-router');
const ContactInfosRouter = require('./api/resources/contact-infos/contact-infos-router');

server.use('/v1/searches', SearchesRouter);
server.use('/v1/contact-infos', ContactInfosRouter);

module.exports = server;
