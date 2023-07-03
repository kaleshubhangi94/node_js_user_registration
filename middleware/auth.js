const jwt = require("jsonwebtoken");
const utils = require("../utils/utils");
require("dotenv").config();

const authentication = (req, resp, next) => {
  // const SECRET_KEY = "virusUser";
  if (req.originalUrl === "/login") {
    next();
    return;
  }
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (token == null) return utils.sendResponse(401, [], "Token not found", resp);
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    jwt.verify(token, "your access token secret", (err, user) => {
      if (err) return utils.sendResponse(403, [], JSON.stringify(err), resp);

      req.user = user;
      next();
    });
  });
};
module.exports = { authentication };
