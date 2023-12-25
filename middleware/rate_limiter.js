const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hr in milliseconds
  max: 1000,
  message: "You have exceeded the 1000 requests in 1 hrs limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
