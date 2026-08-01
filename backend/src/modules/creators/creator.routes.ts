import { Router } from "express";
import { Role } from "@prisma/client";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import * as controller from "./creator.controller.js";

export const creatorRouter = Router();

creatorRouter.get("/", asyncHandler(controller.searchCreators));
creatorRouter.get("/me", requireAuth, requireRole(Role.CREATOR), asyncHandler(controller.getMyProfile));
creatorRouter.put("/me", requireAuth, requireRole(Role.CREATOR), asyncHandler(controller.upsertMyProfile));
creatorRouter.post(
  "/me/submit-verification",
  requireAuth,
  requireRole(Role.CREATOR),
  asyncHandler(controller.submitForVerification)
);
creatorRouter.get("/:id", asyncHandler(controller.getCreatorById));
