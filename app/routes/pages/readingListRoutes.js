const express = require("express");
const readingListRouter = express.Router();

// Login Page
readingListRouter.get("/", (req, res) => {
  const user = req.session.user;
  console.log("user", user);
  res.render("readingList", {
    title: "Reading List Page",
    data: {
      title: "Reading List Page",
    },
    userName: user.username,
    profilePicture: user.profile_picture,
  });
});
module.exports = readingListRouter;
