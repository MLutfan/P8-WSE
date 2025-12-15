const router = require("express").Router();
const {
  listArticles,
  createArticle,
} = require("../controllers/articles.controller");

router.get("/", listArticles);
router.post("/", createArticle); // Menambahkan endpoint POST

module.exports = router;