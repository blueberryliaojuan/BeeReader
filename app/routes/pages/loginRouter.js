/**
 * @file loginRouter.js
 * @description
 * Express router module handling the login page route.
 * Provides the route to render the login page view.
 *
 * @module routers/loginRouter
 */

const express = require("express");
const loginRouter = express.Router();

/**
 * GET /
 * Renders the login page.
 *
 * Route: GET /login
 *
 * Response:
 * - Renders 'login' template with title and page data.
 */
loginRouter.get("/", (req, res) => {
  res.render("login", {
    title: "Login Page",
    data: { title: "Log in" },
  });
});

module.exports = loginRouter;
