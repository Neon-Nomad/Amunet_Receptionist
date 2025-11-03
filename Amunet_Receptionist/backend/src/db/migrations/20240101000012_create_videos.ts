import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('videos', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE');
    table.text('prompt').notNullable();
    table.string('video_url', 500);
    table.enum('engine', ['gemini', 'sora']).defaultTo('gemini');
    table.string('aspect_ratio', 10); // 16:9, 9:16
    table.integer('duration'); // seconds
    table.enum('status', ['processing', 'completed', 'failed']).defaultTo('processing');
    table.timestamps(true, true);
    table.index('business_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('videos');
}