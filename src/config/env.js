const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  dbUri: process.env.DB_URI || "",
  logLevel: process.env.LOG_LEVEL || "info",
};