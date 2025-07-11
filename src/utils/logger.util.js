
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // you can change to debug for local
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/test.log" }),
  ],
});

module.exports = logger;
