const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
};

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data?.error ?? `Request failed (${res.status})`, res.status);
  }

  return data as T;
}

export type Role = "CREATOR" | "BRAND" | "ADMIN";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  emailVerified: boolean;
};

type AuthResponse = { token: string; user: SessionUser };

export const authApi = {
  registerStart: (email: string, role: "CREATOR" | "BRAND") =>
    apiFetch<{ message: string; email: string }>("/api/auth/register/start", {
      method: "POST",
      body: { email, role },
    }),
  registerVerify: (email: string, code: string) =>
    apiFetch<AuthResponse>("/api/auth/register/verify", { method: "POST", body: { email, code } }),
  loginStart: (email: string) =>
    apiFetch<{ message: string; email: string }>("/api/auth/login/start", {
      method: "POST",
      body: { email },
    }),
  loginVerify: (email: string, code: string) =>
    apiFetch<AuthResponse>("/api/auth/login/verify", { method: "POST", body: { email, code } }),
  me: (token: string) => apiFetch<{ user: SessionUser; profile: unknown }>("/api/auth/me", { token }),
};

export type CreatorProfileInput = {
  fullName: string;
  city?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  primaryPlatform?: string;
  followerRange?: string;
  primaryAudienceAge?: string;
  primaryAudienceGender?: string;
  audienceLocation?: string;
  pricingModel?: string;
  ratePerPost?: number;
  portfolioLink?: string;
  pastBrands?: string;
  availability?: string;
  weeklyCapacity?: string;
};

export const creatorApi = {
  upsertMe: (token: string, data: CreatorProfileInput) =>
    apiFetch<{ profile: unknown }>("/api/creators/me", { method: "PUT", body: data, token }),
  submitForVerification: (token: string) =>
    apiFetch<{ profile: unknown }>("/api/creators/me/submit-verification", { method: "POST", token }),
};

export type BrandProfileInput = {
  companyName: string;
  contactName?: string;
  website?: string;
  industry?: string;
};

export type CampaignInput = {
  name: string;
  goal?: string;
  description?: string;
  budgetModel?: string;
  budgetRange?: string;
  targetAgeGroup?: string;
  targetLocation?: string;
  targetInterests?: string;
  preferredPlatform?: string;
  preferredTier?: string;
};

export const brandApi = {
  upsertMe: (token: string, data: BrandProfileInput) =>
    apiFetch<{ profile: unknown }>("/api/brands/me", { method: "PUT", body: data, token }),
};

export const campaignApi = {
  create: (token: string, data: CampaignInput) =>
    apiFetch<{ campaign: { id: string } }>("/api/campaigns", { method: "POST", body: data, token }),
  post: (token: string, id: string) =>
    apiFetch<{ campaign: unknown }>(`/api/campaigns/${id}/post`, { method: "POST", token }),
};
