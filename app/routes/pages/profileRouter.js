/**
 * @file profileRouter.js
 * @description
 * Express router module for profile-related routes.
 *
 * @module routers/profileRouter
 */

const express = require("express");
const profileRouter = express.Router();

/**
 * GET /
 * Route to render the profile page.
 *
 * Path: GET /profile
 *
 * Response:
 * - Renders the 'profile' template
 * - Passes page title and data to the view
 */
profileRouter.get("/", (req, res) => {
  //get current user info
  console.log("req.session.user", req.session?.user);

  res.render("profile", {
    title: "Profile Page",
    data: { title: "profile management" },
    user: req.session.user,
  });
});

module.exports = profileRouter;
