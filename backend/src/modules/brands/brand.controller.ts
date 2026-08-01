import type { Request, Response } from "express";
import { prisma } from "../../db/prisma.js";
import { notFound, unauthorized } from "../../utils/AppError.js";
import { upsertBrandProfileSchema } from "./brand.schema.js";

export async function upsertMyProfile(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const data = upsertBrandProfileSchema.parse(req.body);

  const profile = await prisma.brandProfile.upsert({
    where: { userId: req.user.sub },
    create: { userId: req.user.sub, ...data },
    update: data,
  });

  res.status(200).json({ profile });
}

export async function getMyProfile(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const profile = await prisma.brandProfile.findUnique({ where: { userId: req.user.sub } });
  if (!profile) throw notFound("Brand profile not found");
  res.status(200).json({ profile });
}

export async function getBrandById(req: Request, res: Response) {
  const profile = await prisma.brandProfile.findUnique({ where: { id: req.params.id } });
  if (!profile) throw notFound("Brand not found");
  res.status(200).json({ profile });
}
