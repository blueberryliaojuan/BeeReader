# Database Structure: BeeReader

The BeeReader project uses a relational database built with **MySQL**. It includes three main tables: `users`, `books`, and `user_books`, supporting core features such as user management, book cataloging, and reading list tracking.

---

## 1. `users` Table

This table stores information about registered users.

| Column          | Type         | Description                         |
| --------------- | ------------ | ----------------------------------- |
| id              | VARCHAR(36)  | Primary key (UUID)                  |
| username        | VARCHAR(50)  | User's display name                 |
| email           | VARCHAR(100) | Unique email address                |
| password        | VARCHAR(255) | Hashed password using bcrypt        |
| profile_picture | VARCHAR(255) | Optional link to user profile image |
| created_at      | TIMESTAMP    | Account creation time               |
| updated_at      | TIMESTAMP    | Last update time                    |

---

## 2. `books` Table

This table stores general book information, independent of users.

| Column     | Type         | Description                              |
| ---------- | ------------ | ---------------------------------------- |
| id         | VARCHAR(36)  | Primary key (UUID)                       |
| title      | VARCHAR(255) | Book title                               |
| author     | VARCHAR(255) | Author's name                            |
| genre      | VARCHAR(100) | Book genre or category                   |
| image_url  | VARCHAR(255) | Optional URL to book image               |
| year       | INT          | Year of publication                      |
| is_deleted | BOOLEAN      | Soft delete flag (TRUE = hidden)         |
| deleted_at | DATETIME     | Timestamp of soft delete (if applicable) |

---

## 3. `user_books` Table

This join table connects users with the books they've added to their personal reading list.

| Column   | Type        | Description                         |
| -------- | ----------- | ----------------------------------- |
| id       | VARCHAR(36) | Primary key (UUID)                  |
| user_id  | VARCHAR(36) | Foreign key to `users.id`           |
| book_id  | VARCHAR(36) | Foreign key to `books.id`           |
| added_at | TIMESTAMP   | When the book was added by the user |

- Each `(user_id, book_id)` pair is unique.
- Enforced with `UNIQUE KEY` to prevent duplicates.

---

## Design Highlights

- ✅ Uses **UUIDs** for all primary keys to ensure global uniqueness across users and books.
- ✅ **Soft delete** mechanism in the `books` table preserves data integrity.
- ✅ Scalable structure for tracking multiple users and their personalized reading histories.
- ✅ Relational design supports flexible querying and future feature expansion.

---

This structure supports BeeReader’s core features: secure user accounts, personalized reading lists, and scalable book data management.
