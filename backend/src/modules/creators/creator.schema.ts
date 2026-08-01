import { z } from "zod";

export const upsertCreatorProfileSchema = z.object({
  fullName: z.string().min(1),
  city: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
  primaryPlatform: z.enum(["Instagram", "YouTube", "TikTok"]).optional(),
  followerRange: z.string().optional(),
  primaryAudienceAge: z.string().optional(),
  primaryAudienceGender: z.string().optional(),
  audienceLocation: z.string().optional(),
  pricingModel: z.string().optional(),
  ratePerPost: z.coerce.number().int().nonnegative().optional(),
  portfolioLink: z.string().url().optional().or(z.literal("")),
  pastBrands: z.string().optional(),
  availability: z.string().optional(),
  weeklyCapacity: z.string().optional(),
});

export const searchCreatorsQuerySchema = z.object({
  platform: z.string().optional(),
  location: z.string().optional(),
  verifiedOnly: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(20),
});
