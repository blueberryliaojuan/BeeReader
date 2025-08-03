// resetDB.js
const db = require("./config/dbConfig");

function executeQuery(sql, desc) {
  return new Promise((resolve, reject) => {
    db.connection(sql, [], (err) => {
      if (err) {
        console.error(`❌ Failed to ${desc}:`, err);
        reject(err);
      } else {
        console.log(`✅ Successfully ${desc}`);
        resolve();
      }
    });
  });
}

async function resetAndSeed() {
  try {
    // 关闭外键检查，删除旧表
    await executeQuery(
      `
      SET FOREIGN_KEY_CHECKS = 0;
      DROP TABLE IF EXISTS user_books;
      DROP TABLE IF EXISTS books;
      DROP TABLE IF EXISTS users;
      SET FOREIGN_KEY_CHECKS = 1;
      `,
      "drop tables"
    );

    // 创建 users 表
    await executeQuery(
      `CREATE TABLE users (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        profile_picture VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );`,
      "create users table"
    );

    // 创建 books 表
    await executeQuery(
      `CREATE TABLE books (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        genre VARCHAR(100),
        image_url VARCHAR(255),
        year INT NOT NULL,
        is_deleted BOOLEAN DEFAULT FALSE,
        deleted_at DATETIME DEFAULT NULL
      );`,
      "create books table"
    );

    // 创建 user_books 表
    await executeQuery(
      `CREATE TABLE user_books (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        book_id VARCHAR(36) NOT NULL,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_book (user_id, book_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (book_id) REFERENCES books(id)
      );`,
      "create user_books table"
    );

    // 插入 users 数据
    await executeQuery(
      `INSERT INTO users (id, username, email, password, profile_picture, created_at, updated_at, phone, address) VALUES
        ('914de188-ac6d-4cb1-9069-db316a6b02be', 'beeReader', 'bee@beereader.com', '$2b$10$jnLj7RVRhoRncEXdCe2mzOYOYhyOQmi19hNY29AecvgcL3IUmKLea', '/images/userPic.png', '2025-07-27 19:44:38', '2025-08-03 03:51:15', '6047249888', '999 bee street, beehive, Vancouver'),
        ('976c410f-9af7-4621-8d9c-ae2c8ea802a2', 'bee1', 'bee1@beereader.com', '$2b$10$MtadspmLNR61J9Fz/K6Wv.kV2BL.k17BoKKYp.aKtnZKoRqyiRj4W', NULL, '2025-07-28 17:01:59', '2025-07-28 17:01:59', NULL, NULL),
        ('d1c97b88-d8f4-43f7-8fd8-c87156ec27f3', 'bee2', 'bee2@beereader.com', '$2b$10$v4aoZqD1P2FiIg8Z1fcdo.llXHzH.ZJrdFPv4XnJraVC71mg0zpcW', NULL, '2025-08-02 04:28:54', '2025-08-02 04:28:54', NULL, NULL);`,
      "insert users data"
    );

    // 插入 books 数据
    await executeQuery(
      `INSERT INTO books (id, title, author, genre, image_url, year, is_deleted, deleted_at) VALUES
        ('1393b346-e24e-434a-a23f-805258fbe374', 'To Kill a Mockingbird', 'Harper Lee', '', '/images/1753677499770-mockingbird.jpg', 1960, 0, NULL),
        ('2ff97b3c-7862-47d6-bf4d-1e98bbd2da48', 'The Catcher in the Rye', 'J.D. Salinger', '', '/images/1753676659318-catcher.jpg', 1951, 0, NULL),
        ('7ef778c2-9e6a-416b-bb23-d7e0b0bb81d3', 'A Tree Grows in Brooklyn', 'Betty Smith', '', '/images/1753677154083-tree.jpg', 1943, 0, NULL),
        ('8981ef05-5c9a-43df-920f-ce246bc9234c', 'test', 'test', NULL, '/images/1753722182849-userPic.png', 1979, 1, '2025-07-28 10:03:10'),
        ('919eae03-ea3d-4f21-886d-b95c3e25f33c', 'Of Mice and Men', 'John Steinbeck', '', '/images/1753677173653-mice.jpg', 1937, 0, NULL),
        ('9abd8891-292c-4ce8-a318-6ecf63fa1269', '1984', 'George Orwell', NULL, '/images/1753649034210-1984.jpg', 1949, 0, NULL);`,
      "insert books data"
    );

    // 插入 user_books 数据
    await executeQuery(
      `INSERT INTO user_books (id, user_id, book_id, added_at) VALUES
        ('69d601e7-ffee-4c70-aa6b-7f03bb42ed55', '914de188-ac6d-4cb1-9069-db316a6b02be', '9abd8891-292c-4ce8-a318-6ecf63fa1269', '2025-07-30 05:55:12'),
        ('be1e0ce3-b0f1-4183-b44a-7c0806206593', 'd1c97b88-d8f4-43f7-8fd8-c87156ec27f3', '919eae03-ea3d-4f21-886d-b95c3e25f33c', '2025-08-02 04:44:22'),
        ('c4f543b4-3a4d-4b92-9e1b-9565069b401f', '914de188-ac6d-4cb1-9069-db316a6b02be', '2ff97b3c-7862-47d6-bf4d-1e98bbd2da48', '2025-07-30 04:46:04');`,
      "insert user_books data"
    );

    console.log("🎉 Database reset and seed completed successfully!");
  } catch (error) {
    console.error("❌ Error during database reset and seed:", error);
  }
}

resetAndSeed();
