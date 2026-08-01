export const SITE = {
  name: "Digifox Influencer Network",
  shortName: "Digifox",
  parentCompany: "Digifox Pro Solutions LLP",
  parentLocation: "Kochi, Kerala",
  parentSite: "digifoxprosolutions.com",
  whatsappNumber: "919999999999",
  contactEmail: "hello@digifoxprosolutions.com",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Influencer Network", href: "/#why-digifox" },
  { label: "Industries", href: "/industries" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { label: "Verified Creators", value: 250, suffix: "+" },
  { label: "Brands", value: 60, suffix: "+" },
  { label: "Campaigns", value: 120, suffix: "+" },
  { label: "Industries", value: 15, suffix: "+" },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Register",
    description:
      "Sign up as a Creator or a Brand in minutes with Google or email — pick your role and get started.",
  },
  {
    step: "02",
    title: "Complete Profile",
    description:
      "Creators showcase their audience and portfolio; brands share campaign goals and target audience.",
  },
  {
    step: "03",
    title: "Start Collaborating",
    description:
      "Get matched, approve content, track performance, and manage payments — all in one place.",
  },
];

export const WHY_DIGIFOX = [
  {
    title: "Verified Creators",
    description:
      "Every creator profile goes through audience and identity checks before it goes live.",
    icon: "shield-check",
  },
  {
    title: "Campaign Management",
    description:
      "Post briefs, review applications, and track every campaign stage from one dashboard.",
    icon: "layers",
  },
  {
    title: "Dedicated Support",
    description:
      "A real team behind the platform — help with onboarding, disputes, and campaign strategy.",
    icon: "headset",
  },
  {
    title: "Fast Matching",
    description:
      "Smart filters surface the right creators or campaigns in minutes, not weeks.",
    icon: "bolt",
  },
  {
    title: "Secure Collaboration",
    description:
      "Content approval workflows and tracked deliverables keep every collaboration accountable.",
    icon: "lock",
  },
  {
    title: "Performance Reports",
    description:
      "Clear reporting on reach, engagement, and campaign outcomes for every collaboration.",
    icon: "chart",
  },
];

export const INDUSTRIES = [
  { name: "Restaurants", icon: "utensils" },
  { name: "Healthcare", icon: "heart-pulse" },
  { name: "Real Estate", icon: "building" },
  { name: "Education", icon: "graduation-cap" },
  { name: "Beauty", icon: "sparkles" },
  { name: "Automobile", icon: "car" },
  { name: "Technology", icon: "cpu" },
  { name: "Events", icon: "calendar" },
];

export const VERIFICATION_STEPS = [
  {
    title: "Register",
    description: "Create your creator account with basic details and social handles.",
  },
  {
    title: "Verification",
    description: "Submit ID and platform ownership details for review.",
  },
  {
    title: "Profile Review",
    description: "Our team manually reviews your profile and portfolio for quality.",
  },
  {
    title: "Audience Check",
    description: "Follower authenticity and engagement are checked against basic thresholds.",
  },
  {
    title: "Verified Badge",
    description: "Approved creators receive a verified badge visible to every brand.",
  },
];

export const CAMPAIGN_WORKFLOW = [
  "Brand",
  "Digifox",
  "Creator",
  "Content Approval",
  "Posting",
  "Performance Report",
  "Payment",
];

export const COMPETITOR_MATRIX = [
  { name: "InfluGenie", take: "Dual entry (Creator/Brand), hero messaging", avoid: "Exact layout & colors" },
  { name: "CreatorGo", take: "Simple 3-step onboarding", avoid: "Overall page design" },
  { name: "Incer", take: "Campaign history, creator details, language support", avoid: "Dashboard structure" },
  { name: "Upfluence", take: "Rich creator profile, audience insights, media kit", avoid: "Enterprise complexity" },
  { name: "Aspire", take: '"Book a Demo" flow for brands', avoid: "Heavy SaaS layout" },
  { name: "CreatorIQ", take: "Verification badge, premium UI, trust elements", avoid: "Corporate dashboard feel" },
];

