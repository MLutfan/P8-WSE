const { v4: uuidv4 } = require("uuid");

function correlationId(req, res, next) {
  const incomingId = req.headers["x-correlation-id"];
  const cid = incomingId || uuidv4();
  req.correlationId = cid;
  res.setHeader("x-correlation-id", cid);
  next();
}

module.exports = correlationId;