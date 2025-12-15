const Joi = require("joi");

const createArticleSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(120).required(),
    content: Joi.string().min(10).required(),
    tags: Joi.array().items(Joi.string().min(1).max(30)).default([]),
    status: Joi.string().valid("draft", "published").default("draft"),
    author: Joi.string().optional(),
  }),
  params: Joi.object({}),
  query: Joi.object({}),
});

const updateArticleSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(128).optional(),
    content: Joi.string().min(10).optional(),
    tags: Joi.array().items(Joi.string().min(1).max(30)).optional(),
    status: Joi.string().valid("draft", "published").optional(),
  }).min(1), // Minimal ada 1 field yang mau diupdate
  params: Joi.object({
    id: Joi.string().required(),
  }),
  query: Joi.object({}),
});

const listArticlesSchema = Joi.object({
  body: Joi.object({}),
  params: Joi.object({}),
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    status: Joi.string().valid("draft", "published").optional(),
    tag: Joi.string().optional(),
    q: Joi.string().min(1).max(100).optional(), // Keyword pencarian
    sortBy: Joi.string().valid("createdAt", "title").default("createdAt"),
    order: Joi.string().valid("asc", "desc").default("desc"),
  }),
});

module.exports = {
  createArticleSchema,
  updateArticleSchema,
  listArticlesSchema,
};