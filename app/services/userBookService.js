/**
 * @file userBookService.js
 * @description Service module for managing user reading lists:
 *              adding books, retrieving lists, and removing books from a user's reading list.
 * @created 2025-06-09
 * @author Juan Liao
 */

const dbPool = require("../../config/dbConfig.js");
const { v4: uuidv4 } = require("uuid");

const userBookService = {
  /**
   * Add a book to the user's reading list.
   * @param {string} user_id - User's ID
   * @param {string} book_id - Book's ID
   * @returns {Promise<Object>} Resolves with insertion results or rejects on error or duplicate
   */
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

  /**
   * Get all books in a user's reading list.
   * @param {string} userId - User's ID
   * @returns {Promise<Array>} Resolves with list of book objects
   */
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

  /**
   * Remove a book from the user's reading list.
   * @param {string} user_id - User's ID
   * @param {string} book_id - Book's ID
   * @returns {Promise<Object>} Resolves with deletion results
   */
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
