const dbPool = require("../../config/dbConfig.js");
const bookController = {
  createBook(req, res) {
    console.log("====================================");
    console.log("userController-createBook");
    console.log("req", req);
    console.log("====================================");
  },
  getAllBooks(req, res) {
    console.log("====================================");
    console.log("userController-getAllBooks");
    console.log("====================================");
    let SQL = "SELECT * FROM Books";
    dbPool.connection(SQL, [], (err, results) => {
      if (err) {
        console.error("Query failed:", err);
        return res.status(500).json({
          state: "0", // Custom status code 0: failure
          msg: "Database query failed",
          error: err.message,
        });
      }
      // 'res' is the Express response object
      // .json Convert JavaScript object to JSON and send it as the HTTP response
      res.json({
        state: "1", // Custom status code 1: success
        msg: "Query successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    });
  },
  getBookById(req, res) {
    console.log("====================================");
    console.log("bookController-getBookById");
    console.log("req.params", req.params);
    console.log("====================================");
    // Logic to fetch a single book by ID
  },
  updateBook(req, res) {
    console.log("====================================");
    console.log("bookController-updateBook");
    console.log("req.params", req.params);
    console.log("req.body", req.body);
    console.log("====================================");
    // Logic to update a book by ID
  },
  deleteBook(req, res) {
    console.log("====================================");
    console.log("bookController-deleteBook");
    console.log("req.params", req.params);
    console.log("====================================");
    // Logic to delete a book by ID
  },
};

module.exports = bookController;
