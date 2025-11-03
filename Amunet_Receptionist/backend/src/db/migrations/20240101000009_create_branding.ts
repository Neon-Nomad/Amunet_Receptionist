import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('branding', (table) => {
    table.uuid('business_id').primary().references('id').inTable('businesses').onDelete('CASCADE');
    table.string('color_hex', 7).defaultTo('#9D00FF');
    table.string('logo_url', 500);
    table.string('voice_style', 50).defaultTo('professional'); // professional, friendly, energetic
    table.text('greeting_script');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('branding');
}