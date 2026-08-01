import bcrypt from "bcryptjs";
import type { OtpPurpose } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { env } from "../config/env.js";
import { badRequest } from "../utils/AppError.js";
import { sendMail } from "./email.js";

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function issueOtp(userId: string, email: string, purpose: OtpPurpose): Promise<void> {
  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + env.OTP_TTL_MINUTES * 60 * 1000);

  await prisma.otpCode.create({
    data: { userId, codeHash, purpose, expiresAt },
  });

  await sendMail({
    to: email,
    subject: "Your Digifox Influencer Network verification code",
    text: `Your verification code is ${code}. It expires in ${env.OTP_TTL_MINUTES} minutes.`,
  });
}

export async function verifyOtp(userId: string, purpose: OtpPurpose, code: string): Promise<void> {
  const candidates = await prisma.otpCode.findMany({
    where: { userId, purpose, consumedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  for (const candidate of candidates) {
    if (await bcrypt.compare(code, candidate.codeHash)) {
      await prisma.otpCode.update({
        where: { id: candidate.id },
        data: { consumedAt: new Date() },
      });
      return;
    }
  }

  throw badRequest("Invalid or expired verification code");
}
