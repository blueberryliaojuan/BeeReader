const dbPool = require("../../config/dbConfig.js");
const { v4: uuidv4 } = require("uuid");

const userService = {
  verifyUser(email, password) {
    // const { email, password } = data;
    const SQL = "SELECT * FROM Users WHERE email=?";
    const parameters = [email];

    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          return reject(err);
        } else return resolve(results);
      });
    });
  },
  checkEmailAvailability(email) {
    const SQL = "SELECT * FROM Users WHERE email=?";
    const parameters = [email];

    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          return reject(err);
        } else return resolve(results.length === 0);
      });
    });
  },
  createUser(email, username, password) {
    // const { username, email, password } = data;
    const id = uuidv4(); // Generate a unique user ID
    const SQL =
      "INSERT INTO Users (id, username, email, password) VALUES (?, ?, ?, ?)";
    const parameters = [id, username, email, password];

    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          return reject(err);
        } else return resolve(results);
      });
    });
  },
};
module.exports = userService;
