exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema
    .createTable('chats', (table) => {
      table.uuid('chat_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('ad_conversation_room_id').notNullable().unique();
      table.string('ad_id').notNullable();
      table.string('ad_title').notNullable();
      table.string('ad_price_type').notNullable();
      table.string('ad_price').notNullable();
      table.string('room_creator_clerk_user_id').notNullable();
      table.string('created_at_timestamp').notNullable();
      table.timestamps(true, true);
    })
    .createTable('messages', (table) => {
      table.uuid('message_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('ad_conversation_room_id').notNullable();
      table.string('from_clerk_user_id').notNullable();
      table.string('text', 1500).notNullable();
      table.string('message_sent_timestamp').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chats').dropTable('messages');
};
