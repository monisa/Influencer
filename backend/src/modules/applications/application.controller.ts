import type { Request, Response } from "express";
import { ApplicationStatus, CampaignStatus, PaymentStatus } from "@prisma/client";
import { prisma } from "../../db/prisma.js";
import { badRequest, conflict, forbidden, notFound, unauthorized } from "../../utils/AppError.js";
import { assertApplicationTransition } from "./application.state.js";
import { assertCampaignTransition } from "../campaigns/campaign.state.js";
import { completeApplicationSchema, payApplicationSchema, submitContentSchema } from "./application.schema.js";

async function loadApplicationWithRelations(applicationId: string) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { campaign: { include: { brand: true } }, creator: true },
  });
  if (!application) throw notFound("Application not found");
  return application;
}

function assertBrandOwnsApplication(
  application: Awaited<ReturnType<typeof loadApplicationWithRelations>>,
  userId: string
) {
  if (application.campaign.brand.userId !== userId) {
    throw forbidden("You do not own the campaign for this application");
  }
}

function assertCreatorOwnsApplication(
  application: Awaited<ReturnType<typeof loadApplicationWithRelations>>,
  userId: string
) {
  if (application.creator.userId !== userId) {
    throw forbidden("You do not own this application");
  }
}

export async function applyToCampaign(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const creator = await prisma.creatorProfile.findUnique({ where: { userId: req.user.sub } });
  if (!creator) throw badRequest("Complete your creator profile before applying");

  const campaign = await prisma.campaign.findUnique({ where: { id: req.params.id } });
  if (!campaign) throw notFound("Campaign not found");
  const acceptingApplications: CampaignStatus[] = [CampaignStatus.POSTED, CampaignStatus.APPLIED];
  if (!acceptingApplications.includes(campaign.status)) {
    throw conflict("This campaign is not accepting applications");
  }

  const existing = await prisma.application.findUnique({
    where: { campaignId_creatorId: { campaignId: campaign.id, creatorId: creator.id } },
  });
  if (existing) throw conflict("You already applied to this campaign");

  const application = await prisma.application.create({
    data: { campaignId: campaign.id, creatorId: creator.id, status: ApplicationStatus.APPLIED },
  });

  if (campaign.status === CampaignStatus.POSTED) {
    assertCampaignTransition(campaign.status, CampaignStatus.APPLIED);
    await prisma.campaign.update({ where: { id: campaign.id }, data: { status: CampaignStatus.APPLIED } });
  }

  res.status(201).json({ application });
}

export async function listApplicationsForCampaign(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const campaign = await prisma.campaign.findUnique({
    where: { id: req.params.id },
    include: { brand: true },
  });
  if (!campaign) throw notFound("Campaign not found");
  if (campaign.brand.userId !== req.user.sub) throw forbidden("You do not own this campaign");

  const applications = await prisma.application.findMany({
    where: { campaignId: campaign.id },
    include: { creator: true },
    orderBy: { createdAt: "asc" },
  });

  res.status(200).json({ results: applications });
}

export async function approveApplication(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const application = await loadApplicationWithRelations(req.params.id);
  assertBrandOwnsApplication(application, req.user.sub);
  assertApplicationTransition(application.status, ApplicationStatus.APPROVED);
  assertCampaignTransition(application.campaign.status, CampaignStatus.APPROVED);

  const [updatedApplication] = await prisma.$transaction([
    prisma.application.update({
      where: { id: application.id },
      data: { status: ApplicationStatus.APPROVED },
    }),
    prisma.application.updateMany({
      where: { campaignId: application.campaignId, id: { not: application.id }, status: ApplicationStatus.APPLIED },
      data: { status: ApplicationStatus.REJECTED },
    }),
    prisma.campaign.update({
      where: { id: application.campaignId },
      data: { status: CampaignStatus.APPROVED },
    }),
  ]);

  res.status(200).json({ application: updatedApplication });
}

export async function rejectApplication(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const application = await loadApplicationWithRelations(req.params.id);
  assertBrandOwnsApplication(application, req.user.sub);
  assertApplicationTransition(application.status, ApplicationStatus.REJECTED);

  const updated = await prisma.application.update({
    where: { id: application.id },
    data: { status: ApplicationStatus.REJECTED },
  });

  res.status(200).json({ application: updated });
}

export async function submitContent(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const { contentUrl } = submitContentSchema.parse(req.body);
  const application = await loadApplicationWithRelations(req.params.id);
  assertCreatorOwnsApplication(application, req.user.sub);
  assertApplicationTransition(application.status, ApplicationStatus.CONTENT_SUBMITTED);

  const updated = await prisma.application.update({
    where: { id: application.id },
    data: { status: ApplicationStatus.CONTENT_SUBMITTED, contentUrl },
  });

  res.status(200).json({ application: updated });
}

export async function approveContent(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const application = await loadApplicationWithRelations(req.params.id);
  assertBrandOwnsApplication(application, req.user.sub);
  assertApplicationTransition(application.status, ApplicationStatus.CONTENT_APPROVED);
  assertCampaignTransition(application.campaign.status, CampaignStatus.POSTED_CONTENT);

  const [updatedApplication] = await prisma.$transaction([
    prisma.application.update({
      where: { id: application.id },
      data: { status: ApplicationStatus.CONTENT_APPROVED },
    }),
    prisma.campaign.update({
      where: { id: application.campaignId },
      data: { status: CampaignStatus.POSTED_CONTENT },
    }),
  ]);

  res.status(200).json({ application: updatedApplication });
}

export async function completeApplication(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const { performanceReportUrl } = completeApplicationSchema.parse(req.body);
  const application = await loadApplicationWithRelations(req.params.id);
  assertBrandOwnsApplication(application, req.user.sub);
  assertApplicationTransition(application.status, ApplicationStatus.COMPLETED);
  assertCampaignTransition(application.campaign.status, CampaignStatus.COMPLETED);

  const [updatedApplication] = await prisma.$transaction([
    prisma.application.update({
      where: { id: application.id },
      data: { status: ApplicationStatus.COMPLETED, performanceReportUrl },
    }),
    prisma.campaign.update({
      where: { id: application.campaignId },
      data: { status: CampaignStatus.COMPLETED },
    }),
  ]);

  res.status(200).json({ application: updatedApplication });
}

export async function payApplication(req: Request, res: Response) {
  if (!req.user) throw unauthorized();
  const { amount } = payApplicationSchema.parse(req.body);
  const application = await loadApplicationWithRelations(req.params.id);
  assertBrandOwnsApplication(application, req.user.sub);

  if (application.status !== ApplicationStatus.COMPLETED) {
    throw conflict("Application must be completed before payment");
  }
  assertCampaignTransition(application.campaign.status, CampaignStatus.PAID);

  const [payment] = await prisma.$transaction([
    prisma.payment.upsert({
      where: { applicationId: application.id },
      create: { applicationId: application.id, amount, status: PaymentStatus.PAID, paidAt: new Date() },
      update: { amount, status: PaymentStatus.PAID, paidAt: new Date() },
    }),
    prisma.campaign.update({
      where: { id: application.campaignId },
      data: { status: CampaignStatus.PAID },
    }),
  ]);

  res.status(200).json({ payment });
}
