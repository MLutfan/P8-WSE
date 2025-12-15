const { env } = require("../config/env");
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error({
    cid: req.correlationId,
    err: {
      message: err.message,
      stack: env === "development" ? err.stack : undefined,
    },
  }, "Unhandled error");

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    cid: req.correlationId,
  });
}
module.exports = errorHandler;