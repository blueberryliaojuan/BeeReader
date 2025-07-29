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
      res.status(201).json({
        state: "1",
        msg: "Create book successful",
        data: results,
      });
    } catch (err) {
      console.error("Create book failed:", err);
      res.status(500).json({
        state: "0",
        msg: "Create book failed",
        error: err.message,
      });
    }
  },
  async getAllBooks(req, res) {
    console.log("====================================");
    console.log("bookController-getAllBooks");
    console.log("====================================");
    //Handle Query Parameters in getAllBooks, on condition user send id as query parameter by mistake
    //Check for query parameter 'id' and forward to getBookById logic
    if (req.query.id) {
      return this.getBookById({ params: { id: req.query.id } }, res);
    }
    try {
      const results = await bookService.getAllBooks();
      res.status(200).json({
        state: "1",
        msg: "Query successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    } catch (err) {
      console.error("Query failed:", err);
      // 'res' is the Express response object
      // .json Convert JavaScript object to JSON and send it as the HTTP response
      res.status(500).json({
        state: "0",
        msg: "Database query failed",
        error: err.message,
      });
    }
  },

  async searchBook(req, res) {
    console.log("====================================");
    console.log("bookController-searchBook");
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
        msg: "Query successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    } catch (err) {
      console.error("Query failed:", err);
      // 'res' is the Express response object
      // .json Convert JavaScript object to JSON and send it as the HTTP response
      res.status(500).json({
        state: "0",
        msg: "Database query failed",
        error: err.message,
      });
    }
  },

  //postman: /books/1393b346-e24e-434a-a23f-805258fbe374

  //Query Parameters (req.query)
  //In {{base_url}}/books/?id=123, id is part of the query string.
  //This matches the /books route and triggers getAllBooks because you're using query parameters, not URL parameters.

  //URL Parameters (req.params)
  //In {{base_url}}/books/123, 123 is part of the path,
  //the route /books/:id will match, triggering getBookById.
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
        msg: "Query successful",
        data: results,
      });
    } catch (err) {
      console.error("Query by id failed:", err);
      res.status(500).json({
        state: "0",
        msg: "Query by id failed",
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
          msg: "Invalid input: 'title', 'author', 'year' are required.",
        });
      }
      const results = await bookService.updateBook(id, data);
      res.status(200).json({
        state: "1",
        msg: "Update by id successful",
        data: results,
      });
    } catch (err) {
      console.error("Update by id failed:", err);
      res.status(500).json({
        state: "0",
        msg: "Update by id failed",
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
          msg: `No book found with id: ${id}`,
        });
      }
      res.status(200).json({
        state: "1",
        msg: "Book soft deleted successfully.",
        data: results,
      });
    } catch (err) {
      console.error("Soft delete by id failed:", err);
      res.status(500).json({
        state: "0",
        msg: "Database error: Soft delete by id failed.",
        error: err.message,
      });
    }
  },
};

module.exports = bookController;
