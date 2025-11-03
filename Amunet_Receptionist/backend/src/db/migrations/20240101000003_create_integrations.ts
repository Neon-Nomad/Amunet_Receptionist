import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('integrations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE');
    table.string('service', 50).notNullable(); // twilio, sendgrid, stripe, meta, google
    table.enum('mode', ['shared', 'custom']).defaultTo('shared');
    table.jsonb('encrypted_credentials'); // AES-256 encrypted
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
    table.unique(['business_id', 'service']);
    table.index('business_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('integrations');
}