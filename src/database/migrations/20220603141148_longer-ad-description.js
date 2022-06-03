exports.up = function (knex) {
  return knex.schema.alterTable('advertisements', (table) => {
    table.string('description', 1500).alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('categories', (table) => {
    table.string('description').alter();
  });
};
