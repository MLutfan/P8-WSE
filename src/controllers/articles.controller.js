const { ok, created } = require("../utils/response");
const ArticleService = require("../services/articles.service");
const { toArticleDTO, toArticleListDTO } = require("../utils/articles.dto");

async function listArticles(req, res, next) {
  try {
    const result = await ArticleService.getAllArticles(req.query);
    return ok(res, toArticleListDTO(result));
  } catch (err) {
    next(err);
  }
}

async function createArticle(req, res, next) {
  try {
    // req.user didapat dari middleware verifyToken
    const article = await ArticleService.createArticle(req.body, req.user);
    return created(res, toArticleDTO(article));
  } catch (err) {
    next(err);
  }
}

async function updateArticle(req, res, next) {
  try {
    // Kirim req.user ke service untuk pengecekan ownership
    const article = await ArticleService.updateArticle(
      req.params.id,
      req.body,
      req.user
    );
    
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

// === FUNGSI YANG HILANG SEBELUMNYA ===
async function deleteArticle(req, res, next) {
  try {
    const deleted = await ArticleService.deleteArticle(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
        cid: req.correlationId,
      });
    }
    return res.status(204).send(); // 204 No Content
  } catch (err) {
    next(err);
  }
}

module.exports = { 
  listArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle 
};