exports.up = function (knex) {
  return knex.schema.alterTable('contact_infos', (table) => {
    table.boolean('is_active').notNullable().defaultTo('true');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('contact_infos', (table) => {
    table.dropColumn('is_active');
  });
};
