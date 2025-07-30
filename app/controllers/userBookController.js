const userBookService = require("../services/userBookService.js");
const userBookController = {
  async getUserReadingList(req, res) {
    console.log("====================================");
    console.log("userBookController-getUserReadingList");
    console.log("************SID:", req.sessionID);
    console.log("Session Object:", req.session);

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({
        state: "0",
        msg: "Unauthorized access",
      });
    }

    try {
      const results = await userBookService.getUserReadingList(user.id);
      res.status(200).json({
        state: "1",
        msg: "Query successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    } catch (err) {
      console.error("Query failed:", err);

      res.status(500).json({
        state: "0",
        msg: "Database query failed",
        error: err.message,
      });
    }
  },

  async addToReadingList(req, res) {
    console.log("====================================");
    console.log("userBookController-addToReadingList");
    console.log("req.body", req.body);

    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
      return res.status(400).json({ message: "no user_id or book_id" });
    }

    try {
      const results = await userBookService.addToReadingList(user_id, book_id);
      res.status(201).json({
        state: "1",
        msg: "addToReadingList successful",
        data: results,
      });
    } catch (err) {
      console.error("addToReadingList failed:", err);
      if (
        err.code === "ER_DUP_ENTRY" ||
        err.message.includes("already in your reading list")
      ) {
        return res.status(400).json({
          state: "0",
          msg: "This book is already in your reading list.",
        });
      }

      // 其他错误返回 500
      res.status(500).json({
        state: "0",
        msg: "Internal Server Error",
        error: err.message,
      });
    }
  },

  async removeFromReadingList(req, res) {
    console.log("====================================");
    console.log("userBookController - removeFromReadingList");
    console.log("req.params", req.params);
    console.log("====================================");

    const userId = req.session.user?.id;
    const bookId = req.params.bookId;

    if (!userId || !bookId) {
      return res.status(400).json({
        state: "0",
        msg: "Missing user ID or book ID",
      });
    }

    try {
      const result = await userBookService.removeFromReadingList(
        userId,
        bookId
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          state: "0",
          msg: "Book not found in reading list",
        });
      }

      res.status(200).json({
        state: "1",
        msg: "Book removed from reading list",
      });
    } catch (err) {
      console.error("removeFromReadingList failed:", err);
      res.status(500).json({
        state: "0",
        msg: "Failed to remove book",
        error: err.message,
      });
    }
  },
};

module.exports = userBookController;
