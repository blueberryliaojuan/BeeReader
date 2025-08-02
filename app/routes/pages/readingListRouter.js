/**
 * @file readingListRouter.js
 * @description
 * This module defines the router for the Reading List page.
 * It handles fetching all books and the current user's reading list from the API,
 * and renders the reading list view for authenticated users.
 *
 * Routes:
 * GET / - Render the "readingList" page after fetching data.
 */

const express = require("express");
const readingListRouter = express.Router();
const axios = require("axios");

/**
 * GET /
 * - Checks if the user is authenticated via session.
 * - Fetches all books and user's reading list concurrently via API calls.
 * - Renders the readingList page with fetched data and user info.
 * - Redirects to /login if no user session found.
 * - Handles and logs errors, sending a 500 response on failure.
 */
readingListRouter.get("/", async (req, res) => {
  const user = req.session.user;
  console.log("user in readingListRouter", user);

  if (!user) {
    return res.redirect("/login");
  }

  try {
    const cookie = req.headers.cookie;

    // Fetch all books and user's reading list concurrently
    const [bookRes, userBookRes] = await Promise.all([
      axios.get("http://localhost:3000/api/books", {
        headers: { cookie },
      }),
      axios.get("http://localhost:3000/api/userBooks", {
        headers: { cookie },
      }),
    ]);

    const bookData = bookRes.data;
    const userBookData = userBookRes.data;

    res.render("readingList", {
      title: "Reading List Page",
      data: {
        title: "Reading List Page",
      },
      libraryBooks: bookData.data,
      readingList: userBookData.data,
      userName: user.username,
      profilePicture: user.profile_picture,
      userId: user.id,
    });
  } catch (error) {
    console.error("Failed to fetch books:", error.message);
    res.status(500).send("Server error");
  }
});

module.exports = readingListRouter;
