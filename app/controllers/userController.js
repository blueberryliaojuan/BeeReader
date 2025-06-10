const dbPool = require("../../config/dbConfig.js");

const userController = {
  verifyLoginCredentials(req, res) {
    console.log("====================================");
    console.log("userController-verifyLoginCredentials");
    console.log("req", req);
    console.log("====================================");
    let { account, password } = req.body;
  },
  checkUsernameAvailability(req, res) {
    console.log("====================================");
    console.log("userController-checkUsernameAvailability");
    console.log("req", req);
    console.log("====================================");
  },
};

module.exports = userController;
