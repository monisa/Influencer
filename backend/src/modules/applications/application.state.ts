import { ApplicationStatus } from "@prisma/client";
import { conflict } from "../../utils/AppError.js";

const TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  APPLIED: [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED],
  APPROVED: [ApplicationStatus.CONTENT_SUBMITTED],
  REJECTED: [],
  CONTENT_SUBMITTED: [ApplicationStatus.CONTENT_APPROVED, ApplicationStatus.APPROVED],
  CONTENT_APPROVED: [ApplicationStatus.COMPLETED],
  COMPLETED: [],
};

export function assertApplicationTransition(from: ApplicationStatus, to: ApplicationStatus): void {
  if (!TRANSITIONS[from].includes(to)) {
    throw conflict(`Application cannot move from ${from} to ${to}`);
  }
}
