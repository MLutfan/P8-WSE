const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: { type: String }, // akan diisi email/id user nanti
  },
  { timestamps: true }
);

// Hook untuk membuat slug otomatis dari title sebelum validasi
ArticleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // ganti karakter aneh dengan dash
      .replace(/(^-|-$)+/g, "");   // hapus dash di awal/akhir
  }
  next(); // PENTING: panggil next() agar proses lanjut
});

const ArticleModel = mongoose.model("Article", ArticleSchema);
module.exports = ArticleModel;