/**
 * @file addNewBookRouter.js
 * @description
 * This module defines the router for the "Add New Book" page.
 * It handles rendering the page where users can input details to add a new book.
 *
 * Routes:
 * GET / - Render the "addNewBook" view template.
 */

const express = require("express");
const addNewBookRouter = express.Router();

/**
 * GET /
 * Renders the "addNewBook" page with initial data for adding a new book.
 */
addNewBookRouter.get("/", (req, res) => {
  res.render("addNewBook", {
    title: "Add New Book Page",
    data: { title: "Add a new book" },
  });
});

module.exports = addNewBookRouter;
