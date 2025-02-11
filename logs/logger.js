const winston = require("winston");
const path = require("path");

const infoAndWarnFilter = winston.format((info, opts) => {
  return info.level === "info" || info.level === "warn" ? info : false;
})();

const logger = winston.createLogger({
  level: "info", 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/app.log"),
      format: winston.format.combine(infoAndWarnFilter),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
  ],
});

module.exports = logger;
