const express = require("express");
const router = express.Router();

//Home Page
router.get("/", (req, res) => {
  fetch("http://localhost:3000/api/books") //
    .then((response) => {
      // check response status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the response into JSON forma
    })
    .then((result) => {
      console.log("Books data:", result);
      //res.render(view, data)
      //"home" is the view file name
      res.render("home", {
        title: "Home Page",
        data: result.data,
      });
    })
    .catch((error) => {
      console.error("Failed to fetch books:", error);
    });
});

module.exports = router;
