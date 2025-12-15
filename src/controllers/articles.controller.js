const { ok, created } = require("../utils/response");
const ArticleService = require("../services/articles.service");

async function listArticles(req, res, next) {
  try {
    // Ambil data dari query params (misal: ?page=1&status=published)
    const result = await ArticleService.getAllArticles(req.query);
    return ok(res, result);
  } catch (err) {
    next(err); // Lempar error ke middleware error handler
  }
}

async function createArticle(req, res, next) {
  try {
    const article = await ArticleService.createArticle(req.body);
    return created(res, article);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listArticles,
  createArticle,
};