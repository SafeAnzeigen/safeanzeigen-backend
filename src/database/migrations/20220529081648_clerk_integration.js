exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('clerk_user_id', 128).unique();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('clerk_user_id');
  });
};
