import { z } from "zod";

export const upsertBrandProfileSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.string().optional(),
});
