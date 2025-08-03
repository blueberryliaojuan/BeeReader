/**
 * @file editBookRouter.js
 * @description
 * This module defines the router for the Edit Book page.
 * It fetches book details by book ID and renders the edit page with that data.
 *
 * Routes:
 * GET /:id - Fetch book details by ID and render the edit book page.
 */

const express = require("express");
const editBookRouter = express.Router();

/**
 * GET /:id
 * Fetches the book data from the API using the book ID from the URL parameter,
 * then renders the "editBook" view template passing the book data for editing.
 */
editBookRouter.get("/:id", (req, res) => {
  const bookId = req.params.id;

  fetch(`/api/books/${bookId}`, {
    credentials: "include",
  })
    .then((res) => res.json()) // Parse response as JSON
    .then((result) => {
      console.log("result", result);
      res.render("editBook", {
        title: "Edit Book Page",
        data: result.data,
      });
    })
    .catch((error) => {
      console.error("Failed to fetch books:", error);
      res.status(500).send("Failed to load book data");
    });
});

module.exports = editBookRouter;
