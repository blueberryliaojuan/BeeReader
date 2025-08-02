/**
 * @file index.js
 * @description Central routing entry point for BeeReader Express app.
 *              Mounts page-level and API-level routers and handles unmatched routes (404).
 * @author Juan Liao
 * @created 2025-07-31
 */

// -------------------- Import Page Routes --------------------
const loginRouter = require("./pages/loginRouter");
const libraryRouter = require("./pages/libraryRouter");
const readingListRouter = require("./pages/readingListRouter");
const addNewBookRouter = require("./pages/addNewBookRouter");
const editBookRouter = require("./pages/editBookRouter");
const accountRouter = require("./pages/accountRouter");

// -------------------- Import API Routes --------------------
const userApiRouter = require("./api/userApiRouter");
const bookApiRouter = require("./api/bookApiRouter");
const userBookApiRouter = require("./api/userBookApiRouter");

/**
 * @function
 * @param {object} app - Express application instance
 * @description Attaches all route handlers to the app.
 */

const ensureAuthenticated = require("../../middlewares/authMiddleware");
module.exports = (app) => {
  // -------------------- Mount Page Routes --------------------
  // Serve client-facing HTML pages
  app.use("/login", loginRouter);
  // Protect routes that require login
  app.use("/readingList", ensureAuthenticated, readingListRouter);
  app.use("/library", ensureAuthenticated, libraryRouter);
  app.use("/addNewBook", ensureAuthenticated, addNewBookRouter);
  app.use("/editBook", ensureAuthenticated, editBookRouter);
  app.use("/account", ensureAuthenticated, accountRouter);

  // -------------------- Mount API Routes --------------------
  // Serve backend API endpoints (JSON response)
  app.use("/api/users", userApiRouter);
  app.use("/api/books", bookApiRouter);
  app.use("/api/userBooks", userBookApiRouter);

  // -------------------- Fallback: 404 Not Found --------------------
  app.use((req, res, next) => {
    // If an API route is not matched, respond with JSON
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "API not found 🙅" });
    }

    // Otherwise, render a 404 HTML page
    res.status(404).render("404", { title: "Page Not Found 🙅" });
  });
};
