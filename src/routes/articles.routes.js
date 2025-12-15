const router = require("express").Router(); 
const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");

const {
  createArticleSchema,
  updateArticleSchema,
  listArticlesSchema,
} = require("../utils/articles.validation");

const {
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle, 
} = require("../controllers/articles.controller");

// Public
router.get("/", validate(listArticlesSchema), listArticles);

// Protected
router.post(
  "/",
  verifyToken,
  requireRole("user", "admin"),
  validate(createArticleSchema),
  createArticle
);

router.put(
  "/:id",
  verifyToken,
  validate(updateArticleSchema),
  updateArticle
);

// Admin only delete
router.delete(
  "/:id",
  verifyToken,
  requireRole("admin"),
  deleteArticle
);

module.exports = router;