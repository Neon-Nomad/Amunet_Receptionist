import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('calls', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE');
    table.string('from_number', 20);
    table.string('to_number', 20);
    table.text('transcript');
    table.string('status', 50); // completed, no-answer, busy
    table.enum('priority', ['LOW', 'HIGH']).defaultTo('LOW');
    table.decimal('estimated_value', 10, 2);
    table.jsonb('metadata'); // intent, keywords, etc.
    table.timestamps(true, true);
    table.index('business_id');
    table.index('priority');
    table.index('created_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('calls');
}