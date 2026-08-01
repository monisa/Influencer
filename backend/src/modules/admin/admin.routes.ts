import { Router } from "express";
import { Role } from "@prisma/client";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import * as controller from "./admin.controller.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole(Role.ADMIN));
adminRouter.get("/creators/pending", asyncHandler(controller.listPendingCreators));
adminRouter.post("/creators/:id/verify", asyncHandler(controller.verifyCreator));
adminRouter.post("/creators/:id/reject", asyncHandler(controller.rejectCreator));
