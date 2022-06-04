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
const MessageService = require('./api/resources/messages/messages-service.js');

io.on('connection', (socket) => {
  console.log('socket', socket.id);
  const roomId = socket.handshake.query.id;
  console.log('handshake connection for ad conversation room', roomId);

  socket.join(roomId);

  socket.on('exit', () => {
    console.log('exit of ', roomId);
    socket.leave(roomId);
  });

  socket.on('message', (messageObject) => {
    console.log('messageObject ', messageObject);
    console.log('socket', socket.id);
    MessageService.add(messageObject).then((newMessage) => {
      console.log('persisted as newMessage ', newMessage);
      io.in(roomId).emit('receive-message', messageObject);
    });
  });

  socket.on('is-typing', (isTypingObject) => {
    console.log('isTypingObject ', isTypingObject);
    io.in(roomId).emit('receive-is-typing', isTypingObject);
  });

  socket.on('stopped-typing', (stoppedTypingObject) => {
    console.log('stoppedTypingObject ', stoppedTypingObject);
    io.in(roomId).emit('receive-stopped-typing', stoppedTypingObject);
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
