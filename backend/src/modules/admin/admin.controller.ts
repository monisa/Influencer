import type { Request, Response } from "express";
import { VerificationStatus } from "@prisma/client";
import { prisma } from "../../db/prisma.js";
import { conflict, notFound } from "../../utils/AppError.js";

// Verification Badge Workflow (PRD Section 10):
// Register -> Verification -> Profile Review -> Audience Check -> Verified Badge
// Modeled here as UNVERIFIED -> IN_REVIEW -> VERIFIED | REJECTED, with manual admin approval.

export async function listPendingCreators(_req: Request, res: Response) {
  const results = await prisma.creatorProfile.findMany({
    where: { verificationStatus: { in: [VerificationStatus.UNVERIFIED, VerificationStatus.IN_REVIEW] } },
    orderBy: { createdAt: "asc" },
    include: { user: { select: { email: true } } },
  });
  res.status(200).json({ results });
}

export async function verifyCreator(req: Request, res: Response) {
  const creator = await prisma.creatorProfile.findUnique({ where: { id: req.params.id } });
  if (!creator) throw notFound("Creator not found");
  if (creator.verificationStatus === VerificationStatus.VERIFIED) {
    throw conflict("Creator is already verified");
  }

  const updated = await prisma.creatorProfile.update({
    where: { id: creator.id },
    data: { verificationStatus: VerificationStatus.VERIFIED, verifiedAt: new Date() },
  });

  res.status(200).json({ profile: updated });
}

export async function rejectCreator(req: Request, res: Response) {
  const creator = await prisma.creatorProfile.findUnique({ where: { id: req.params.id } });
  if (!creator) throw notFound("Creator not found");

  const updated = await prisma.creatorProfile.update({
    where: { id: creator.id },
    data: { verificationStatus: VerificationStatus.REJECTED },
  });

  res.status(200).json({ profile: updated });
}
