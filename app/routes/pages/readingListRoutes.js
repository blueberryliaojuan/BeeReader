const express = require("express");
const readingListRouter = express.Router();
const axios = require("axios");

readingListRouter.get("/", async (req, res) => {
  const user = req.session.user;
  console.log("user in readingListRouter", user);

  if (!user) {
    return res.redirect("/login");
  }

  try {
    const cookie = req.headers.cookie;

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

    // console.log("bookData", bookData);
    // console.log("userBookData", userBookData);

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
