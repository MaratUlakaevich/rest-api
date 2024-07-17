import db from './db';

const createTables = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role INTEGER NOT NULL,
        confirmed BOOLEAN DEFAULT FALSE,
        confirmationCode TEXT
      );
    `);
    await db.none(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        publicationDate DATE NOT NULL,
        genres TEXT[] NOT NULL
      );
    `);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

createTables();