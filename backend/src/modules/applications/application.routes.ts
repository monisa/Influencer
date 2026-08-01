import { Router } from "express";
import { Role } from "@prisma/client";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import * as controller from "./application.controller.js";

export const applicationRouter = Router();

applicationRouter.post("/:id/approve", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.approveApplication));
applicationRouter.post("/:id/reject", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.rejectApplication));
applicationRouter.post("/:id/content", requireAuth, requireRole(Role.CREATOR), asyncHandler(controller.submitContent));
applicationRouter.post("/:id/content/approve", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.approveContent));
applicationRouter.post("/:id/complete", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.completeApplication));
applicationRouter.post("/:id/pay", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.payApplication));
