/**
 * @file userController.js
 * @description
 * Controller for user-related operations in the Express application.
 * Handles user registration, login credential verification, and email availability checks.
 *
 * Responsibilities:
 * - Accept and validate user input from HTTP requests.
 * - Hash user passwords securely during registration.
 * - Verify user login by comparing hashed passwords.
 * - Manage user session data upon successful login.
 * - Return clear and consistent JSON responses for success and error cases.
 *
 * Response structure:
 * - JSON responses include 'state' (1 for success, 0 for failure), descriptive 'msg',
 *   and 'data' when applicable, such as user session info on login success.
 */

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const userService = require("../services/userService.js");

const userController = {
  //postman:body-urlencoded
  async createUser(req, res) {
    console.log("====================================");
    console.log("userController-createUser");
    console.log("req.body", req.body);
    const { email, username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // console.log("req.file:", req.file);
    console.log("====================================");
    try {
      const results = await userService.createUser(
        email,
        username,
        hashedPassword
      );
      res.status(201).json({
        state: "1",
        msg: "Create user successful",
        data: results,
      });
    } catch (err) {
      console.error("Create user failed:", err);
      res.status(500).json({
        state: "0",
        msg: "Create user failed",
        error: err.message,
      });
    }
  },

  async verifyLoginCredentials(req, res) {
    console.log("====================================");
    console.log("userController-verifyLoginCredentials");
    // console.log("req", req.body);
    console.log("************SID:", req.sessionID);
    console.log("Session Object:", req.session);
    console.log("====================================");
    try {
      let { email, password } = req.body;
      // Validate input
      if (!email || !password) {
        console.warn("Invalid login attempt: Missing email or password");
        return res.status(400).json({
          state: "0", // Custom status code 0: failure
          msg: "Email and password are required",
        });
      }
      //  Verify user credentials
      const results = await userService.verifyUser(email);
      // console.log("results", results);
      if (results.length > 0) {
        console.log("Login successful for user:", email);
        const user = results[0];
        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(401).json({
            state: "0", // Custom status code 0: failure
            message: "Invalid credentials.",
          });
        }
        //if login successfully, set the session
        //afterwards this info can be get from any page through req.session.user
        req.session.user = {
          id: results[0].id,
          username: results[0].username,
          email: results[0].email,
          profile_picture: results[0].profile_picture || "/images/userPic.png",
        };
        console.log("req.session.user", req.session.user);
        console.log("************SID:", req.sessionID);
        console.log("Session Object:", req.session);

        res.status(200).json({
          state: "1",
          msg: "Login successful",
          data: req.session.user,
        });
      } else {
        // User not found
        return res.status(401).json({
          state: "0",
          msg: "Invalid credentials.",
        });
      }
    } catch (err) {
      console.error("Login verification failed:", err);
      res.status(500).json({
        state: "0",
        msg: "Login verification failed",
        error: err.message,
      });
    }
  },

  checkEmailAvailability(req, res) {
    console.log("====================================");
    console.log("userController-checkEmailAvailability");
    console.log("req", req.body);
    console.log("====================================");
    let email = req.body.email;
    try {
      userService.checkEmailAvailability(email).then((available) => {
        if (available) {
          res.status(200).json({
            state: "1",
            msg: "email is available",
          });
        } else {
          res.status(409).json({
            state: "0",
            msg: "email is already registered",
          });
        }
      });
    } catch (err) {
      console.error("Error when checking username availability:", err);
      res.status(500).json({
        state: "0",
        msg: "Error when checking username availability",
        error: err.message,
      });
    }
  },

  logOut(req, res) {
    console.log("log out request ");
    console.log("req.session", req.session);
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout failed:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  },
};

module.exports = userController;
