import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyDigifox } from "@/components/WhyDigifox";
import { CreatorBrandSplit } from "@/components/CreatorBrandSplit";
import { IndustriesGrid } from "@/components/IndustriesGrid";
import { VerificationWorkflow } from "@/components/VerificationWorkflow";
import { CampaignWorkflow } from "@/components/CampaignWorkflow";
import { MarketplacePreview } from "@/components/MarketplacePreview";
import { FeaturedCreators } from "@/components/FeaturedCreators";
import { ClosingCta } from "@/components/ClosingCta";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyDigifox />
      <CreatorBrandSplit />
      <IndustriesGrid />
      <VerificationWorkflow />
      <CampaignWorkflow />
      <MarketplacePreview />
      <FeaturedCreators />
      <ClosingCta />
    </>
  );
}
