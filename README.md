# BeeReader

BeeReader is a responsive website designed for students to log and track the books they read. It helps users stay organized and monitor their reading progress effectively, offering a seamless way to maintain a reading log.

---

## Features

### 1. Responsive Design

The website is mobile-friendly and adapts to various screen sizes.

### 2. Express for API and Server-Side Rendering

- Express serves as both the API server and the framework for rendering server-side pages.
- Running `npm run dev` starts the server, making the application accessible at [http://localhost:3000/home](http://localhost:3000/home).

### 3. Improved Logging with Morgan

- Morgan is integrated to enhance console logs in the Express server.
- Custom log styles, including icons and ASCII art, make the logs more engaging and informative.

### 4. MySQL Database with Connection Pooling

- The application uses a MySQL database.
- A connection pool efficiently handles incoming requests, ensuring scalability.
- database: "BeeReader", user: "beeuser", password: "beeuser",

### 5. EJS Templating Engine

- EJS is used to render server-side pages dynamically.
- The homepage fetches all book data using the `getAllBooks` API and renders it in EJS format.

### 6. Soft Delete Mechanism

- The Delete button sends a request to the delete API, updating the database to perform a soft delete.
- The `isDeleted` column is set to `1`, and a timestamp is recorded in the `deletedAt` column.

### 7. Adding New Books

- The "Add a New Book" button redirects users to the `addNewBook` page.
- Each new book is assigned a unique identifier using the UUID middleware, ensuring consistency and ease of management.

### 8. File Uploads with Multer

- Multer handles file uploads, with files stored in the `public/images` directory.
- This functionality is optional.

### 9. Passward security

-- Frontend - Submit the raw (plaintext) password directly to the server over HTTP
-- Backend - Use bcrypt.hash(password) to securely hash the password before storing it in the database during signup
-- Backend - Use bcrypt.compare(password, hashedPassword) to verify the submitted password against the stored hash during login.

---

## Functionality Overview

- **APIs**

  - APIs for fetching, deleting (soft delete), and adding books are implemented and tested using Postman.
  - APIs for fetching a book by ID or updating a book exist but lack corresponding front-end pages.

- **Soft Delete**

  - Records are not permanently removed. Instead, they are marked as deleted.

- **File Uploads**
  - File uploads enhance the system's ability to associate images with books.

---

## Future Development

If additional requirements arise in Assignment 2, I will expand the project by:

- Developing new APIs.
- Creating corresponding front-end pages for currently unsupported features like fetching a book by ID and updating books.

---

## Repository

The complete source code for BeeReader is available on GitHub:  
[https://github.com/blueberryliaojuan/BeeReader](https://github.com/blueberryliaojuan/BeeReader)

---

## Running the Application

First of all, we need to make sure the database is working!!!

1. Clone the repository:
   ```bash
   git clone https://github.com/blueberryliaojuan/BeeReader.git
   cd BeeReader
   ```
2. Install dependencies:
   npm i
3. Start the server(make sure the database is on):
   npm run dev (script for "nodemon app.js")
4. Open your browser and navigate to: http://localhost:3000/home

## Technical Highlights

- UUID Middleware
  Ensures unique IDs for all book entries.
- EJS Rendering
  Dynamically fetches and displays data.
- Multer for File Uploads
  Handles image uploads efficiently.
- Soft Delete
  Preserves data integrity by marking records as deleted instead of removing them.
