const { ok, created } = require("../utils/response");
const ArticleService = require("../services/articles.service");
// Import DTO
const { toArticleDTO, toArticleListDTO } = require("../utils/articles.dto");

async function listArticles(req, res, next) {
  try {
    const result = await ArticleService.getAllArticles(req.query);
    // Bungkus dengan DTO
    return ok(res, toArticleListDTO(result));
  } catch (err) {
    next(err);
  }
}

async function createArticle(req, res, next) {
  try {
    const article = await ArticleService.createArticle(req.body);
    // Bungkus dengan DTO
    return created(res, toArticleDTO(article));
  } catch (err) {
    next(err);
  }
}

async function updateArticle(req, res, next) {
  try {
    const article = await ArticleService.updateArticle(req.params.id, req.body);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
        cid: req.correlationId,
      });
    }
    return ok(res, toArticleDTO(article), "Updated");
  } catch (err) {
    next(err);
  }
}

module.exports = { listArticles, createArticle, updateArticle };