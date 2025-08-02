# Create Database

```sql
CREATE DATABASE IF NOT EXISTS beereader_dev DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE beereader_dev;
```

# Create User and Grant Privileges

```sql
-- Create a new user named 'beereader' with password 'beereader'
CREATE USER 'beereader'@'localhost' IDENTIFIED BY 'beereader';

-- Grant all privileges on the 'beereader_dev' database to 'beereader'
GRANT ALL PRIVILEGES ON beereader_dev.* TO 'beereader'@'localhost';

-- Apply the changes immediately
FLUSH PRIVILEGES;
```

# Users Table

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,                            -- unique identifier for each user (UUID)
  username VARCHAR(50) NOT NULL,                         -- username, unique for each user
  email VARCHAR(100) UNIQUE NOT NULL,                    -- user's email address
  password VARCHAR(255) NOT NULL,                        -- hashed password
  profile_picture VARCHAR(255),                          -- URL for the user's profile picture
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,        -- date of account creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- last updated
);
```

# Books Table

```sql
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
```

# User_Books Table

```sql
CREATE TABLE user_books (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  book_id VARCHAR(36) NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_book (user_id, book_id),        -- avoid adding same record
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);
```
