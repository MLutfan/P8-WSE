const Article = require("../repositories/articles.repo");

async function getAllArticles(query) {
  // 1. Pagination Logic
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  // 2. Filter Logic
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.tag) filter.tags = query.tag;

  // 3. Query Database
  const articles = await Article.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // Urutkan terbaru

  const total = await Article.countDocuments(filter);

  return {
    page,
    limit,
    total,
    results: articles,
  };
}

async function createArticle(data) {
  const article = new Article(data);
  return await article.save();
}

module.exports = {
  getAllArticles,
  createArticle,
};