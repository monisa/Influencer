import type { Request, Response } from "express";
import { CampaignStatus } from "@prisma/client";
import { prisma } from "../../db/prisma.js";
import { badRequest, forbidden, notFound, unauthorized } from "../../utils/AppError.js";
import { assertCampaignTransition } from "./campaign.state.js";
import { createCampaignSchema, listCampaignsQuerySchema, updateCampaignSchema } from "./campaign.schema.js";

async function requireOwnBrandProfile(userId: string) {
  const brand = await prisma.brandProfile.findUnique({ where: { userId } });
  if (!brand) throw badRequest("Complete your brand profile before creating a campaign");
  return brand;
}

async function loadOwnedCampaign(campaignId: string, userId: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: { brand: true },
  });
  if (!campaign) throw notFound("Campaign not found");
  if (campaign.brand.userId !== userId) throw forbidden("You do not own this campaign");
  return campaign;
}

export async function createCampaign(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const data = createCampaignSchema.parse(req.body);
  const brand = await requireOwnBrandProfile(req.user.sub);

  const campaign = await prisma.campaign.create({
    data: { ...data, brandId: brand.id, status: CampaignStatus.DRAFT },
  });

  res.status(201).json({ campaign });
}

export async function updateCampaign(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const data = updateCampaignSchema.parse(req.body);
  const campaign = await loadOwnedCampaign(req.params.id, req.user.sub);

  if (campaign.status !== CampaignStatus.DRAFT) {
    throw badRequest("Only draft campaigns can be edited");
  }

  const updated = await prisma.campaign.update({ where: { id: campaign.id }, data });
  res.status(200).json({ campaign: updated });
}

export async function postCampaign(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const campaign = await loadOwnedCampaign(req.params.id, req.user.sub);

  assertCampaignTransition(campaign.status, CampaignStatus.POSTED);
  const updated = await prisma.campaign.update({
    where: { id: campaign.id },
    data: { status: CampaignStatus.POSTED },
  });

  res.status(200).json({ campaign: updated });
}

export async function listCampaigns(req: Request, res: Response) {
  const { platform, page, pageSize } = listCampaignsQuerySchema.parse(req.query);

  const where = {
    status: { not: CampaignStatus.DRAFT },
    ...(platform ? { preferredPlatform: platform } : {}),
  };

  const [results, total] = await Promise.all([
    prisma.campaign.findMany({
      where,
      include: { brand: { select: { companyName: true, industry: true } } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.campaign.count({ where }),
  ]);

  res.status(200).json({ results, total, page, pageSize });
}

export async function getCampaign(req: Request, res: Response) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: req.params.id },
    include: { brand: { select: { companyName: true, industry: true } } },
  });
  if (!campaign) throw notFound("Campaign not found");
  res.status(200).json({ campaign });
}

export async function listMyCampaigns(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const brand = await requireOwnBrandProfile(req.user.sub);
  const campaigns = await prisma.campaign.findMany({
    where: { brandId: brand.id },
    orderBy: { createdAt: "desc" },
  });
  res.status(200).json({ results: campaigns });
}
