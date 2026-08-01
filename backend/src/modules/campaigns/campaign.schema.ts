import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(1),
  goal: z.string().optional(),
  description: z.string().optional(),
  budgetModel: z.string().optional(),
  budgetRange: z.string().optional(),
  targetAgeGroup: z.string().optional(),
  targetLocation: z.string().optional(),
  targetInterests: z.string().optional(),
  preferredPlatform: z.string().optional(),
  preferredTier: z.string().optional(),
});

export const updateCampaignSchema = createCampaignSchema.partial();

export const listCampaignsQuerySchema = z.object({
  platform: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(20),
});
