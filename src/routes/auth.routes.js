const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema, refreshSchema } = require("../utils/auth.validation");
const AuthController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/refresh", validate(refreshSchema), AuthController.refresh);

// Endpoint yang butuh login
router.post("/logout", verifyToken, AuthController.logout);
router.get("/me", verifyToken, AuthController.me);

module.exports = router;