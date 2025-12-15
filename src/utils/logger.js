const pino = require("pino");
const { logLevel, env } = require("../config/env");

const logger = pino({
  level: logLevel,
  transport:
    env === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:standard" },
        }
      : undefined,
});

module.exports = logger;