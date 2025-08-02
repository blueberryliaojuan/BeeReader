/**
 * @file userBookApiRouter.js
 * @description
 * Express API router for managing user's reading list.
 * Defines routes for retrieving, adding, and removing books in the user's reading list.
 * Delegates business logic to userBookController.
 *
 * Routes:
 *  GET    /api/userBooks/           - Retrieve current user's reading list
 *  POST   /api/userBooks/           - Add a book to user's reading list
 *  DELETE /api/userBooks/:bookId    - Remove a book from user's reading list by book ID
 */

const express = require("express");
const userBookApiRouter = express.Router();
const userBookController = require("../../controllers/userBookController");

// Retrieve user's reading list
userBookApiRouter.get("/", userBookController.getUserReadingList);

// Add a book to the reading list
userBookApiRouter.post("/", userBookController.addToReadingList);

// Remove a book from the reading list by book ID
userBookApiRouter.delete("/:bookId", userBookController.removeFromReadingList);

module.exports = userBookApiRouter;
