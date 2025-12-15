const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema, refreshSchema } = require("../utils/auth.validation");
const AuthController = require("../controllers/auth.controller");
// const verifyToken = require("../middlewares/auth.middleware"); // Akan dibuat di langkah 4.5

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/refresh", validate(refreshSchema), AuthController.refresh);
// router.post("/logout", verifyToken, AuthController.logout); // Nanti di-uncomment
// router.get("/me", verifyToken, AuthController.me);          // Nanti di-uncomment

module.exports = router;