exports.up = function (knex) {
  return knex.schema.alterTable('categories', (table) => {
    table.string('category_image');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('categories', (table) => {
    table.dropColumn('category_image');
  });
};
