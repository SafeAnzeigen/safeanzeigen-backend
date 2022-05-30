exports.up = function (knex) {
  return knex.schema.alterTable('advertisements', (table) => {
    table.string('validation_success_token');
    table.string('subcategory_id');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('advertisements', (table) => {
    table.dropColumn('validation_success_token');
    table.dropColumn('subcategory_id');
  });
};
