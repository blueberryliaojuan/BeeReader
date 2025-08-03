// resetDB.js
const db = require("./dbConfig");

function resetTables() {
  const dropTables = `
    DROP TABLE IF EXISTS user_books;
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS users;
  `;

  const createUsersTable = `
    CREATE TABLE users (
      id VARCHAR(36) PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      profile_picture VARCHAR(255),
      phone VARCHAR(20),
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const createBooksTable = `
    CREATE TABLE books (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      genre VARCHAR(100),
      image_url VARCHAR(255),
      year INT NOT NULL,
      is_deleted BOOLEAN DEFAULT FALSE,
      deleted_at DATETIME DEFAULT NULL
    );
  `;

  const createUserBooksTable = `
    CREATE TABLE user_books (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      book_id VARCHAR(36) NOT NULL,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY unique_user_book (user_id, book_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (book_id) REFERENCES books(id)
    );
  `;

  db.connection(dropTables, [], (err) => {
    if (err) return console.error("❌ Failed to drop tables:", err);
    console.log("✅ Tables dropped successfully");

    db.connection(createUsersTable, [], (err) => {
      if (err) return console.error("❌ Failed to create 'users' table:", err);
      console.log("✅ 'users' table created successfully");

      db.connection(createBooksTable, [], (err) => {
        if (err)
          return console.error("❌ Failed to create 'books' table:", err);
        console.log("✅ 'books' table created successfully");

        db.connection(createUserBooksTable, [], (err) => {
          if (err)
            return console.error(
              "❌ Failed to create 'user_books' table:",
              err
            );
          console.log("✅ 'user_books' table created successfully");
          console.log("🎉 Database reset complete!");
        });
      });
    });
  });
}

resetTables();
