import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth } from "../../middleware/auth.js";
import * as controller from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register/start", asyncHandler(controller.startRegister));
authRouter.post("/register/verify", asyncHandler(controller.verifyRegister));
authRouter.post("/login/start", asyncHandler(controller.startLogin));
authRouter.post("/login/verify", asyncHandler(controller.verifyLogin));
authRouter.post("/google", asyncHandler(controller.googleAuth));
authRouter.get("/me", requireAuth, asyncHandler(controller.me));
