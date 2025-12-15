const app = require("./app");
const logger = require("./utils/logger");
const { port } = require("./config/env");
const { connectDB } = require("./config/db");

async function bootstrap() {
  await connectDB();
  app.listen(port, () => {
    logger.info({ port }, "Server running");
  });
}

bootstrap();