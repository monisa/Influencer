import type { Request, Response } from "express";
import { prisma } from "../../db/prisma.js";
import { issueOtp, verifyOtp } from "../../services/otp.js";
import { signAuthToken } from "../../services/token.js";
import { verifyGoogleIdToken } from "../../services/googleAuth.js";
import { badRequest, notFound, unauthorized } from "../../utils/AppError.js";
import {
  googleAuthSchema,
  startLoginSchema,
  startRegisterSchema,
  verifyOtpSchema,
} from "./auth.schema.js";

export async function startRegister(req: Request, res: Response) {
  const { email, role } = startRegisterSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing?.emailVerified) {
    throw badRequest("An account with this email already exists — try logging in instead.");
  }

  const user =
    existing ??
    (await prisma.user.create({
      data: { email, role },
    }));

  await issueOtp(user.id, user.email, "REGISTER");
  res.status(200).json({ message: "Verification code sent", email: user.email });
}

export async function verifyRegister(req: Request, res: Response) {
  const { email, code } = verifyOtpSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw notFound("No pending registration for this email");

  await verifyOtp(user.id, "REGISTER", code);
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true },
  });

  const token = signAuthToken({ sub: updated.id, role: updated.role, email: updated.email });
  res.status(200).json({ token, user: toPublicUser(updated) });
}

export async function startLogin(req: Request, res: Response) {
  const { email } = startLoginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.emailVerified) {
    throw notFound("No verified account found for this email");
  }

  await issueOtp(user.id, user.email, "LOGIN");
  res.status(200).json({ message: "Verification code sent", email: user.email });
}

export async function verifyLogin(req: Request, res: Response) {
  const { email, code } = verifyOtpSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw notFound("No account found for this email");

  await verifyOtp(user.id, "LOGIN", code);

  const token = signAuthToken({ sub: user.id, role: user.role, email: user.email });
  res.status(200).json({ token, user: toPublicUser(user) });
}

export async function googleAuth(req: Request, res: Response) {
  const { idToken, role } = googleAuthSchema.parse(req.body);
  const profile = await verifyGoogleIdToken(idToken);

  let user = await prisma.user.findFirst({
    where: { OR: [{ googleId: profile.googleId }, { email: profile.email }] },
  });

  if (!user) {
    if (!role) {
      throw badRequest("role is required for first-time Google sign-in");
    }
    user = await prisma.user.create({
      data: {
        email: profile.email,
        googleId: profile.googleId,
        role,
        emailVerified: profile.emailVerified,
      },
    });
  } else if (!user.googleId) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { googleId: profile.googleId, emailVerified: true },
    });
  }

  const token = signAuthToken({ sub: user.id, role: user.role, email: user.email });
  res.status(200).json({ token, user: toPublicUser(user) });
}

export async function me(req: Request, res: Response) {
  if (!req.user) throw unauthorized();

  const user = await prisma.user.findUnique({
    where: { id: req.user.sub },
    include: { creatorProfile: true, brandProfile: true },
  });
  if (!user) throw notFound("User not found");

  res.status(200).json({ user: toPublicUser(user), profile: user.creatorProfile ?? user.brandProfile ?? null });
}

function toPublicUser(user: { id: string; email: string; role: string; emailVerified: boolean }) {
  return { id: user.id, email: user.email, role: user.role, emailVerified: user.emailVerified };
}
