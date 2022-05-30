exports.up = function (knex) {
  return knex.schema.alterTable('advertisements', (table) => {
    table.integer('view_count');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('advertisements', (table) => {
    table.dropColumn('view_count');
  });
};
