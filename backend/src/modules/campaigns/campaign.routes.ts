import { Router } from "express";
import { Role } from "@prisma/client";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import * as controller from "./campaign.controller.js";
import * as applicationController from "../applications/application.controller.js";

export const campaignRouter = Router();

campaignRouter.get("/", asyncHandler(controller.listCampaigns));
campaignRouter.get("/mine", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.listMyCampaigns));
campaignRouter.post("/", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.createCampaign));
campaignRouter.get("/:id", asyncHandler(controller.getCampaign));
campaignRouter.patch("/:id", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.updateCampaign));
campaignRouter.post("/:id/post", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.postCampaign));

campaignRouter.post(
  "/:id/apply",
  requireAuth,
  requireRole(Role.CREATOR),
  asyncHandler(applicationController.applyToCampaign)
);
campaignRouter.get(
  "/:id/applications",
  requireAuth,
  requireRole(Role.BRAND),
  asyncHandler(applicationController.listApplicationsForCampaign)
);
