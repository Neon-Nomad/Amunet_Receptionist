import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE');
    table.string('platform', 50); // instagram, facebook, google_business
    table.text('caption');
    table.string('media_url', 500);
    table.timestamp('scheduled_at');
    table.enum('status', ['draft', 'scheduled', 'posted', 'failed']).defaultTo('draft');
    table.string('external_post_id', 100); // ID from platform
    table.timestamps(true, true);
    table.index('business_id');
    table.index('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('posts');
}