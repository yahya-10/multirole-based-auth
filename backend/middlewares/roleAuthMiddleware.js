const jwt = require("jsonwebtoken");
const config = require("config");

const roleAuthMiddleware = (role) => {
  return (req, res, next) => {
    const jwtSecret = config.get("jsonWebTokenSecret");

    let token = req.header("authentication-token");
    const decoded = jwt.decode(token, jwtSecret);
    const userRole = decoded.user.role;

    if (role !== userRole) {
      res.status(401).json("Access forbidden");
    }
    next();
  };
};

module.exports = { roleAuthMiddleware };
