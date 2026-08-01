import { z } from "zod";

export const submitContentSchema = z.object({
  contentUrl: z.string().url(),
});

export const completeApplicationSchema = z.object({
  performanceReportUrl: z.string().url().optional(),
});

export const payApplicationSchema = z.object({
  amount: z.coerce.number().int().positive(),
});
