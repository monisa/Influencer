import { PrismaClient, Role, VerificationStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const creatorUser = await prisma.user.upsert({
    where: { email: "anagha@example.com" },
    update: {},
    create: { email: "anagha@example.com", role: Role.CREATOR, emailVerified: true },
  });

  await prisma.creatorProfile.upsert({
    where: { userId: creatorUser.id },
    update: {},
    create: {
      userId: creatorUser.id,
      fullName: "Anagha Menon",
      city: "Kochi",
      instagram: "@anagha.menon",
      primaryPlatform: "Instagram",
      followerRange: "50K - 100K",
      pricingModel: "Per Post",
      ratePerPost: 15000,
      verificationStatus: VerificationStatus.VERIFIED,
      verifiedAt: new Date(),
    },
  });

  const brandUser = await prisma.user.upsert({
    where: { email: "brand@example.com" },
    update: {},
    create: { email: "brand@example.com", role: Role.BRAND, emailVerified: true },
  });

  const brand = await prisma.brandProfile.upsert({
    where: { userId: brandUser.id },
    update: {},
    create: {
      userId: brandUser.id,
      companyName: "Kochi Bites Restaurant",
      contactName: "Rahul Varma",
      industry: "Restaurants",
    },
  });

  await prisma.campaign.upsert({
    where: { id: "seed-campaign-1" },
    update: {},
    create: {
      id: "seed-campaign-1",
      brandId: brand.id,
      name: "Summer Menu Launch",
      goal: "Product Launch",
      description: "Promote our new summer menu across Kochi food creators.",
      budgetRange: "₹25,000 - ₹1,00,000",
      preferredPlatform: "Instagram",
      status: "POSTED",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
