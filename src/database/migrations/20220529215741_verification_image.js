exports.up = function (knex) {
  return knex.schema.alterTable('advertisements', (table) => {
    table.string('verification_qr_code');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('advertisements', (table) => {
    table.dropColumn('verification_qr_code');
  });
};
