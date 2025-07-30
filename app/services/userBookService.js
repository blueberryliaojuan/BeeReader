const dbPool = require("../../config/dbConfig.js");
const { v4: uuidv4 } = require("uuid");

const userBookService = {
  addToReadingList(user_id, book_id) {
    console.log("user_id", user_id);
    console.log("book_id", book_id);
    const SQL =
      "INSERT INTO user_books (id, user_id, book_id) VALUES (?, ?, ?)";
    const id = uuidv4();

    const parameters = [id, user_id, book_id];
    console.log("parameters", parameters);
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          // if duplicated
          if (err.code === "ER_DUP_ENTRY") {
            reject(new Error("This book is already in your reading list."));
          } else {
            reject(err);
          }
        } else {
          resolve(results);
        }
      });
    });
  },

  getUserReadingList(userId) {
    const SQL =
      "SELECT books.* FROM user_books JOIN books ON user_books.book_id = books.id WHERE user_books.user_id = ? AND books.is_deleted = 0";
    const params = [userId];
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // deleteBookFromReadingList(id) {
  //   // Logic to delete a book by ID
  //   //const SQL = "DELETE FROM books where id=?"; // DELETE does not need "*"
  //   //soft delete
  //   const SQL =
  //     "UPDATE books SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?";
  //   return new Promise((resolve, reject) => {
  //     dbPool.connection(SQL, [id], (err, results) => {
  //       if (err) return reject(err);
  //       resolve(results);
  //     });
  //   });
  // },

  removeFromReadingList(user_id, book_id) {
    const SQL = "DELETE FROM user_books WHERE user_id = ? AND book_id = ?";
    const parameters = [user_id, book_id];

    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = userBookService;
