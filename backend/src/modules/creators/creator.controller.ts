import type { Request, Response } from "express";
import { VerificationStatus } from "@prisma/client";
import { prisma } from "../../db/prisma.js";
import { conflict, notFound, unauthorized } from "../../utils/AppError.js";
import { searchCreatorsQuerySchema, upsertCreatorProfileSchema } from "./creator.schema.js";

export async function upsertMyProfile(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const data = upsertCreatorProfileSchema.parse(req.body);

  const profile = await prisma.creatorProfile.upsert({
    where: { userId: req.user.sub },
    create: { userId: req.user.sub, ...data },
    update: data,
  });

  res.status(200).json({ profile });
}

export async function getMyProfile(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const profile = await prisma.creatorProfile.findUnique({ where: { userId: req.user.sub } });
  if (!profile) throw notFound("Creator profile not found");
  res.status(200).json({ profile });
}

export async function getCreatorById(req: Request, res: Response) {
  const profile = await prisma.creatorProfile.findUnique({ where: { id: req.params.id } });
  if (!profile) throw notFound("Creator not found");
  res.status(200).json({ profile });
}

export async function submitForVerification(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const profile = await prisma.creatorProfile.findUnique({ where: { userId: req.user.sub } });
  if (!profile) throw notFound("Creator profile not found");

  const resubmittable: VerificationStatus[] = [VerificationStatus.UNVERIFIED, VerificationStatus.REJECTED];
  if (!resubmittable.includes(profile.verificationStatus)) {
    throw conflict("Verification is already in progress or complete");
  }

  const updated = await prisma.creatorProfile.update({
    where: { id: profile.id },
    data: { verificationStatus: VerificationStatus.IN_REVIEW },
  });

  res.status(200).json({ profile: updated });
}

export async function searchCreators(req: Request, res: Response) {
  const { platform, location, verifiedOnly, page, pageSize } = searchCreatorsQuerySchema.parse(req.query);

  const where = {
    ...(platform ? { primaryPlatform: platform } : {}),
    ...(location ? { city: { contains: location, mode: "insensitive" as const } } : {}),
    ...(verifiedOnly ? { verificationStatus: "VERIFIED" as const } : {}),
  };

  const [results, total] = await Promise.all([
    prisma.creatorProfile.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.creatorProfile.count({ where }),
  ]);

  res.status(200).json({ results, total, page, pageSize });
}
