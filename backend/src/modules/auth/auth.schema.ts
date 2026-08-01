import { z } from "zod";

export const startRegisterSchema = z.object({
  email: z.string().email(),
  role: z.enum(["CREATOR", "BRAND"]),
});

export const startLoginSchema = z.object({
  email: z.string().email(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export const googleAuthSchema = z.object({
  idToken: z.string().min(10),
  role: z.enum(["CREATOR", "BRAND"]).optional(),
});
