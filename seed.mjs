import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.template.createMany({
    data: [
      {
        title: "SEO Blog Post",
        category: "Blog",
        description: "Generate a fully structured, SEO-optimized blog article from a single topic.",
        prompt: "You are an expert copywriter. Write an SEO-optimized blog post about: {topic}.",
        usageCount: 1240
      },
      {
        title: "Viral Tweet Thread",
        category: "Social Media",
        description: "Turn any concept into an engaging, multi-part Twitter thread.",
        prompt: "Write a highly engaging, 5-part Twitter thread about: {topic}.",
        usageCount: 850
      },
      {
        title: "Cold Outreach Email",
        category: "Email",
        description: "Write high-converting cold emails for sales or networking.",
        prompt: "Write a persuasive cold outreach email targeting {audience} regarding {topic}.",
        usageCount: 432
      },
      {
        title: "Facebook Ad Copy",
        category: "Ad Copy",
        description: "Generate punchy, conversion-focused ad copy for Facebook or Instagram.",
        prompt: "Write a short, punchy Facebook ad emphasizing the benefits of {topic}.",
        usageCount: 910
      }
    ]
  });

  console.log("✅ Templates successfully seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });