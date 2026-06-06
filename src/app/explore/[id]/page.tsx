import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Workspace from "./Workspace";

export default async function TemplateWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const templateId = resolvedParams.id;

  // Fetch the template data securely on the server
  const template = await prisma.template.findUnique({
    where: { id: templateId },
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link href="/explore">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Button>
        </Link>
      </div>

      {/* Pass the server data down to our interactive client component */}
      <Workspace template={template} />
    </div>
  );
}
