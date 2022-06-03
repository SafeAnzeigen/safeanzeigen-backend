require('dotenv').config();

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://safeanzeigen.de',
  'https://www.safeanzeigen.de',
];

const server = require('./server');
const db = require('./database/db');
const server2 = require('http').createServer(server);
const io = require('socket.io')(server2, { cors: { origin: whitelist } });

io.on('connection', (socket) => {
  const id = socket.handshake.query.id;
  console.log('handshake connection for ad conversation room', socket.handshake.query.id);
  socket.join(id);

  socket.on('message', (messageObject) => {
    console.log('messageObject', messageObject);
    socket.emit('receive-message', messageObject);
  });

  socket.on('join', (messageObject) => {
    console.log('joinObject', messageObject);
  });

  socket.on('is-typing', ({ isTypingObject }) => {
    console.log('isTypingObject', isTypingObject);
  });
});

server2.listen(process.env.PORT || 5000, () =>
  db
    .raw('select 1')
    .then(() => {
      console.log('Connection to database successful.');
      console.log(
        `\n *** safeanzeigen API server ${process.env.DEPLOYMENT} environment running on ${process.env.SERVER_URL} ***\n`
      );
    })
    .catch((error) => {
      console.log('Connection to database failed. ', error);
      process.exit(1);
    })
);
