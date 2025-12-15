const mongoose = require("mongoose");
const { dbUri } = require("./env");
const logger = require("../utils/logger");

async function connectDB() {
  if (!dbUri) {
    logger.warn("[DB] DB_URI belum diset. Skip koneksi DB.");
    return;
  }
  try {
    await mongoose.connect(dbUri);
    logger.info("[DB] MongoDB connected");
  } catch (err) {
    logger.error({ err }, "[DB] MongoDB connection failed");
    logger.warn("[DB] App tetap jalan tanpa DB (sementara).");
  }
}
module.exports = { connectDB };