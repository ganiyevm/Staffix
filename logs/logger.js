const winston = require("winston");
const path = require("path");

// Faqat info va warn darajadagi loglarni qabul qiluvchi filter
const infoAndWarnFilter = winston.format((info, opts) => {
  return info.level === "info" || info.level === "warn" ? info : false;
})();

const logger = winston.createLogger({
  level: "info", // Umumiy log darajasi
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // Faqat info va warn loglarini yozish
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/app.log"),
      format: winston.format.combine(infoAndWarnFilter),
    }),
    // Faqat error loglarini yozish
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
  ],
});

module.exports = logger;
