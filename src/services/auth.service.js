const bcrypt = require("bcryptjs");
const User = require("../repositories/users.repo");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

async function register({ name, email, password, role }) {
  // 1. Cek apakah email sudah terdaftar
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already registered");
    err.statusCode = 409;
    throw err;
  }

  // 2. Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 3. Simpan user baru ke database
  const user = await User.create({
    name,
    email,
    passwordHash,
    role: role || "user",
  });

  return user;
}

async function login({ email, password }) {
  // 1. Cari user berdasarkan email
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  // 2. Cek password
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  // 3. Buat Payload untuk token
  const payload = { id: user._id, role: user.role, email: user.email };

  // 4. Generate Access Token & Refresh Token
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // 5. Simpan Refresh Token ke Database (untuk fitur logout/revoke nanti)
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
}

async function refresh(refreshToken) {
  if (!refreshToken) {
    const err = new Error("Refresh token required");
    err.statusCode = 401;
    throw err;
  }

  // 1. Verifikasi signature refresh token
  const decoded = verifyRefreshToken(refreshToken);

  // 2. Cari user dan cocokkan token dengan yang di DB
  // (Security: Mencegah reuse token lama jika sudah logout/refresh sebelumnya)
  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    const err = new Error("Invalid refresh token");
    err.statusCode = 401;
    throw err;
  }

  // 3. Putar siklus: Buat Access & Refresh Token BARU
  const payload = { id: user._id, role: user.role, email: user.email };
  const newAccessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload);

  // 4. Update Refresh Token di DB
  user.refreshToken = newRefreshToken;
  await user.save();

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

async function logout(userId) {
  // Hapus refresh token di DB agar tidak bisa dipakai refresh lagi
  const user = await User.findById(userId);
  if (!user) return;
  
  user.refreshToken = null;
  await user.save();
}

async function me(userId) {
  // Ambil data user tanpa password dan refresh token
  const user = await User.findById(userId).select("-passwordHash -refreshToken");
  return user;
}

module.exports = { register, login, refresh, logout, me };