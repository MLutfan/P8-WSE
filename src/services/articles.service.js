const Article = require("../repositories/articles.repo");

async function getAllArticles(query) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  // Filter Logic
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.tag) filter.tags = query.tag;
  
  // Search Logic (Case insensitive)
  if (query.q) {
    filter.$or = [
      { title: { $regex: query.q, $options: "i" } },
      { content: { $regex: query.q, $options: "i" } },
    ];
  }

  // Sorting Logic
  const sortBy = query.sortBy || "createdAt";
  const order = query.order === "asc" ? 1 : -1;

  const articles = await Article.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: order });

  const total = await Article.countDocuments(filter);

  return { page, limit, total, results: articles };
}

async function createArticle(data) {
  const article = new Article(data);
  return await article.save();
}

// Tambahan fungsi Update
async function updateArticle(id, data) {
  const updated = await Article.findByIdAndUpdate(id, data, {
    new: true, // Kembalikan data setelah diupdate
    runValidators: true,
  });
  return updated;
}

module.exports = { getAllArticles, createArticle, updateArticle };