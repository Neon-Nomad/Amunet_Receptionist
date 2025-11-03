import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('services_selected', (table) => {
    table.uuid('business_id').primary().references('id').inTable('businesses').onDelete('CASCADE');
    table.boolean('receptionist').defaultTo(false);
    table.boolean('sms').defaultTo(false);
    table.boolean('social').defaultTo(false);
    table.boolean('newsletter').defaultTo(false);
    table.boolean('studio').defaultTo(false);
    table.boolean('motion').defaultTo(false);
    table.boolean('roi').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('services_selected');
}