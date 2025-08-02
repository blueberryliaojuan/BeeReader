/**
 * @file libraryRouter.js
 * @description
 * Express router module for the library page.
 * Handles fetching book data from the API and rendering the library view.
 *
 * @module routers/libraryRouter
 */

const express = require("express");
const axios = require("axios");
const libraryRouter = express.Router();

/**
 * GET /
 * Library page route handler.
 *
 * Checks the current user session and fetches all books from the API.
 * Renders the 'library' template with book data and user information.
 *
 * Route: GET /library
 *
 * Response:
 * - Renders 'library' page with:
 *    - title: Page title
 *    - data: Array of books from API
 *    - userName: Username from session
 *    - profilePicture: User's profile picture or default image
 *
 * Errors:
 * - Logs and returns HTTP 500 with "Server error" on API fetch failure.
 */
libraryRouter.get("/", async (req, res) => {
  const user = req.session.user;
  console.log("user in library page, req.session.user", user);

  try {
    const bookRes = await axios.get("http://localhost:3000/api/books", {
      headers: {
        cookie: req.headers.cookie,
      },
    });

    const result = bookRes.data;

    res.render("library", {
      title: "library Page",
      data: result.data,
      userName: user.username,
      profilePicture: user.profile_picture || "/images/userPic.png", // fallback image if no profile picture
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    res.status(500).send("Server error");
  }
});

module.exports = libraryRouter;
