// initDB.js
const db = require("./dbConfig");

function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createBooksTable = `
    CREATE TABLE IF NOT EXISTS books (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255),
      description TEXT,
      cover_url TEXT,
      user_id VARCHAR(36),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const createFavoritesTable = `
    CREATE TABLE IF NOT EXISTS favorites (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36),
      book_id VARCHAR(36),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    );
  `;

  db.connection(createUsersTable, [], (err) => {
    if (err) return console.error("❌ Failed to create 'users':", err);
    console.log("✅ 'users' table created");

    db.connection(createBooksTable, [], (err) => {
      if (err) return console.error("❌ Failed to create 'books':", err);
      console.log("✅ 'books' table created");

      db.connection(createFavoritesTable, [], (err) => {
        if (err) return console.error("❌ Failed to create 'favorites':", err);
        console.log("✅ 'favorites' table created");
      });
    });
  });
}

createTables();
