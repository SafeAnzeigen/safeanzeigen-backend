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

const AdvertisementsRouter = require('./api/resources/advertisements/advertisements-router');
const CategoriesRouter = require('./api/resources/categories/categories-router');
const ContactInfosRouter = require('./api/resources/contact-infos/contact-infos-router');
const FavoritesRouter = require('./api/resources/favorites/favorites-router');
const SearchesRouter = require('./api/resources/searches/searches-router');
const SubcategoriesRouter = require('./api/resources/subcategories/subcategories-router');
const UsersRouter = require('./api/resources/users/users-router');
const ChatsRouter = require('./api/resources/chats/chats-router');
const MessagesRouter = require('./api/resources/messages/messages-router');

server.use('/v1/advertisements', AdvertisementsRouter);
server.use('/v1/categories', CategoriesRouter);
server.use('/v1/favorites', FavoritesRouter);
server.use('/v1/contact-infos', ContactInfosRouter);
server.use('/v1/searches', SearchesRouter);
server.use('/v1/subcategories', SubcategoriesRouter);
server.use('/v1/users', UsersRouter);
server.use('/v1/chats', ChatsRouter);
server.use('/v1/messages', MessagesRouter);

module.exports = server;
