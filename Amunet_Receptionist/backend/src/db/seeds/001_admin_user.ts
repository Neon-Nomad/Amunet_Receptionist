import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing
  await knex('users').del();

  // Insert admin user
  const hash = await bcrypt.hash('admin123', 10);
  
  await knex('users').insert([
    {
      email: 'admin@amunet.ai',
      hash,
      role: 'admin',
    },
  ]);
}