const router = require("express").Router();
const { health } = require("../controllers/system.controller");

router.get("/health", health);

module.exports = router;