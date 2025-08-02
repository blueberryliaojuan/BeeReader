# BeeReader 📚🐝

## 1. Project Overview

**BeeReader** is a website designed for students to log and track the books they read. It allows each student to register, log in securely, and manage their own reading records. The app is built with **Node.js** and **Express**, uses **MySQL** as the database, and renders views with **EJS** (server-side rendering).

---

## 2. Repository

The complete source code for **BeeReader** is available on GitHub:

🔗 [https://github.com/blueberryliaojuan/BeeReader](https://github.com/blueberryliaojuan/BeeReader)

## 3.Running the Application

### Prerequisites

- **Node.js** installed on your machine
- **MySQL** server running locally or accessible remotely

### Steps

1. **Create the database and user**

   Open your MySQL client and execute the following SQL commands to create the database, user, and grant privileges:

   ```sql
   CREATE DATABASE IF NOT EXISTS beereader_dev DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE beereader_dev;

   CREATE USER 'beereader'@'localhost' IDENTIFIED BY 'beereader';

   GRANT ALL PRIVILEGES ON beereader_dev.* TO 'beereader'@'localhost';

   FLUSH PRIVILEGES;
   ```

2. **Import the database schema**
   Import the provided SQL file (beereader_dev.sql) into the newly created beereader_dev database.
3. **Install dependencies**
   Open your terminal, navigate to the project directory, and run: npm i
4. **Set the database port for your environment**

   - Locate the `dbconfig.js` file in the `config` folder.
   - If you are using **MAMP on macOS (iOS)**, set the port to `8889`.
   - If you are using **MAMP on Windows** , set the port to `3306`.

5. **Run the Server**
   npm run dev
6. **Open**
   Navigate to http://localhost:3000/ in your browser.

## 3. Key Features

## 4. Technologies Used

- **Node.js** — JavaScript runtime environment for building the backend server.
- **Express.js** — Web framework used both for building RESTful APIs and rendering server-side pages with EJS.
- **MySQL** — Relational database system to store users, books, and related data, accessed via a connection pool.
- **EJS (Embedded JavaScript templates)** — Server-side templating engine to dynamically render HTML views.
- **express-session** — Middleware to manage user sessions and cookies for authentication.
- **bcrypt** — Library to securely hash user passwords before storing them in the database, and to verify passwords at login.
- **express-validator** — Middleware to validate and sanitize incoming form data on the server side, ensuring data integrity and security.
- **dotenv** — Loads environment variables from a `.env` file to keep sensitive data like DB credentials and session secrets outside source code.
- **Morgan** — HTTP request logger middleware for better server logging with custom formatting.
- **UUID** — Generates universally unique identifiers (UUIDs) for new users, books, and reading list entries to ensure unique and consistent IDs.
- **Multer** — Handles file uploads such as book cover images, storing them securely on the server (optional feature).
- **Soft Delete Mechanism** — Instead of permanently deleting records, marks them as deleted with an `isDeleted` flag and timestamp for data integrity.

## 5. Database Structure

- please refer to DATABASE.md and SQL.md

## 6. File Structure

- Please refer to DIRECTORY.md
