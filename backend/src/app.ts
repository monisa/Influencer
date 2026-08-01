import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { creatorRouter } from "./modules/creators/creator.routes.js";
import { brandRouter } from "./modules/brands/brand.routes.js";
import { campaignRouter } from "./modules/campaigns/campaign.routes.js";
import { applicationRouter } from "./modules/applications/application.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/creators", creatorRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/campaigns", campaignRouter);
  app.use("/api/applications", applicationRouter);
  app.use("/api/admin", adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
