const express = require("express");
const readingListRouter = express.Router();

// Login Page
readingListRouter.get("/", (req, res) => {
  const user = req.session.user;
  console.log("user", user);

  fetch("http://localhost:3000/api/books") //
    .then((response) => {
      // check response status
      if (response.status != 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the response into Javascript object
    })
    .then((result) => {
      res.render("readingList", {
        title: "library Page",
        libraryBooks: result.data,
        userName: user.username,
        profilePicture: user.profile_picture || "/images/userPic.png", //if no image, use a default
      });
    })
    .catch((error) => {
      console.error("Failed to fetch books:", error);
    });
});

//get all the books from library
//   Promise.all([
//     fetch("http://localhost:3000/api/books"),
//     fetch("http://localhost:3000/api/user_books"),
//   ])
//     .then(async ([bookRes, userBookRes]) => {
//       // check response status
//       if (bookRes.status !== 200 || userBookRes.status !== 200) {
//         throw new Error(`HTTP error! request failed`);
//       }
//       const bookData = await bookRes.json();
//       const userBookData = await userBookRes.json(); // Parse the response into javascript object
//       res.render("readingList", {
//         title: "Reading List Page",
//         data: {
//           title: "Reading List Page",
//         },
//         libraryBooks: bookData.data,
//         userBooks: userBookData.data,
//         userName: user.username,
//         profilePicture: user.profile_picture,
//       });
//     })

//     .catch((error) => {
//       console.error("Failed to fetch books:", error);
//       res.status(500).send("server error");
//     });
// });
module.exports = readingListRouter;
