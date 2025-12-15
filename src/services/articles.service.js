const Article = require("../repositories/articles.repo");

async function getAllArticles(query) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.tag) filter.tags = query.tag;

  // Fitur Pencarian (Search)
  if (query.q) {
    filter.$or = [
      { title: { $regex: query.q, $options: "i" } }, // case-insensitive
      { content: { $regex: query.q, $options: "i" } },
    ];
  }

  // Fitur Sorting
  const sortBy = query.sortBy || "createdAt";
  const order = query.order === "asc" ? 1 : -1;

  const results = await Article.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: order });

  const total = await Article.countDocuments(filter);

  return { page, limit, total, results };
}

// Fungsi Update
async function updateArticle(id, data, user) {
  const article = await Article.findById(id);
  if (!article) return null;

  const isOwner = article.authorId === user.id;
  const isAdmin = user.role === "admin";

  if (!isOwner && !isAdmin) {
    const err = new Error("Forbidden: not owner");
    err.statusCode = 403;
    throw err;
  }

  Object.assign(article, data);
  return await article.save();
}

async function deleteArticle(id) {
  return await Article.findByIdAndDelete(id);
}

module.exports = { 
  getAllArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle 
};

// Fungsi Create (tetap)
async function createArticle(data) {
  const article = new Article(data);
  return await article.save();
}

module.exports = { getAllArticles, createArticle, updateArticle };