import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contact_submissions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 100).notNullable();
    table.string('company', 100);
    table.string('email', 255).notNullable();
    table.string('phone', 20);
    table.string('interest', 100); // demo, partnership, support
    table.text('message');
    table.timestamps(true, true);
    table.index('created_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('contact_submissions');
}