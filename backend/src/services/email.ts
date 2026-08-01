import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../config/env.js";

type MailInput = {
  to: string;
  subject: string;
  text: string;
};

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 587,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }
  return transporter;
}

// Sends via SMTP when configured (Hostinger Email or any SMTP provider, per PRD Section 19).
// Falls back to logging the message so OTP flows are testable without real SMTP credentials.
export async function sendMail({ to, subject, text }: MailInput): Promise<void> {
  const client = getTransporter();

  if (!client) {
    console.log(`[email:dev-fallback] to=${to} subject="${subject}" body="${text}"`);
    return;
  }

  await client.sendMail({ from: env.SMTP_FROM, to, subject, text });
}
