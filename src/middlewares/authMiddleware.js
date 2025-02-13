const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const logger = require("../../logs/logger");

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    logger.warn("No access token provided");
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      logger.error("Invalid or expired access token");
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
