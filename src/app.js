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
const { generalLimiter } = require("./middlewares/rateLimit.middleware");
const authRoutes = require("./routes/auth.routes");

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
app.use("/api/auth", authRoutes);
app.use("/api/articles", articlesRoutes);

// docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(notFound);
app.use(errorHandler);

// === Security Hardening ===
app.use(
  cors({
    origin: "*", // Sementara allow all, nanti diperketat
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-correlation-id"],
  })
);
app.use(helmet());
app.use(generalLimiter);

module.exports = app;