/**
 * @file bookApiRouter.js
 * @description
 * Express API router for managing book resources.
 * Supports CRUD operations for books including optional cover image upload.
 * Utilizes custom upload middleware (multer) to handle single file upload with field name "cover".
 *
 * Routes:
 *  POST   /api/books        - Create a new book with optional cover image upload
 *  GET    /api/books        - Search or list all books (with optional search query)
 *  GET    /api/books/:id    - Get details of a specific book by ID
 *  PUT    /api/books/:id    - Update a book by ID, optionally updating the cover image
 *  DELETE /api/books/:id    - Soft delete a book by ID
 */

const upload = require("../../../utils/storage.js");
const bookController = require("../../controllers/bookController.js");
const express = require("express");
const bookApiRouter = express.Router();

// Create a new book (with optional cover image upload)
bookApiRouter.post("/", upload.single("cover"), bookController.createBook);

// Search or list all books
bookApiRouter.get("/", bookController.searchBook);

// Get book details by ID
bookApiRouter.get("/:id", bookController.getBookById);

// Update book by ID with optional cover image upload
bookApiRouter.put("/:id", upload.single("cover"), bookController.updateBook);

// Soft delete book by ID
bookApiRouter.delete("/:id", bookController.deleteBook);

module.exports = bookApiRouter;
