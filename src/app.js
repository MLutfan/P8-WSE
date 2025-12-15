const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pinoHttp = require("pino-http");
const logger = require("./utils/logger");
const correlationId = require("./middlewares/correlationId.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");
const systemRoutes = require("./routes/system.routes");
const articlesRoutes = require("./routes/articles.routes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const openapiSpec = YAML.load("./src/docs/openapi.yaml");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// correlation id first
app.use(correlationId);

// structured http logger
app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({
      cid: req.correlationId,
      userId: req.user?.id, // nanti terisi setelah JWT aktif
    }),
  })
);

// routes
app.use(systemRoutes);
app.use("/api/articles", articlesRoutes);

// docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(notFound);
app.use(errorHandler);

module.exports = app;