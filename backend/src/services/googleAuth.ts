import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import { badRequest } from "../utils/AppError.js";

const client = env.GOOGLE_CLIENT_ID ? new OAuth2Client(env.GOOGLE_CLIENT_ID) : null;

export type GoogleProfile = {
  googleId: string;
  email: string;
  emailVerified: boolean;
};

// Verifies an ID token minted client-side by Google Identity Services.
// Requires GOOGLE_CLIENT_ID (from Google Cloud Console, per PRD Section 18/19).
export async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile> {
  if (!client || !env.GOOGLE_CLIENT_ID) {
    throw badRequest("Google Login is not configured on this server");
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email) {
    throw badRequest("Invalid Google token");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    emailVerified: payload.email_verified ?? false,
  };
}
