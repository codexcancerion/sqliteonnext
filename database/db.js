// database/db.js
import Database from 'better-sqlite3';
const db = new Database('./crud.db', { verbose: console.log });

// Initialize the table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0
  )
`);

export default db;
