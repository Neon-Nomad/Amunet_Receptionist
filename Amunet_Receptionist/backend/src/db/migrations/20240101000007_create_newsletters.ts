import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('newsletters', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE');
    table.string('subject', 255).notNullable();
    table.text('body_html').notNullable();
    table.string('featured_image_url', 500);
    table.enum('send_status', ['draft', 'scheduled', 'sent', 'failed']).defaultTo('draft');
    table.timestamp('scheduled_at');
    table.timestamp('sent_at');
    table.timestamps(true, true);
    table.index('business_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('newsletters');
}