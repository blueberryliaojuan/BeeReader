/**
 * @file userBookController.js
 * @description
 * Controller layer for managing user's reading list in the Express application.
 * Provides endpoints to get the user's reading list, add books to it, and remove books from it.
 *
 * Responsibilities:
 * - Validate session and user authentication before performing actions.
 * - Handle input validation and error handling with appropriate HTTP status codes.
 * - Interact with the userBookService layer for database operations.
 * - Log relevant debugging and session info to trace requests and errors.
 *
 * Response structure:
 * - JSON responses contain 'state' (1 for success, 0 for failure), descriptive 'message',
 *   and 'data' where applicable, such as the reading list array or operation results.
 */

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
        message: "Unauthorized access",
      });
    }

    try {
      const results = await userBookService.getUserReadingList(user.id);
      res.status(200).json({
        state: "1",
        message: "Query successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    } catch (err) {
      console.error("Query failed:", err);

      res.status(500).json({
        state: "0",
        message: "Database query failed",
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
      return res.status(400).json({
        state: "0",
        message: "Missing user_id or book_id",
      });
    }

    try {
      const results = await userBookService.addToReadingList(user_id, book_id);
      res.status(201).json({
        state: "1",
        message: "addToReadingList successful",
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
          message: "This book is already in your reading list.",
        });
      }

      // Other errors return 500
      res.status(500).json({
        state: "0",
        message: "Internal Server Error",
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
        message: "Missing user ID or book ID",
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
          message: "Book not found in reading list",
        });
      }

      res.status(200).json({
        state: "1",
        message: "Book removed from reading list",
      });
    } catch (err) {
      console.error("removeFromReadingList failed:", err);
      res.status(500).json({
        state: "0",
        message: "Failed to remove book",
        error: err.message,
      });
    }
  },
};

module.exports = userBookController;
