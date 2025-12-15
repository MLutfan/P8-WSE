const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const {
  createArticleSchema,
  updateArticleSchema,
  listArticlesSchema,
} = require("../utils/articles.validation");

const {
  listArticles,
  createArticle,
  updateArticle,
} = require("../controllers/articles.controller");

// GET dengan validasi query params (page, limit, q, dll)
router.get("/", validate(listArticlesSchema), listArticles);

// POST dengan validasi body
router.post("/", validate(createArticleSchema), createArticle);

// PUT dengan validasi body & params
router.put("/:id", validate(updateArticleSchema), updateArticle);

module.exports = router;