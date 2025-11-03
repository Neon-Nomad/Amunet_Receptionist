import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('businesses', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('name', 255).notNullable();
    table.string('industry', 100);
    table.text('description');
    table.string('phone', 20);
    table.string('email', 255);
    table.jsonb('hours'); // {mon: "9-5", tue: "9-5", ...}
    table.string('timezone', 50).defaultTo('America/Los_Angeles');
    table.timestamps(true, true);
    table.index('user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('businesses');
}