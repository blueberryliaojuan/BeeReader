const express = require("express");
const axios = require("axios");
const libraryRouter = express.Router();

libraryRouter.get("/", async (req, res) => {
  const user = req.session.user;
  console.log("user in library page, req.session.user", user);

  try {
    const bookRes = await axios.get("http://localhost:3000/api/books", {
      headers: {
        cookie: req.headers.cookie,
      },
    });

    const result = bookRes.data;

    res.render("library", {
      title: "library Page",
      data: result.data,
      userName: user.username,
      profilePicture: user.profile_picture || "/images/userPic.png", // 如果没有图片，使用默认
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);
    res.status(500).send("Server error");
  }
});

module.exports = libraryRouter;