export type MockCreator = {
  id: string;
  name: string;
  category: string;
  location: string;
  platform: "Instagram" | "YouTube" | "TikTok";
  followers: number;
  language: string;
  priceBand: "Budget" | "Mid" | "Premium";
  verified: boolean;
  initials: string;
};

export const FEATURED_CREATORS: MockCreator[] = [
  { id: "c1", name: "Anagha Menon", category: "Beauty", location: "Kochi", platform: "Instagram", followers: 84000, language: "Malayalam, English", priceBand: "Mid", verified: true, initials: "AM" },
  { id: "c2", name: "Rahul Varma", category: "Technology", location: "Bengaluru", platform: "YouTube", followers: 210000, language: "English, Kannada", priceBand: "Premium", verified: true, initials: "RV" },
  { id: "c3", name: "Sneha Pillai", category: "Restaurants", location: "Thiruvananthapuram", platform: "Instagram", followers: 45000, language: "Malayalam", priceBand: "Budget", verified: true, initials: "SP" },
  { id: "c4", name: "Arjun Nair", category: "Automobile", location: "Kozhikode", platform: "YouTube", followers: 132000, language: "Malayalam, English", priceBand: "Mid", verified: true, initials: "AN" },
  { id: "c5", name: "Divya Krishnan", category: "Education", location: "Chennai", platform: "Instagram", followers: 63000, language: "Tamil, English", priceBand: "Mid", verified: true, initials: "DK" },
  { id: "c6", name: "Farhan Ali", category: "Events", location: "Kochi", platform: "TikTok", followers: 98000, language: "Malayalam, Hindi", priceBand: "Budget", verified: true, initials: "FA" },
  { id: "c7", name: "Meera Suresh", category: "Healthcare", location: "Kottayam", platform: "Instagram", followers: 37000, language: "Malayalam", priceBand: "Budget", verified: true, initials: "MS" },
  { id: "c8", name: "Vishnu Prasad", category: "Real Estate", location: "Kochi", platform: "YouTube", followers: 71000, language: "Malayalam, English", priceBand: "Mid", verified: true, initials: "VP" },
];

export const FAQ_ITEMS: { question: string; answer: string; audience: "Creators" | "Brands" | "General" }[] = [
  {
    audience: "General",
    question: "What is Digifox Influencer Network?",
    answer:
      "Digifox Influencer Network is a two-sided marketplace connecting verified content creators with brands and agencies for paid marketing collaborations — covering discovery, verification, campaign management, content approval, and payment tracking in one platform.",
  },
  {
    audience: "General",
    question: "Who is Digifox Influencer Network for?",
    answer:
      "Creators and influencers on Instagram, YouTube, TikTok and other platforms, from micro to established — and brands, agencies, and SMEs looking for influencer marketing. We currently focus on South India, expanding pan-India.",
  },
  {
    audience: "Creators",
    question: "How do I get verified as a creator?",
    answer:
      "After registering, you'll complete your profile and submit basic ID and platform ownership details. Our team manually reviews your profile, portfolio, and audience before issuing a verified badge.",
  },
  {
    audience: "Creators",
    question: "How and when do I get paid?",
    answer:
      "Payment is tracked against each campaign's status — from content approval through posting and performance reporting to final payment. Final payout structures (commission, subscription, or flat fee) are being finalized.",
  },
  {
    audience: "Brands",
    question: "How do I find the right creators for my brand?",
    answer:
      "Use the marketplace search with filters for platform, followers, language, location, and price to shortlist creators, then post a campaign brief or reach out directly.",
  },
  {
    audience: "Brands",
    question: "Can I book a demo before signing up?",
    answer:
      "Yes — enterprise brand leads can book a demo from the Contact page or the closing call-to-action on the homepage.",
  },
  {
    audience: "General",
    question: "Is Google Login supported?",
    answer:
      "Google Login is planned alongside email/OTP registration. Depending on rollout, the first release may launch with email/OTP only.",
  },
];
