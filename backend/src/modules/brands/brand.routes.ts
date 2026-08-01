import { Router } from "express";
import { Role } from "@prisma/client";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import * as controller from "./brand.controller.js";

export const brandRouter = Router();

brandRouter.get("/me", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.getMyProfile));
brandRouter.put("/me", requireAuth, requireRole(Role.BRAND), asyncHandler(controller.upsertMyProfile));
brandRouter.get("/:id", asyncHandler(controller.getBrandById));
