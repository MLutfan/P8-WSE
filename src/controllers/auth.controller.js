const AuthService = require("../services/auth.service");
const { ok, created } = require("../utils/response");

async function register(req, res, next) {
  try {
    const user = await AuthService.register(req.body);
    return created(res, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }, "Registered");
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { user, accessToken, refreshToken } = await AuthService.login(req.body);
    return ok(res, {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, "Logged in");
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const tokens = await AuthService.refresh(req.body.refreshToken);
    return ok(res, tokens, "Token refreshed");
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    // req.user.id didapat dari middleware auth
    await AuthService.logout(req.user.id);
    return ok(res, null, "Logged out");
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await AuthService.me(req.user.id);
    return ok(res, user);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, refresh, logout, me };