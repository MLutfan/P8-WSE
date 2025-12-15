function toArticleDTO(article) {
  return {
    id: article._id,
    title: article.title,
    slug: article.slug,
    content: article.content,
    tags: article.tags,
    status: article.status,
    author: article.author,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}

function toArticleListDTO({ page, limit, total, results }) {
  return {
    page,
    limit,
    total,
    results: results.map(toArticleDTO),
  };
}

module.exports = { toArticleDTO, toArticleListDTO };