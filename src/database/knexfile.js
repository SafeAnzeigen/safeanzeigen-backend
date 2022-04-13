require('dotenv').config({ path: '../.env' });
const parse = require('pg-connection-string').parse;
const pgconfig = parse(process.env.DATABASE_URL);

pgconfig.ssl = { rejectUnauthorized: false };

module.exports = {
  development: {
    client: 'pg',
    connection: pgconfig,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
