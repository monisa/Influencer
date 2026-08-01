import { CampaignStatus } from "@prisma/client";
import { conflict } from "../../utils/AppError.js";

// Campaign state machine per PRD Section 18:
// draft -> posted -> applied -> approved -> posted-content -> completed -> paid
const TRANSITIONS: Record<CampaignStatus, CampaignStatus[]> = {
  DRAFT: [CampaignStatus.POSTED],
  POSTED: [CampaignStatus.APPLIED],
  APPLIED: [CampaignStatus.APPROVED],
  APPROVED: [CampaignStatus.POSTED_CONTENT],
  POSTED_CONTENT: [CampaignStatus.COMPLETED],
  COMPLETED: [CampaignStatus.PAID],
  PAID: [],
};

export function assertCampaignTransition(from: CampaignStatus, to: CampaignStatus): void {
  if (!TRANSITIONS[from].includes(to)) {
    throw conflict(`Campaign cannot move from ${from} to ${to}`);
  }
}
