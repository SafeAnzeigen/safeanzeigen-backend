exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('user_visited_chat_timestamp');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('user_visited_chat_timestamp');
  });
};
