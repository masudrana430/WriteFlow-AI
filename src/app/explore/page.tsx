import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp } from "lucide-react";
import SearchFilters from "./SearchFilters";

export default async function ExplorePage({
  searchParams,
}: {
  // 1. Wrap the type in a Promise for Next.js 15
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  // 2. Await the promise to resolve the URL parameters
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const category = resolvedParams.category || "";

  // 3. Build the Prisma filtering logic dynamically
  const whereClause: any = {};
  
  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }
  
  if (category && category !== "all") {
    whereClause.category = category;
  }

  // 4. Fetch the filtered templates from the database
  const templates = await prisma.template.findMany({
    where: whereClause,
    orderBy: { usageCount: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Explore AI Templates</h1>
        <p className="text-lg text-muted-foreground">
          Choose from our library of agentic workflows to start creating content faster.
        </p>
      </div>

      {/* Inject the Client-Side Search Filters */}
      <SearchFilters />

      {/* Render the Cards or an Empty State */}
      {templates.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-muted/20">
          <p className="text-lg text-muted-foreground">No templates found matching your search.</p>
          <Link href="/explore">
            <Button variant="link" className="mt-2">Clear all filters</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{template.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                    <span>5.0</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{template.title}</CardTitle>
                <CardDescription className="line-clamp-2">{template.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {template.usageCount.toLocaleString()} uses
                </div>
              </CardContent>

              <CardFooter>
                <Link href={`/explore/${template.id}`} className="w-full">
                  <Button className="w-full">Use Template</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
    </div>
  );
}