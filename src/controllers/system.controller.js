const { ok } = require("../utils/response");

function health(req, res) {
  const data = {
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  return ok(res, data, "Service healthy");
}

module.exports = { health };