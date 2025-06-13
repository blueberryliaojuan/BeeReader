const dbPool = require("../../config/dbConfig.js");
const bookController = {
  //postman:body-urlencoded
  createBook(req, res) {
    console.log("====================================");
    console.log("userController-createBook");
    console.log("req.body", req.body);
    console.log("====================================");
    const SQL =
      "INSERT INTO Books (id,title, author, year, genre, imageUrl, review, rating, status) VALUES (?,?,?,?,?,?,?,?,?)";
    const { id, title, author, year, genre, imageUrl, review, rating, status } =
      req.body;
    //id, title,author,year should not be null
    // Ensure mandatory fields are not null
    if (!id || !title || !author || !year) {
      return res.status(400).json({
        state: "0", // Custom status code 0: failure
        msg: "Missing required fields",
      });
    }
    const parameters = [
      id,
      title,
      author,
      year,
      genre,
      imageUrl,
      review,
      rating,
      status,
    ];
    dbPool.connection(SQL, parameters, (err, results) => {
      if (err) {
        console.error("Create book failed:", err);
        return res.status(500).json({
          state: "0", // Custom status code 0: failure
          msg: "Create book failed",
          error: err.message,
        });
      }
      res.json({
        state: "1", // Custom status code 1: success
        msg: "Create book successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    });
  },
  getAllBooks(req, res) {
    console.log("====================================");
    console.log("userController-getAllBooks");
    console.log("====================================");

    //Handle Query Parameters in getAllBooks, on condition user send id as query parameter by mistake
    //Check for query parameter 'id' and forward to getBookById logic
    if (req.query.id) {
      return this.getBookById({ params: { id: req.query.id } }, res);
    }

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
  //postman: /books/d9fba0ce-1b44-49e1-a902-4b0b3bc3f7e4
  //Query Parameters (req.query)
  //In {{base_url}}/books/?id=123, id is part of the query string.
  //This matches the /books route and triggers getAllBooks because you're using query parameters, not URL parameters.

  //URL Parameters (req.params)
  //In {{base_url}}/books/123, 123 is part of the path,
  //the route /books/:id will match, triggering getBookById.
  getBookById(req, res) {
    console.log("====================================");
    console.log("bookController-getBookById");
    console.log("req.params", req.params);
    console.log("====================================");
    // Logic to fetch a single book by ID
    let SQL = "SELECT * FROM Books WHERE id = ?";
    let parameters = [req.params.id];
    dbPool.connection(SQL, parameters, (err, results) => {
      if (err) {
        console.error("Query by id failed:", err);
        return res.status(500).json({
          state: "0", // Custom status code 0: failure
          msg: "Query by id failed",
          error: err.message,
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          state: "0", // Custom status code 0: failure
          msg: "Book not found",
        });
      }
      res.json({
        state: "1", // Custom status code 1: success
        msg: "Query successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    });
  },
  updateBook(req, res) {
    console.log("====================================");
    console.log("bookController-updateBook");
    console.log("req.params", req.params);
    console.log("req.body", req.body);
    console.log("====================================");
    // Logic to update a book by ID
    const SQL =
      "UPDATE Books SET title=?, author=?, year=?, genre=?, imageUrl=?, review=?, rating=?, status=?   WHERE id = ?";
    if (!id || !title || !author || !year) {
      return res.status(400).json({
        state: "0", // Custom status code 0: failure
        msg: "Invalid input: 'id', 'title', 'author', 'year', and 'genre' are required.",
      });
    }
    const { title, author, year, genre, imageUrl, review, rating, status } =
      req.body;
    const id = req.params.id;
    const parameters = [
      title,
      author,
      year,
      genre,
      imageUrl,
      review,
      rating,
      status,
      id,
    ];
    dbPool.connection(SQL, parameters, (err, results) => {
      if (err) {
        console.error("Update by id failed:", err);
        return res.status(500).json({
          state: "0", // Custom status code 0: failure
          msg: "Update by id failed",
          error: err.message,
        });
      }
      res.json({
        state: "1", // Custom status code 1: success
        msg: "Update by id successful",
        data: results, // 'results' contains the query results as a JavaScript object/array
      });
    });
  },
  deleteBook(req, res) {
    console.log("====================================");
    console.log("bookController-deleteBook");
    console.log("req.params", req.params);
    console.log("====================================");
    // Logic to delete a book by ID
    const SQL = "DELETE FROM Books where id=?"; //DELETE does not need *
    const id = req.params.id;
    dbPool.connection(SQL, [id], (err, results) => {
      if (err) {
        console.error("Delete by id failed:", err);
        return res.status(500).json({
          state: "0", // Custom status code 0: failure
          msg: "Delete by id failed",
          error: err.message,
        });
      }
      res.json({
        state: "1", // Custom status code 1: success
        msg: "Delete by id successful",
        data: results,
      });
    });
  },
};

module.exports = bookController;
