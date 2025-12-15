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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Core parsers (batasi ukuran body agar tidak overload)
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Security hardening
app.use(
  cors({
    origin: "*", // Ganti dengan domain spesifik jika sudah production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-correlation-id"],
  })
);
app.use(helmet());
app.use(generalLimiter);

// Observability
app.use(correlationId);
app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({
      cid: req.correlationId,
      userId: req.user?.id,
    }),
  })
);

// Routes
app.use(systemRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;