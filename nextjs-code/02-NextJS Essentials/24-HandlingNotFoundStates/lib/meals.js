import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed'); // Throws an error to simulate how handling errors looks like.
  return db.prepare('SELECT * FROM meals').all();
}