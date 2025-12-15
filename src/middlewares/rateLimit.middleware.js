const rateLimit = require("express-rate-limit");

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 60, // Limit 60 request per IP per menit
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

module.exports = { generalLimiter };