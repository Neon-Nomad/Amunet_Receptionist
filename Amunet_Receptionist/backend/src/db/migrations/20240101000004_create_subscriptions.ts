import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subscriptions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE');
    table.enum('plan', ['core', 'growth', 'elite']).notNullable();
    table.enum('status', ['active', 'past_due', 'canceled', 'trialing']).defaultTo('trialing');
    table.string('stripe_customer_id', 100);
    table.string('stripe_subscription_id', 100);
    table.timestamp('current_period_end');
    table.timestamps(true, true);
    table.index('business_id');
    table.index('stripe_customer_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('subscriptions');
}