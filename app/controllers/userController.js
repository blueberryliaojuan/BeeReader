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
    console.log("req", req.body);
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
      console.log("results", results);
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
        //afterward this info can be get from any page through req.session.user
        req.session.user = {
          id: results[0].id,
          username: results[0].username,
          email: results[0].email,
          profile_picture: results[0].profile_picture || "/images/userPic.png",
        };
        res.status(200).json({
          state: "1",
          msg: "Login successful for user: " + email,
          data: req.session.user, //only return needed user information
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
};

module.exports = userController;
