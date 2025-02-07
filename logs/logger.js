const winston = require("winston");
const path = require("path");

// Logger sozlamalari
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: path.join(__dirname, "../logs/app.log"), level: "info" }) // Log fayliga yozish
  ],
});

module.exports = logger;
