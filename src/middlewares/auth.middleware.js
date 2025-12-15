const { verifyAccessToken } = require("../utils/jwt");

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Missing or invalid Authorization header",
      cid: req.correlationId,
    });
  }

  const token = header.replace("Bearer", "").trim();

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { id, role, email }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      cid: req.correlationId,
    });
  }
}

module.exports = verifyToken;