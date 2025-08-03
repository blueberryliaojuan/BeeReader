/**
 * @file bookController.js
 * @description
 * Controller layer for handling book-related HTTP requests in the Express application.
 * Implements CRUD operations (Create, Read, Update, Delete) and search functionality
 * by interfacing with the bookService layer. Handles request validation, response formatting,
 * error handling, and logs important debugging information.
 *
 * Features:
 * - Create a new book with optional cover image upload
 * - Retrieve all books or a specific book by ID (supports both query and URL parameters)
 * - Search books by keyword (title or author)
 * - Update existing book data, including optional cover image update
 * - Soft-delete books by marking as deleted (no physical deletion)
 *
 * Response Structure:
 * - JSON format with 'state' (1 for success, 0 for failure),
 *   descriptive 'message', and 'data' containing query results or created records.
 */

const bookService = require("../services/bookService");
const bookController = {
  //postman:body-urlencoded
  async createBook(req, res) {
    console.log("====================================");
    console.log("bookController-createBook");
    console.log("req.body", req.body);
    console.log("req.file:", req.file);
    console.log("====================================");

    try {
      // multer.single("cover") saved file in public/images，and created req.file.filename
      const image_url = req.file ? `/images/${req.file.filename}` : null;

      const data = {
        ...req.body,
        image_url,
      };
      const results = await bookService.createBook(data);
      // Respond with success status and newly created book data
      res.status(201).json({
        state: "1",
        message: "Create book successful",
        data: results,
      });
    } catch (err) {
      // Log error and respond with 500 status and error message
      console.error("Create book failed:", err);
      res.status(500).json({
        state: "0",
        message: "Create book failed",
        error: err.message,
      });
    }
  },

  async getAllBooks(req, res) {
    console.log("====================================");
    console.log("bookController-getAllBooks");
    console.log("====================================");

    console.log(req.session);

    //Handle Query Parameters in getAllBooks, on condition user send id as query parameter by mistake
    //Check for query parameter 'id' and forward to getBookById logic
    if (req.query.id) {
      return this.getBookById({ params: { id: req.query.id } }, res);
    }
    try {
      const results = await bookService.getAllBooks();
      // Send successful JSON response with list of books
      res.status(200).json({
        state: "1",
        message: "Query successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    } catch (err) {
      // Log error and send failure JSON response
      console.error("Query failed:", err);
      // 'res' is the Express response object
      // .json Convert JavaScript object to JSON and send it as the HTTP response
      res.status(500).json({
        state: "0",
        message: "Database query failed",
        error: err.message,
      });
    }
  },

  /**
   * Search books by keyword, or forward to getBookById if query id is provided.
   * Logs session info for debugging.
   */
  async searchBook(req, res) {
    console.log("====================================");
    console.log("bookController-searchBook");
    console.log("************SID:", req.sessionID);
    console.log("Session Object:", req.session);
    console.log("====================================");
    //Handle Query Parameters in searchBook, on condition user send id as query parameter by mistake
    //Check for query parameter 'id' and forward to getBookById logic
    if (req.query.id) {
      return this.getBookById({ params: { id: req.query.id } }, res);
    }
    try {
      const { search } = req.query;
      const results = await bookService.searchBook(search);
      res.status(200).json({
        state: "1",
        message: "Query successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    } catch (err) {
      console.error("Query failed:", err);
      // 'res' is the Express response object
      // .json Convert JavaScript object to JSON and send it as the HTTP response
      res.status(500).json({
        state: "0",
        message: "Database query failed",
        error: err.message,
      });
    }
  },

  //Query Parameters (req.query)
  //In {{base_url}}/books/?id=123, id is part of the query string.
  //This matches the /books route and triggers getAllBooks because using query parameters, not URL parameters.

  //URL Parameters (req.params)
  //In {{base_url}}/books/123, 123 is part of the path,
  //the route /books/:id will match, triggering getBookById.

  /**
   * Get a single book by id from URL param.
   * Returns the book data if found, else null.
   */
  async getBookById(req, res) {
    console.log("====================================");
    console.log("bookController-getBookById");
    console.log("req.params", req.params);
    console.log("====================================");
    try {
      const id = req.params.id;
      const results = await bookService.getBookById(id);
      res.status(200).json({
        state: "1",
        message: "Query successful",
        data: results,
      });
    } catch (err) {
      console.error("Query by id failed:", err);
      res.status(500).json({
        state: "0",
        message: "Query by id failed",
        error: err.message,
      });
    }
  },
  async updateBook(req, res) {
    console.log("====================================");
    console.log("bookController-updateBook");
    console.log("req.params", req.params);
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    console.log("====================================");

    const id = req.params.id;
    const image_url = req.file?.filename
      ? `/images/${req.file.filename}`
      : req.body.existingCover;
    const data = {
      ...req.body,
      image_url,
    };
    console.log("data", data);
    try {
      if (!data.title || !data.author || !data.year) {
        return res.status(400).json({
          state: "0",
          message: "Invalid input: 'title', 'author', 'year' are required.",
        });
      }
      const results = await bookService.updateBook(id, data);
      res.status(200).json({
        state: "1",
        message: "Update by id successful",
        data: results,
      });
    } catch (err) {
      console.error("Update by id failed:", err);
      res.status(500).json({
        state: "0",
        message: "Update by id failed",
        error: err.message,
      });
    }
  },
  async deleteBook(req, res) {
    console.log("====================================");
    console.log("bookController-deleteBook");
    console.log("req.params", req.params);
    console.log("====================================");
    try {
      const id = req.params.id;
      const results = await bookService.deleteBook(id);
      if (results.affectedRows === 0) {
        return res.status(404).json({
          state: "0",
          message: `No book found with id: ${id}`,
        });
      }
      res.status(200).json({
        state: "1",
        message: "Book soft deleted successfully.",
        data: results,
      });
    } catch (err) {
      console.error("Soft delete by id failed:", err);
      res.status(500).json({
        state: "0",
        message: "Database error: Soft delete by id failed.",
        error: err.message,
      });
    }
  },
};

module.exports = bookController;
