import connect, { sql } from '@databases/sqlite';

// Creates an in-memory SQLite DB. Note that this DB does not write to disk.
export const db = connect();

// Method to initialize the DB when the app starts
export async function dbInit() {
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS todo (
      todo_id INTEGER PRIMARY KEY,
      label VARCHAR NOT NULL,
      done BOOLEAN NOT NULL DEFAULT FALSE
    );
  `);
}