# books

- CREATE TABLE Books (
  id VARCHAR(36) PRIMARY KEY, -- Unique identifier for the book
  title VARCHAR(255) NOT NULL, -- Book title
  author VARCHAR(255) NOT NULL, -- Book author
  genre VARCHAR(100), -- Book genre
  imageUrl VARCHAR(255), -- URL or path to the book's image
  year INT NOT NULL, -- Year of publication
  review TEXT, -- User's review of the book
  rating TINYINT CHECK (rating BETWEEN 1 AND 5), -- Rating (1-5 scale)
  status INT DEFAULT 0 -- Reading status: 0 = Unread, 1 = Reading, 2 = Completed
  );
- INSERT INTO Books (id, title, author, genre, imageUrl, year, review, rating, status)
  VALUES
  ('1', 'The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '/images/gatsby.jpg', 1925,
  'A classic tale of love and tragedy.', 5, 2),
  ('2', '1984', 'George Orwell', 'Dystopian', '/images/1984.jpg', 1949,
  'A thought-provoking book on totalitarianism.', 4, 2),
  ('3', 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', '/images/mockingbird.jpg', 1960,
  'An insightful story about justice and morality.', NULL, 1);
- Soft delete
  ALTER TABLE Books ADD COLUMN isDeleted BOOLEAN DEFAULT FALSE;
  ALTER TABLE Books ADD COLUMN deletedAt DATETIME DEFAULT NULL;

# users

- CREATE TABLE Users (
  id VARCHAR(36) PRIMARY KEY, -- Unique identifier for each user (UUID)
  username VARCHAR(50) NOT NULL, -- Username, unique for each user
  email VARCHAR(100) UNIQUE NOT NULL, -- User's email address
  password VARCHAR(255) NOT NULL, -- Hashed password
  profile_picture VARCHAR(255), -- URL for the user's profile picture
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date of account creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Last updated
  );

# userbooks

- CREATE TABLE UserBooks (
  id VARCHAR(36) PRIMARY KEY, --uuid
  user_id VARCHAR(36) NOT NULL, -- foreign key, user
  book_id VARCHAR(36) NOT NULL, -- foreign key, book
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_book (user_id, book_id), -- to avoid add in the same book
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES Books(id) ON DELETE CASCADE
  );

# reading records

- CREATE TABLE ReadingRecords (
  id VARCHAR(36) PRIMARY KEY, -- Unique identifier for the record (UUID)
  user_id VARCHAR(36) NOT NULL, -- Foreign key referencing the users table
  book_id VARCHAR(36) NOT NULL, -- Foreign key referencing the books table
  status INT NOT NULL DEFAULT 0, -- Reading status (e.g., 0: Not Started, 1: Reading, 2: Finished)
  started_at DATE, -- Date the user started reading the book
  finished_at DATE, -- Date the user finished reading the book
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Last updated
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- Deletes records if user is removed
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE -- Deletes records if book is removed
  );
