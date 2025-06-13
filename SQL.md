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
