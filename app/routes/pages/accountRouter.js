/**
 * @file accountRouter.js
 * @description
 * Express router module for account-related routes.
 *
 * @module routers/accountRouter
 */

const express = require("express");
const accountRouter = express.Router();

/**
 * GET /
 * Route to render the account page.
 *
 * Path: GET /account
 *
 * Response:
 * - Renders the 'account' template
 * - Passes page title and data to the view
 */
accountRouter.get("/", (req, res) => {
  //get current user info
  console.log("req.session.user", req.session?.user);

  res.render("account", {
    title: "Account Page",
    data: { title: "account management" },
    user: req.session.user,
  });
});

module.exports = accountRouter;
