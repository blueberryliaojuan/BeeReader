const dbPool = require("../../config/dbConfig.js");
const { v4: uuidv4 } = require("uuid");

const bookService = {
  createBook(data) {
    //id, title,author,year should not be null
    // Ensure mandatory fields are not null
    const SQL =
      "INSERT INTO Books (id, title, author, year, genre, imageUrl,  review, rating, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const id = uuidv4();
    const { title, author, year, genre, imageUrl, review, rating, status } =
      data;

    const parameters = [
      id,
      title,
      author,
      parseInt(year, 10),
      genre || null,
      imageUrl || null,
      review || null,
      rating || null,
      status || 1,
    ];
    console.log("parameters", parameters);
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) return reject(err);
        resolve({ id, ...data });
      });
    });
  },

  getAllBooks() {
    const SQL = "SELECT * FROM Books WHERE isDeleted = 0";
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, [], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getBookById(id) {
    const SQL = "SELECT * FROM Books WHERE id = ? AND isDeleted = 0";
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, [id], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.length ? results[0] : null);
      });
    });
  },

  updateBook(id, data) {
    const SQL =
      "UPDATE Books SET title=?, author=?, year=?, genre=?, imageUrl=?, review=?, rating=?, status=? WHERE id=?";
    const { title, author, year, genre, imageUrl, review, rating, status } =
      data;
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
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  deleteBook(id) {
    // Logic to delete a book by ID
    //const SQL = "DELETE FROM Books where id=?"; // DELETE does not need "*"
    //soft delete
    const SQL =
      "UPDATE Books SET isDeleted = TRUE, deletedAt = NOW() WHERE id = ?";
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = bookService;
