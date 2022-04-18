const config = require("config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("authentication-token");

  const jwtSecret = config.get("jsonWebTokenSecret");
  const decodedToken = jwt.verify(token, jwtSecret);
  req.user = decodedToken.user;
  next();
};

module.exports = auth;
