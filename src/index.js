require('dotenv').config();

const server = require('./server');
/* const db = require('./db/db'); */

server.listen(
  process.env.PORT || 5000,
  () => console.log('Server running.')
  /* db
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
    }) */
);
