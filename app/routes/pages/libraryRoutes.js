const express = require("express");
const libraryRouter = express.Router();

//Library Page
libraryRouter.get("/", (req, res) => {
  const user = req.session.user;
  console.log("user", user);
  //get all books info
  fetch("http://localhost:3000/api/books") //
    .then((response) => {
      // check response status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the response into JSON forma
    })
    .then((result) => {
      // console.log("Books data:", result);
      //res.render(view, data)
      //"library" is the view file name
      res.render("library", {
        title: "library Page",
        data: result.data,
        userName: user.username,
        profilePicture: user.profile_picture || "/images/userPic.png", //if no image, use a default
      });
    })
    .catch((error) => {
      console.error("Failed to fetch books:", error);
    });
});

module.exports = libraryRouter;
