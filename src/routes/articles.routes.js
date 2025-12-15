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

router.get("/", validate(listArticlesSchema), listArticles);
router.post("/", validate(createArticleSchema), createArticle);
router.put("/:id", validate(updateArticleSchema), updateArticle);

module.exports = router;