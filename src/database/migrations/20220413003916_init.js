exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.uuid('user_id').primary().defaultTo(knex.raw('(UUID())'));
      table.boolean('is_active').notNullable().defaultTo('true');
      table.string('email', 128).notNullable().unique();
      table.string('phone_number', 50).unique();
      table.string('firstname', 128).notNullable();
      table.string('lastname', 128).notNullable();
      table.string('gender', 50).notNullable();
      table.string('role', 128).notNullable().defaultTo('user');
      table.string('user_photo');
      table.timestamp('phone_verified', { useTz: true });
      table.timestamp('email_verified', { useTz: true });
      table.timestamp('kyc_verified', { useTz: true });
      table.timestamps(true, true);
    })
    .createTable('contact_infos', (table) => {
      table.uuid('contact_info_id').primary().defaultTo(knex.raw('(UUID())'));
      table
        .uuid('fk_user_id')
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.string('street', 128).notNullable();
      table.string('street_number', 50).notNullable();
      table.string('city', 128).notNullable();
      table.string('zip', 50).notNullable();
      table.string('county', 128).notNullable();
      table.string('country', 128).notNullable();
      table.timestamps(true, true);
    })
    .createTable('searches', (table) => {
      table.uuid('search_id').primary().defaultTo(knex.raw('(UUID())'));
      table
        .uuid('fk_user_id')
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.boolean('is_active').notNullable().defaultTo('true');
      table.string('search_term').notNullable();
      table.timestamps(true, true);
    })
    .createTable('categories', (table) => {
      table.uuid('category_id').primary().defaultTo(knex.raw('(UUID())'));
      table.string('name').notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('subcategories', (table) => {
      table.uuid('subcategory_id').primary().defaultTo(knex.raw('(UUID())'));
      table
        .uuid('fk_category_id')
        .notNullable()
        .references('category_id')
        .inTable('categories')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.string('name').notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('advertisements', (table) => {
      table.uuid('advertisement_id').primary().defaultTo(knex.raw('(UUID())'));
      table
        .uuid('fk_user_id')
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table
        .uuid('fk_category_id')
        .notNullable()
        .references('category_id')
        .inTable('categories')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.boolean('is_active').notNullable().defaultTo('true');
      table.boolean('is_published').notNullable().defaultTo('false');
      table.string('settlement_status', 50).notNullable().defaultTo('available');
      table.string('type', 50).notNullable();
      table.string('title', 128).notNullable();
      table.float('price').notNullable();
      table.string('price_type', 50).notNullable();
      table.string('description').notNullable();
      table.string('verification_image').notNullable();
      table.boolean('is_verified').defaultTo('false');
      table.string('article_image_1').notNullable();
      table.string('article_image_2');
      table.string('article_image_3');
      table.string('article_image_4');
      table.string('article_image_5');
      table.string('article_video');
      table.boolean('show_name').defaultTo('false');
      table.boolean('show_address').defaultTo('false');
      table.boolean('show_phone').defaultTo('false');
      table.boolean('show_user_photo').defaultTo('false');
      table.string('location_street', 128).notNullable();
      table.string('location_street_number', 50).notNullable();
      table.string('location_city', 128).notNullable();
      table.string('location_zip', 50).notNullable();
      table.string('location_county', 128).notNullable();
      table.string('location_country', 128).notNullable();
      table.timestamps(true, true);
    })
    .createTable('favorites', (table) => {
      table.uuid('favorite_id').primary().defaultTo(knex.raw('(UUID())'));
      table
        .uuid('fk_advertisement_id')
        .notNullable()
        .references('advertisement_id')
        .inTable('advertisements')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table
        .uuid('fk_user_id')
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('searches')
    .dropTable('contact_infos')
    .dropTable('subcategories')
    .dropTable('favorites')
    .dropTable('advertisements')
    .dropTable('categories')
    .dropTable('users');
};
